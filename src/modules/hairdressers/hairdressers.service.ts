import { Injectable, NotFoundException } from "@nestjs/common";
import { Hairdresser } from "@prisma/client";
import { MsgType } from "../../types/types";
import { PrismaService } from "../prisma/prisma.service";
import { CreateHairdresserDto } from "./dto/create-hairdresser.dto";
import { UpdateHairdresserDto } from "./dto/update-hairdresser.dto";

@Injectable()
export class HairdressersService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return await this.prisma.hairdresser.findMany({
      include: {
        user: {
          select: {
            name: true,
          },
        },
      },
    });
  }

  async findOne(id: string): Promise<Hairdresser> {
    const hairdresser = await this.prisma.hairdresser.findFirst({
      where: { id },
    });
    if (!hairdresser)
      throw new NotFoundException(`Hairdresser #${id} not found`);
    return hairdresser;
  }

  async create(
    createHairdresserDto: CreateHairdresserDto,
  ): Promise<Hairdresser> {
    return await this.prisma.hairdresser.create({ data: createHairdresserDto });
  }

  async update(
    id: string,
    updateHairdresserDto: UpdateHairdresserDto,
  ): Promise<Hairdresser> {
    const hairdresser = await this.prisma.hairdresser.findFirst({
      where: { id },
    });

    if (!hairdresser)
      throw new NotFoundException(`Hairdresser #${id} not found`);

    return await this.prisma.hairdresser.update({
      where: {
        id,
      },
      data: updateHairdresserDto,
    });
  }

  async remove(id: string): Promise<MsgType> {
    await this.prisma.hairdresser.delete({
      where: {
        id,
      },
    });
    return { msg: "Hairdresser deleted" };
  }
}
