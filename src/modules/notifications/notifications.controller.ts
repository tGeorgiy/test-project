import { Controller, Injectable, OnApplicationBootstrap } from "@nestjs/common";
import { NotificationService } from "./notifications.service";

@Injectable()
@Controller()
export class NotificationController implements OnApplicationBootstrap {
  constructor(private readonly notificationService: NotificationService) {}

  onApplicationBootstrap() {
    this.notificationService.updateTimers();
  }
}
