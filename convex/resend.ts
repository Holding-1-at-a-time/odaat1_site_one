// file: convex/resend.ts
// Commented out due to missing @convex-dev/resend package
// import { Resend } from "@convex-dev/resend";
// import { components } from "./_generated/api";
import { internalMutation } from "./_generated/server";
import { v } from "convex/values";

// Initialize the Resend component
// TODO: Add onEmailEvent webhook handler to track delivered/bounced status
// export const resend = new Resend(components.resend, {
//     // API key is passed via env var RESEND_API_KEY automatically
// });

// Placeholder until package is installed
export const resend = null;
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
    returns: v.null(),
    handler: async (ctx, args) => {        
        // Set 'testMode: false' in the constructor above for Production.
        // TODO: Uncomment when @convex-dev/resend package is installed
        /*
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
        */
        console.log(`Would send booking email to ${args.email} for ${args.serviceName} on ${args.scheduledDate}`);
    },
});