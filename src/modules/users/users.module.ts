import { Module } from "@nestjs/common";
import { UserController } from "./users.controller";
import { UserService } from "./users.service";
import { NotificationModule } from "../notifications/notifications.module";
import { AssignService } from "./assign.service";

@Module({
  imports: [NotificationModule],
  controllers: [UserController],
  providers: [UserService, AssignService],
  exports: [UserService],
})
export class UserModule {}
