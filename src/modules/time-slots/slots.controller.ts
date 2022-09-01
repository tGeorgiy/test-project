import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  Delete,
  Request,
} from "@nestjs/common";
import { TimeSlotsService } from "./slots.service";
import { CreateSlotDto } from "./dto/create-slot.dto";
import { AuthenticatedGuard } from "../auth/authenticated.guard";

@Controller("time-slots")
export class TimeSlotsController {
  constructor(private readonly timeSlotsService: TimeSlotsService) {}

  @Get(":hairdresserId")
  findAll(@Param("hairdresserId") hairdresserId: string) {
    return this.timeSlotsService.findAllHairdresserTimeSlots(hairdresserId);
  }

  @UseGuards(AuthenticatedGuard)
  @Post()
  create(@Body() createSlotDto: CreateSlotDto) {
    return this.timeSlotsService.createSlot(createSlotDto);
  }

  @UseGuards(AuthenticatedGuard)
  @Delete(":slotId")
  delete(@Request() req, @Param("slotId") slotId: string) {
    return this.timeSlotsService.deleteSlot(req, slotId);
  }
}
