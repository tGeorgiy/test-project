import { Module } from "@nestjs/common";
import { UserModule } from "./modules/users/users.module";
import { PrismaModule } from "./modules/prisma/prisma.module";
import { ThrottlerModule } from "@nestjs/throttler";
import { HairdressersModule } from "./modules/hairdressers/hairdressers.module";
import { TimeSlotsModule } from "./modules/time-slots/slots.module";
import { NotificationModule } from "./modules/notifications/notifications.module";
import { AuthModule } from "./modules/auth/auth.module";

@Module({
  imports: [
    ThrottlerModule.forRoot({
      ttl: 1,
      limit: 100,
    }),
    PrismaModule,
    NotificationModule,
    UserModule,
    AuthModule,
    HairdressersModule,
    TimeSlotsModule,
  ],
})
export class AppModule {}
