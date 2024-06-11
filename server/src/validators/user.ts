import { z } from "zod";

export const UserSignUp = z.object({
  username: z.string(),
  email: z.string({ message: 'Email is required' }).email(),
  password: z.string(),
});

