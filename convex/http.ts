// file: convex/http.ts
import { httpRouter } from "convex/server";
import { httpAction } from "./_generated/server";
import { twilio } from "./twilio";
import { resend } from "./resend"; // Import the resend instance

const http = httpRouter();

// 1. Twilio Webhooks (SMS Status)
twilio.registerRoutes(http);

// 2. Resend Webhooks (Email Status: Delivered, Bounced, etc.)
http.route({
    path: "/resend-webhook",
    method: "POST",
    handler: httpAction(async (ctx, req) => {
        return await resend.handleResendEventWebhook(ctx, req);
    }),
});

export default http;