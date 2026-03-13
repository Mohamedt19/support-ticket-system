import { z } from "zod";

export const createTicketSchema = z.object({
  title: z.string().min(3),
  description: z.string().min(5),
  priority: z.enum(["low", "medium", "high"]).optional(),
  categoryId: z.number().int().positive().optional(),
});

export const updateTicketSchema = z.object({
  title: z.string().min(3).optional(),
  description: z.string().min(5).optional(),
  status: z.enum(["open", "in_progress", "closed"]).optional(),
  priority: z.enum(["low", "medium", "high"]).optional(),
  categoryId: z.number().int().positive().nullable().optional(),
});