import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { AppointmentAndSlot, Role } from "@prisma/client";
import { PrismaService } from "../prisma/prisma.service";
import { NotificationService } from "../notifications/notifications.service";
import { AssignDto } from "./dto/assign.dto";
import { UnAssignDto } from "./dto/un-assign.dto";

type GetUserAssigns = {
  id: string;
  slotStart: Date;
  slotEnd: Date;
  hairdrasser: {
    id: string;
    spec: string;
    user: {
      name: string;
    };
  };
};

@Injectable()
export class AssignService {
  constructor(
    private prisma: PrismaService,
    private readonly warmapService: NotificationService,
  ) {}

  async getAssigns(userId: string): Promise<GetUserAssigns[]> {
    return await this.prisma.appointmentAndSlot.findMany({
      where: {
        userId,
      },
      select: {
        id: true,
        slotStart: true,
        slotEnd: true,
        hairdrasser: {
          select: { id: true, spec: true, user: { select: { name: true } } },
        },
      },
    });
  }

  async assignToHairdresser(
    userId: string,
    assignUserDto: AssignDto,
  ): Promise<AppointmentAndSlot> {
    const timeSlot = await this.prisma.appointmentAndSlot.findFirst({
      where: {
        id: assignUserDto.timeSlotId,
        hairdresserId: assignUserDto.hairdresserId,
      },
    });

    if (!timeSlot) throw new NotFoundException(`Time slot not found`);
    if (timeSlot.userId === userId)
      throw new ConflictException(`You already booked on this slot`);
    else if (timeSlot.userId)
      throw new ConflictException(`Time slot already booked`);

    const updatedTimeSlot = await this.prisma.appointmentAndSlot.update({
      where: { id: timeSlot.id },
      data: {
        userId,
      },
    });

    await this.warmapService.updateTimers();

    return updatedTimeSlot;
  }

  async unAssignToHairdresser(
    req: any,
    userId: string,
    unAssignDto: UnAssignDto,
  ): Promise<AppointmentAndSlot> {
    const timeSlot = await this.prisma.appointmentAndSlot.findFirst({
      where: {
        id: unAssignDto.timeSlotId,
      },
    });

    if (!timeSlot) throw new NotFoundException(`Time slot not found`);

    if (timeSlot.userId !== userId || req?.user?.role === Role.ADMIN)
      throw new ForbiddenException(
        `You cannot edit someone else's appointment`,
      );

    return await this.prisma.appointmentAndSlot.update({
      where: {
        id: timeSlot.id,
      },
      data: {
        userId: null,
      },
    });
  }
}
