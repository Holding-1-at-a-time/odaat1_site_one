// file: convex/convex.config.ts
import { defineApp } from "convex/server";
import twilio from "@convex-dev/twilio/convex.config";
import workflow from "@convex-dev/workflow/convex.config";
import retrier from "@convex-dev/retrier/convex.config";
import rateLimiter from "@convex-dev/rate-limiter/convex.config";
import resend from "@convex-dev/resend/convex.config";
import presence from "@convex-dev/presence/convex.config";
import agent from "@convex-dev/agent/convex.config"; // New

const app = defineApp();

app.use(twilio);
app.use(workflow);
app.use(retrier);
app.use(rateLimiter);
app.use(resend);
app.use(presence);
app.use(agent); // Register Agent

export default app;