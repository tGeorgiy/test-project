import { IsUUID } from "class-validator";

export class AssignDto {
  @IsUUID()
  readonly hairdresserId: string;

  @IsUUID()
  readonly timeSlotId: string;
}
