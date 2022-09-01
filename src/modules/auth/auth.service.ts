import { Injectable } from "@nestjs/common";
import * as bcrypt from "bcrypt";
import { UserInReq } from "../../types/types";
import { UserService } from "../users/users.service";

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  //validate a user
  async validateUser(
    useremail: string,
    password: string,
  ): Promise<UserInReq | null> {
    const user = await this.userService.findByEmail(useremail);

    const passwordValid = await bcrypt.compare(
      password,
      user.password as string,
    );

    if (user && passwordValid) {
      return {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      };
    }

    return null;
  }
}
