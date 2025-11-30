// file: convex/twilio.ts
import { Twilio } from "@convex-dev/twilio";
import { components } from "./_generated/api";

export const twilio = new Twilio(components.twilio, {
    // This environment variable must be set in your Convex Dashboard
    defaultFrom: process.env.TWILIO_PHONE_NUMBER!,
});