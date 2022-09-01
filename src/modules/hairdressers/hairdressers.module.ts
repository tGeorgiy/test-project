import { Module } from "@nestjs/common";
import { HairdressersService } from "./hairdressers.service";
import { HairdressersController } from "./hairdressers.controller";

@Module({
  controllers: [HairdressersController],
  providers: [HairdressersService],
})
export class HairdressersModule {}
