// file: convex/resend.ts
import { Resend } from "@convex-dev/resend";
import { components } from "./_generated/api";
import { internalMutation } from "./_generated/server";
import { v } from "convex/values";

// Initialize the Resend component
// We enable the webhook handler to track delivered/bounced status
export const resend = new Resend(components.resend, {
    // Pass your API key via env var RESEND_API_KEY automatically
    // We can add onEmailEvent here later for advanced tracking
});

/**
 * Sends a transactional email for a new lead/booking.
 * Uses the component's internal queue for reliability.
 */
export const sendBookingEmail = internalMutation({
    args: {
        email: v.string(),
        name: v.string(),
        serviceName: v.string(),
        scheduledDate: v.string(),
    },
    handler: async (ctx, args) => {
        // In Dev, testMode is true by default (only sends to 'delivered@resend.dev')
        // Set 'testMode: false' in the constructor above for Production.

        await resend.sendEmail(ctx, {
            from: "One Detail At A Time <onboarding@resend.dev>", // Verify your domain in Resend to change this
            to: args.email,
            subject: `Booking Confirmation: ${args.serviceName}`,
            html: `
        <h1>Hello ${args.name},</h1>
        <p>We received your request for <strong>${args.serviceName}</strong> on <strong>${args.scheduledDate}</strong>.</p>
        <p>Our team will review your request and contact you shortly to confirm details.</p>
        <br />
        <p>Thank you,<br/>One Detail At A Time LLC</p>
      `,
        });
    },
});