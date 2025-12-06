// file: convex/presence.ts
import { mutation, query } from "./_generated/server";
import { components } from "./_generated/api";
import { v } from "convex/values";
// Commented out due to missing @convex-dev/presence package
// import { Presence } from "@convex-dev/presence";

// Initialize Presence Component
// export const presence = new Presence(components.presence);

// Placeholder until package is installed
export const presence = null;

/**
 * Sent by the client periodically to prove they are online.
 */
export const heartbeat = mutation({
    args: {
        roomId: v.string(),    // e.g., "viewing-service-ceramic-coating" or "admin-dashboard"
        userId: v.string(),    // User ID or Anonymous Session ID
        sessionId: v.string(), // Unique tab ID
        interval: v.number(),  // How often client sends heartbeat
    },
    handler: async (ctx, args) => {
        // In the future, you can check authentication here
        // TODO: Uncomment when @convex-dev/presence package is installed
        // return await presence.heartbeat(ctx, args.roomId, args.userId, args.sessionId, args.interval);
        console.log(`Heartbeat from ${args.userId} in room ${args.roomId}`);
        return null;
    },
});

/**
 * Returns a list of all users currently in a room.
 */
export const list = query({
    args: { roomToken: v.string() },
    handler: async (ctx, { roomToken }) => {
        // TODO: Uncomment when @convex-dev/presence package is installed
        // return await presence.list(ctx, roomToken);
        console.log(`List users in room ${roomToken}`);
        return [];
    },
});

/**
 * Graceful disconnect (e.g., when closing tab).
 */
export const disconnect = mutation({
    args: { sessionToken: v.string() },
    handler: async (ctx, { sessionToken }) => {
        // TODO: Uncomment when @convex-dev/presence package is installed
        // return await presence.disconnect(ctx, sessionToken);
        console.log(`Disconnect session ${sessionToken}`);
        return null;
    },
});