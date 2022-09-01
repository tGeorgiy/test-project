import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from "@nestjs/common";
import { HairdressersService } from "./hairdressers.service";
import { CreateHairdresserDto } from "./dto/create-hairdresser.dto";
import { UpdateHairdresserDto } from "./dto/update-hairdresser.dto";
import { AuthenticatedGuard } from "../auth/authenticated.guard";

@Controller("hairdressers")
export class HairdressersController {
  constructor(private readonly hairdressersService: HairdressersService) {}

  @Get()
  findAll() {
    return this.hairdressersService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.hairdressersService.findOne(id);
  }

  @UseGuards(AuthenticatedGuard)
  @Post()
  create(@Body() createHairdresserDto: CreateHairdresserDto) {
    return this.hairdressersService.create(createHairdresserDto);
  }

  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateHairdresserDto: UpdateHairdresserDto,
  ) {
    return this.hairdressersService.update(id, updateHairdresserDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.hairdressersService.remove(id);
  }
}
