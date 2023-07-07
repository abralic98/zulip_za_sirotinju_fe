
import { z } from "zod";

export const createRoomSchema= z.object({
  name: z.string().min(1, {
    message: "Name must be at least 1 character.",
  }),
  password: z.string().min(2, {
    message: "Password must be at least 1 character.",
  }).optional().nullable(),
});

export const updateAccountSchema = z.object({
  username: z.string().min(3, {
    message: "Username must be at least 3 characters"
  }),
  firstName: z.string().min(3, {
    message: "First Name must be at least 3 characters"
  }),
  lastName: z.string().min(3, {
    message: "Last Name must be at least 3 characters"
  }),
  email: z.string().email()
})