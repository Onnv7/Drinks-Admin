import { z } from "zod";
import { ValidateConstant } from "../constants/ValidateConstant";

export const changeEmployeePasswordSchema = z
  .object({
    password: z
      .string()
      .min(6, { message: ValidateConstant.MIN_6_LENGTH })
      .max(32),
    rePassword: z
      .string()
      .min(6, { message: ValidateConstant.MIN_6_LENGTH })
      .max(32),
  })
  .refine((data) => data.password === data.rePassword, {
    message: "Password do not match",
    path: ["rePassword", "password"],
  });

export const createEmployeeSchema = z.object({
  firstName: z.string().min(1, { message: ValidateConstant.NOT_NULL }),
  lastName: z.string().min(1, { message: ValidateConstant.NOT_NULL }),
  username: z.string().min(6, { message: ValidateConstant.MIN_6_LENGTH }),
  password: z
    .string()
    .min(6, { message: ValidateConstant.MIN_6_LENGTH })
    .max(32),
  birthDate: z
    .string()
    .min(10, { message: ValidateConstant.NOT_NULL })
    .max(10, { message: ValidateConstant.NOT_NULL }),
});

export const updateEmployeeSchema = z.object({
  firstName: z.string().min(1, { message: ValidateConstant.NOT_NULL }),
  lastName: z.string().min(1, { message: ValidateConstant.NOT_NULL }),
  username: z.string().min(6, { message: ValidateConstant.MIN_6_LENGTH }),
  password: z
    .string()
    .min(6, { message: ValidateConstant.MIN_6_LENGTH })
    .max(32),
  birthDate: z
    .string()
    .min(10, { message: ValidateConstant.NOT_NULL })
    .max(10, { message: ValidateConstant.NOT_NULL }),
});
