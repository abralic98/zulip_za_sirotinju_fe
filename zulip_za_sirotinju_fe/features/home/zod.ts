
import { z } from "zod";

export const createRoomSchema= z.object({
  name: z.string().min(1, {
    message: "Name must be at least 1 character.",
  }),
  password: z.string().min(2, {
    message: "Password must be at least 1 character.",
  }).optional().nullable(),
});