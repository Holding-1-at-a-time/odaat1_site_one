// file: convex/convex.config.ts
import { defineApp } from "convex/server";
import twilio from "@convex-dev/twilio/convex.config";
import workflow from "@convex-dev/workflow/convex.config";
import rateLimiter from "@convex-dev/rate-limiter/convex.config";
import resend from "@convex-dev/resend/convex.config";
import presence from "@convex-dev/presence/convex.config";
import agent from "@convex-dev/agent/convex.config"; // New
import actionRetrier from "@convex-dev/action-retrier/convex.config";

const app = defineApp();

app.use(twilio);
app.use(workflow);
app.use(actionRetrier);
app.use(rateLimiter);
app.use(resend);
app.use(presence);
app.use(agent); // Register Agent

export default app;