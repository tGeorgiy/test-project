import { IsEmail, IsString } from "class-validator";

export class CreateUserDto {
  @IsString()
  readonly name: string;

  @IsString()
  readonly phone: string;

  @IsEmail()
  readonly email: string;

  @IsString()
  readonly password?: string;
}
