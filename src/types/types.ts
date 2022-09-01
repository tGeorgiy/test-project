import { Role, User } from "@prisma/client";

export type AllUsers = {
  id: string;
  phone: string;
  email: string;
  name: string;
  role: Role;
  createdAt: Date;
  updatedAt: Date;
};

export type MsgType = {
  msg: string;
};

export type UserInReq = {
  id: string;
  name: string;
  email: string;
  role: Role;
};

export type LoginType = {
  User: UserInReq;
  msg: string;
};

export type UserOverride = Omit<User, "password"> & {
  password: string | undefined | null;
};
