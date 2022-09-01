import { IsString, IsUUID } from "class-validator";

export class CreateHairdresserDto {
  @IsUUID()
  readonly userId: string;

  @IsString()
  readonly spec: string;
}
