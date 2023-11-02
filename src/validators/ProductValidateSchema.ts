import { z } from "zod";
import { ValidateConstant } from "../constants/ValidateConstant";

export const sizeSchema = z.object({
  size: z.string().min(1, { message: ValidateConstant.NOT_NULL }),
  price: z.number().refine((value) => value >= 5000, {
    message: "Price must be greater than or equal to 5000 ",
  }),
});

export const toppingSchema = z.object({
  name: z.string().min(1, { message: ValidateConstant.NOT_NULL }),
  price: z.number().refine((value) => value >= 5000, {
    message: "Price must be greater than or equal to 5000 ",
  }),
});

export const createProductSchema = z.object({
  name: z.string().min(1, { message: ValidateConstant.NOT_NULL }),
  description: z.string().min(1, { message: ValidateConstant.NOT_NULL }),
  categoryId: z.string().min(1, { message: ValidateConstant.NOT_NULL }),
  sizeList: z.array(sizeSchema).refine((value) => value.length > 0, {
    message: "Size must not be empty",
    path: ["sizeList"],
  }),
  image: z
    .any()
    .refine((value) => value !== null, { message: "Image must not be empty" }),
});

export const updateProductSchema = z.object({
  name: z.string().min(1, { message: ValidateConstant.NOT_NULL }),
  description: z.string().min(1, { message: ValidateConstant.NOT_NULL }),
  categoryId: z.string().min(1, { message: ValidateConstant.NOT_NULL }),
  sizeList: z.array(sizeSchema).refine((value) => value.length > 0, {
    message: "Size must not be empty",
    path: ["sizeList"],
  }),
  image: z.any(),
});
