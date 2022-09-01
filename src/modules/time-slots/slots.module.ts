import { Module } from "@nestjs/common";
import { TimeSlotsService } from "./slots.service";
import { TimeSlotsController } from "./slots.controller";

@Module({
  controllers: [TimeSlotsController],
  providers: [TimeSlotsService],
})
export class TimeSlotsModule {}
