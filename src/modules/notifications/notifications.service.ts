import { Injectable } from "@nestjs/common";
import * as moment from "moment";
import { PrismaService } from "../prisma/prisma.service";

const notificateUser = (userId: string): void => {
  console.log("User to notificate", userId);
};

@Injectable()
export class NotificationService {
  constructor(private prisma: PrismaService) {}

  // This should be done as a separate microservice + table in the database
  async updateTimers(): Promise<void> {
    const timeSlotStartTime = await this.prisma.appointmentAndSlot.findMany({
      where: {
        slotStart: {
          gt: moment().add(3, "hours").toISOString(),
        },
        userId: {
          not: null,
        },
      },
      select: {
        slotStart: true,
        userId: true,
      },
    });

    for (const timeSlot of timeSlotStartTime) {
      const timeToSlot = moment(timeSlot.slotStart)
        .subtract(3, "hours")
        .valueOf();
      const timeNow = moment().valueOf();
      const timeLeft = timeToSlot - timeNow;

      this.setNotificationToUser(timeLeft, timeSlot.userId as string);
    }
  }

  setNotificationToUser(timeLeft: number, userId: string): void {
    setTimeout(() => {
      notificateUser(userId);
    }, timeLeft);
  }
}
