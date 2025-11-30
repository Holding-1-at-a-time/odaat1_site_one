// file: convex/actions.ts
import { action } from "./_generated/server";
import { v } from "convex/values";

export const sendBookingNotification = action({
    args: {
        bookingId: v.id("bookings"),
        customerName: v.string(),
        scheduledDate: v.string(),
    },
    handler: async (ctx, args) => {
        // In a real app, you would use Resend, SendGrid, or AWS SES here.
        // Example: await resend.emails.send({ ... })

        console.log(`📧 [EMAIL SENT] To: Admin | Subject: New Booking from ${args.customerName}`);
        console.log(`   Details: ${args.scheduledDate} - Booking ID: ${args.bookingId}`);

        // Simulate network delay
        await new Promise((resolve) => setTimeout(resolve, 500));

        return { success: true };
    },
});