import { Test, TestingModule } from "@nestjs/testing";
import { Role } from "@prisma/client";
import { MsgType } from "../../types/types";
import { AssignService } from "./assign.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { UserController } from "./users.controller";
import { UserService } from "./users.service";

const userStub = {
  id: "7caa98b7-128d-4e82-ba3c-d96132e94067",
  phone: "+546666565",
  email: "qweqwe@qweqwe.com",
  name: "Test",
  role: Role.USER,
  createdAt: "2022-08-31 17:00:00+03",
  updatedAt: "2022-08-31 17:00:00+03",
};

type Users = {
  id: string;
  phone: string;
  email: string;
  name: string;
  role: Role;
  createdAt: Date;
  updatedAt: Date;
};

describe("UsersController", () => {
  let userController: UserController;
  let userService: UserService;

  const mockUserService = {
    findAll: jest.fn(() => {
      return [userStub];
    }),
    findOne: jest.fn((dto) => ({
      ...userStub,
      id: dto,
    })),
    create: jest.fn((dto) => ({
      ...userStub,
      phone: dto.phone,
      email: dto.email,
      name: dto.name,
    })),
    update: jest.fn((id, dto) => ({
      ...userStub,
      id,
      phone: dto.phone,
      email: dto.email,
    })),
    remove: jest.fn((id) => ({
      msg: `User ${id} was deleted!`,
    })),
  };

  const mockAssignService = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService, AssignService],
    })
      .overrideProvider(UserService)
      .useValue(mockUserService)
      .overrideProvider(AssignService)
      .useValue(mockAssignService)
      .compile();

    userController = module.get<UserController>(UserController);
    userService = module.get<UserService>(UserService);
  });

  it("should be defined", () => {
    expect(userController).toBeDefined();
  });

  describe("getUsers", () => {
    let users: Users[];

    beforeEach(async () => {
      users = await userController.findAll();
    });

    test("it should call userService", () => {
      expect(userService.findAll).toHaveBeenCalled();
    });

    test("it should find all users", () => {
      expect(users).toEqual([userStub]);
    });
  });

  describe("getOneUser", () => {
    let user: Users;

    beforeEach(async () => {
      user = await userController.findOne(userStub.id);
    });

    test("it should call userService", () => {
      expect(userService.findOne).toHaveBeenCalledWith(userStub.id);
    });

    test("it should get one user", () => {
      expect(user).toEqual(userStub);
    });
  });

  describe("createOneUser", () => {
    let user: Users;
    let createDto: CreateUserDto;

    beforeEach(async () => {
      createDto = {
        phone: "+123456789",
        email: "qweqwe@qweqwe.com",
        name: "Test",
      };
      user = await userController.create(createDto);
    });

    test("it should call userService", () => {
      expect(userService.create).toHaveBeenCalledWith(createDto);
    });

    test("it should create one user", () => {
      expect(user).toEqual({
        ...userStub,
        phone: createDto.phone,
        email: createDto.email,
        name: createDto.name,
      });
    });
  });

  describe("updateOneUser", () => {
    let user: Users;
    let updateDto: UpdateUserDto;

    updateDto = {
      phone: "+987654321",
      email: "asdasd@asdads.com",
    };

    beforeEach(async () => {
      updateDto = {
        phone: "+987654321",
        email: "asdasd@asdads.com",
      };
      user = await userController.update(userStub.id, updateDto);
    });

    test("it should call userService", () => {
      expect(userService.update).toHaveBeenCalledWith(userStub.id, updateDto);
    });

    test("it should create one user", () => {
      expect(user).toEqual({
        ...userStub,
        phone: updateDto.phone,
        email: updateDto.email,
      });
    });
  });

  describe("removeOneUser", () => {
    let message: MsgType;

    beforeEach(async () => {
      message = await userController.remove(userStub.id);
    });

    test("it should call userService", () => {
      expect(userService.remove).toHaveBeenCalledWith(userStub.id);
    });

    test("it should create one user", () => {
      expect(message).toEqual(message);
    });
  });
});
