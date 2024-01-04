import { Gender } from "../../enums/Gender";

export interface IEmployee {
  id: string;
  code: string;
  username: string;
  firstName: string;
  lastName: string;
  gender: Gender;
  enabled: boolean;
}
