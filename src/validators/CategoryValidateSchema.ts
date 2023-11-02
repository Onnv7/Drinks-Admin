import { z } from "zod";
import { ValidateConstant } from "../constants/ValidateConstant";

export const createCategorySchema = z.object({
  image: z
    .any()
    .refine((value) => value !== null, { message: "Image must be not empty" }),
  name: z.string().min(1, { message: ValidateConstant.NOT_NULL }),
});

export const updateCategorySchema = z.object({
  image: z.any(),
  name: z.string().min(1, { message: ValidateConstant.NOT_NULL }),
});
