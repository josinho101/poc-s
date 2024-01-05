import { z } from "zod";

export interface Product {
  id: number;
  unitCount: number;
  price: number;
  type: string;
  manufacturer: string;
  title: string;
  image: string;
}

export const ProductRequest = z.object({
  id: z.number().optional(),
  unitCount: z.number({
    required_error: "unitCount is required",
    invalid_type_error: "unitCount must be a number",
  }),
  price: z.number({
    required_error: "price is required",
    invalid_type_error: "unitCount must be a number",
  }),
  type: z.string({
    required_error: "type is required",
    invalid_type_error: "type must be a string",
  }),
  manufacturer: z.string({
    required_error: "manufacturer is required",
    invalid_type_error: "manufacturer must be a string",
  }),
  title: z.string({
    required_error: "title is required",
    invalid_type_error: "title must be a string",
  }),
  image: z.string({
    required_error: "image url is required",
    invalid_type_error: "image url must be a string",
  }),
});
