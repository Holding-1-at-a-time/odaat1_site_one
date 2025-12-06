// file: convex/http.ts
import { httpRouter } from "convex/server";
import { httpAction } from "./_generated/server";
import { twilio } from "./twilio";
import { resend } from "./resend"; // Import the resend instance

const http = httpRouter();

// 1. Twilio Webhooks (SMS Status)
if (twilio) {
    (twilio as any).registerRoutes(http);
}

// 2. Resend Webhooks (Email Status: Delivered, Bounced, etc.)
http.route({
    path: "/resend-webhook",
    method: "POST",
    handler: httpAction(async (ctx, req) => {
        if (resend && typeof (resend as any).handleResendEventWebhook === "function") {
            return await (resend as any).handleResendEventWebhook(ctx, req);
        }
        return new Response("Resend handler not available", { status: 500 });
    }),
});
export default http;