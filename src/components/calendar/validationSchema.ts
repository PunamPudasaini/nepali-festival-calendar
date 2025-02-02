import { z } from "zod";

export const festivalSchema = z.object({
  description: z.any().optional(),
  festivalName: z.string().min(1, {
    message: "Festival Name is required",
  }),
  date: z.string().min(1, {
    message: "Date is required",
  }),
});
