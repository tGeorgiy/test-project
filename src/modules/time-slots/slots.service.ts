import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import * as moment from "moment";
import { AppointmentAndSlot, Role } from "@prisma/client";
import { CreateSlotDto } from "./dto/create-slot.dto";
import { MsgType } from "../../types/types";

@Injectable()
export class TimeSlotsService {
  constructor(private prisma: PrismaService) {}

  async findAllHairdresserTimeSlots(
    hairdresserId: string,
  ): Promise<AppointmentAndSlot[]> {
    return await this.prisma.appointmentAndSlot.findMany({
      where: {
        hairdresserId,
      },
    });
  }

  async createSlot(
    createTimeSlotDto: CreateSlotDto,
  ): Promise<AppointmentAndSlot> {
    return await this.prisma.appointmentAndSlot.create({
      data: {
        hairdresserId: createTimeSlotDto.hairdresserId,
        slotStart: moment(createTimeSlotDto.slotStart).toISOString(),
        slotEnd: moment(createTimeSlotDto.slotEnd).toISOString(),
      },
    });
  }

  async deleteSlot(req: any, slotId: string): Promise<MsgType> {
    if (req?.user?.role !== Role.ADMIN)
      throw new ForbiddenException("You do not have permission to do this");
    const slot = await this.prisma.appointmentAndSlot.findFirst({
      where: {
        id: slotId,
      },
    });

    if (!slot) throw new NotFoundException("Slot not found");
    if (slot.userId)
      throw new ConflictException("Some user is still assigned to this slot");

    await this.prisma.appointmentAndSlot.delete({
      where: {
        id: slotId,
      },
    });

    return { msg: "Slot was deleted" };
  }
}
