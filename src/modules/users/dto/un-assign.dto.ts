import { IsUUID } from "class-validator";

export class UnAssignDto {
  @IsUUID()
  readonly timeSlotId: string;
}
