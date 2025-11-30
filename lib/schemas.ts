// file: lib/schemas.ts
import { z } from "zod";

export const bookingSchema = z.object({
    customerName: z.string().min(2, "Name must be at least 2 characters"),
    customerEmail: z.string().email("Please enter a valid email address"),
    customerPhone: z.string().min(10, "Please enter a valid phone number"),
    serviceSlug: z.string().min(1, "Please select a service"),
    scheduledDate: z.string().refine((date) => new Date(date) > new Date(), {
        message: "Booking date must be in the future",
    }),
    notes: z.string().optional(),
});

export type BookingFormValues = z.infer<typeof bookingSchema>;