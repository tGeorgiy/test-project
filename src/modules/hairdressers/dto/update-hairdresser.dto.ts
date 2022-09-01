import { OmitType } from "@nestjs/mapped-types";
import { CreateHairdresserDto } from "./create-hairdresser.dto";

export class UpdateHairdresserDto extends OmitType(CreateHairdresserDto, [
  "userId",
] as const) {}
