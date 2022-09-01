import { IsDateString, IsUUID } from "class-validator";

export class CreateSlotDto {
  @IsUUID()
  readonly hairdresserId: string;

  @IsDateString()
  readonly slotStart: string;

  @IsDateString()
  readonly slotEnd: string;
}
