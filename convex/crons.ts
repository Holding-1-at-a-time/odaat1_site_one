// file: convex/crons.ts
import { cronJobs } from "convex/server";
import { internal, components } from "./_generated/api";

const crons = cronJobs();

// 1. Business Logic: Auto-complete past bookings
crons.daily(
    "mark-completed-bookings",
    { hourUTC: 0, minuteUTC: 0 },
    internal.bookings.markPastBookingsCompleted,
);

// 2. Maintenance: Cleanup old email logs from Resend component
const ONE_WEEK_MS = 7 * 24 * 60 * 60 * 1000;

crons.interval(
    "cleanup-resend-emails",
    { hours: 24 }, // Run daily
    internal.crons.cleanupResendLogic
);

// We define the cleanup mutation here to call the component
import { internalMutation } from "./_generated/server";

export const cleanupResendLogic = internalMutation({
    args: {},
    handler: async (ctx) => {
        // Delete successful emails older than 7 days
        await ctx.scheduler.runAfter(0, components.resend.lib.cleanupOldEmails, {
            olderThan: ONE_WEEK_MS,
        });
        // Keep failed/bounced emails longer (4 weeks) for debugging
        await ctx.scheduler.runAfter(0, components.resend.lib.cleanupAbandonedEmails, {
            olderThan: 4 * ONE_WEEK_MS,
        });
    },
});

export default crons;