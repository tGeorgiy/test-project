import { Test, TestingModule } from "@nestjs/testing";
import { Role, User } from "@prisma/client";
import { prismaMock } from "../../singleton";
import { MsgType } from "../../types/types";
import { PrismaService } from "../prisma/prisma.service";
import { UserService } from "./users.service";

const userStub = {
  id: "7caa98b7-128d-4e82-ba3c-d96132e94067",
  phone: "+546666565",
  email: "qweqwe@qweqwe.com",
  name: "Test",
  password: "21313121",
  role: Role.USER,
  createdAt: new Date(2022, 8, 31),
  updatedAt: new Date(2022, 8, 31),
};

describe("UsersController", () => {
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService, PrismaService],
    })
      .overrideProvider(PrismaService)
      .useValue(prismaMock)
      .compile();

    userService = module.get<UserService>(UserService);
  });

  describe("should find many users", () => {
    let users: User[];

    beforeEach(async () => {
      prismaMock.user.findMany.mockResolvedValue([userStub]);
      jest.spyOn(userService, "findAll");
      users = await prismaMock.user.findMany();
    });

    test("should find all users", async () => {
      expect(prismaMock.user.findMany).toBeCalled();
      await expect(userService.findAll()).resolves.toEqual(users);
    });
  });

  describe("should find by email user", () => {
    let user: User;

    beforeEach(async () => {
      prismaMock.user.findFirst.mockResolvedValue(userStub);
      jest.spyOn(userService, "findByEmail");
      user = (await prismaMock.user.findFirst({
        where: {
          email: userStub.email,
        },
      })) as User;
    });

    test("should find user by email", async () => {
      expect(prismaMock.user.findFirst).toBeCalledWith({
        where: {
          email: userStub.email,
        },
      });
      await expect(userService.findByEmail(userStub.email)).resolves.toEqual(
        user,
      );
    });
  });

  describe("should find user by id", () => {
    let user: User;

    beforeEach(async () => {
      prismaMock.user.findFirst.mockResolvedValue(userStub);
      jest.spyOn(userService, "findOne");
      user = (await prismaMock.user.findFirst({
        where: {
          id: userStub.id,
        },
      })) as User;
    });

    test("should find user by id", async () => {
      expect(prismaMock.user.findFirst).toBeCalledWith({
        where: {
          id: userStub.id,
        },
      });
      await expect(userService.findByEmail(userStub.id)).resolves.toEqual(user);
    });
  });

  describe("should create new user", () => {
    let user: User;
    const createDto = {
      phone: "+123456789",
      email: "qweqwe@qweqwe.com",
      name: "Test",
    };

    beforeEach(async () => {
      prismaMock.user.create.mockResolvedValue(userStub);
      jest.spyOn(userService, "create");
      user = await prismaMock.user.create({ data: createDto });
    });

    test("should create new user", async () => {
      expect(prismaMock.user.create).toBeCalledWith({ data: createDto });
      await expect(userService.create(createDto)).resolves.toEqual(user);
    });
  });

  describe("should update user", () => {
    let user: User;
    const updateDto = {
      phone: "+123456789",
      email: "qweqwe@qweqwe.com",
    };

    beforeEach(async () => {
      prismaMock.user.update.mockResolvedValue({ ...userStub, ...updateDto });
      jest.spyOn(userService, "update");
      user = await prismaMock.user.update({
        where: {
          id: userStub.id,
        },
        data: updateDto,
      });
    });

    test("should update user", async () => {
      expect(prismaMock.user.update).toBeCalledWith({
        where: {
          id: userStub.id,
        },
        data: updateDto,
      });
      await expect(userService.update(userStub.id, updateDto)).resolves.toEqual(
        user,
      );
    });
  });

  describe("should remove user", () => {
    beforeEach(async () => {
      prismaMock.user.delete.mockResolvedValue(userStub);
      jest.spyOn(userService, "update");
      await prismaMock.user.delete({
        where: {
          id: userStub.id,
        },
      });
    });

    test("should delete user", async () => {
      expect(prismaMock.user.delete).toBeCalledWith({
        where: {
          id: userStub.id,
        },
      });
      await expect(userService.remove(userStub.id)).resolves.toEqual({
        msg: `User ${userStub.id} was deleted!`,
      } as MsgType);
    });
  });
});
