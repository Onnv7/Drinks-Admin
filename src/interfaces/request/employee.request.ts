import { Gender } from "../../enums/Gender";

export interface ICreateEmployeeReq {
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  gender: string;
  birthDate: string;
}
export interface IUpdateEmployeeReq {
  id: string;
  code: string;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  gender: string;
  birthDate: string;
  enabled: boolean;
}

export interface IChangePasswordReq {
  password: string;
}

export interface IUpdatePasswordReq {
  oldPassword: string;
  newPassword: string;
}
