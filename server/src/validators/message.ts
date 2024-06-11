import { z } from 'zod';

export const messageSchema = z.object({
  senderId: z.string().uuid(),
  text: z.string(),
  meetId: z.string()
})

