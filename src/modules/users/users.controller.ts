import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Request,
  UseGuards,
} from "@nestjs/common";
import { MsgType } from "../../types/types";
import { AuthenticatedGuard } from "../auth/authenticated.guard";
import { LocalAuthGuard } from "../auth/local.auth.guard";
import { AssignService } from "./assign.service";
import { AssignDto } from "./dto/assign.dto";
import { CreateUserDto } from "./dto/create-user.dto";
import { UnAssignDto } from "./dto/un-assign.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { UserService } from "./users.service";

@Controller("users")
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly assignService: AssignService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post("/login")
  login(@Request() req): any {
    return { User: req.user, msg: "User logged in" };
  }

  @Get("/logout")
  logout(@Request() req): MsgType {
    req.session.destroy();
    return { msg: "The user session has ended" };
  }

  @Get(":userId/assign/")
  findOneAssign(@Param("userId") userId: string) {
    return this.assignService.getAssigns(userId);
  }

  @Post(":userId/assign/")
  createAssign(@Param("userId") userId: string, @Body() assignDto: AssignDto) {
    return this.assignService.assignToHairdresser(userId, assignDto);
  }

  @Patch(":userId/assign/")
  updateAssign(
    @Request() req: any,
    @Param("userId") userId: string,
    @Body() unAssignDto: UnAssignDto,
  ) {
    return this.assignService.unAssignToHairdresser(req, userId, unAssignDto);
  }

  @UseGuards(AuthenticatedGuard)
  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.userService.findOne(id);
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.userService.remove(id);
  }
}
