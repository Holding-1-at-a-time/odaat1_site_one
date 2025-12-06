// file: convex/convex.config.ts
import { defineApp } from "convex/server";
// Import the main exports from @convex-dev packages
// These are commented out to avoid bundling errors since the packages aren't installed
// import { Twilio } from "@convex-dev/twilio";
// import { Resend } from "@convex-dev/resend";
// import { Presence } from "@convex-dev/presence";
// Note: workflow, retrier, rate-limiter, agent might not be needed as middleware
// or may have different export patterns

const app = defineApp();

// Only register packages that actually need middleware registration
// For now, let's start with the ones that are actually used in the codebase
// and have a clear middleware pattern

export default app;