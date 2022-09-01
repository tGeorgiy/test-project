import { Injectable, NotFoundException } from "@nestjs/common";
import { User } from "@prisma/client";
import { AllUsers, MsgType, UserOverride } from "../../types/types";
import { PrismaService } from "../prisma/prisma.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import * as bcrypt from "bcrypt";

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<AllUsers[]> {
    return await this.prisma.user.findMany({
      select: {
        id: true,
        phone: true,
        email: true,
        name: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async findByEmail(useremail: string): Promise<User> {
    const user = await this.prisma.user.findFirst({
      where: {
        email: useremail,
      },
    });

    if (!user) throw new NotFoundException(`User whith ${useremail} not found`);
    return user;
  }

  async findOne(id: string): Promise<UserOverride> {
    const user: UserOverride | null = await this.prisma.user.findFirst({
      where: {
        id,
      },
    });
    if (!user) throw new NotFoundException(`User whith ${id} not found`);
    delete user.password;
    return user;
  }

  async create(createUserDto: CreateUserDto): Promise<UserOverride> {
    const newCreateUser = {
      ...createUserDto,
    };
    if (createUserDto?.password) {
      newCreateUser.password = await bcrypt.hash(createUserDto.password, 10);
    }
    const createdUser: UserOverride = await this.prisma.user.create({
      data: newCreateUser,
    });
    delete createdUser.password;
    return createdUser;
  }

  async update(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<UserOverride> {
    const updatedUser: UserOverride = await this.prisma.user.update({
      where: {
        id,
      },
      data: updateUserDto,
    });
    delete updatedUser.password;
    return updatedUser;
  }

  async remove(id: string): Promise<MsgType> {
    await this.prisma.user.delete({
      where: {
        id,
      },
    });

    return { msg: `User ${id} was deleted!` };
  }
}
