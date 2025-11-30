// file: convex/presence.ts
import { mutation, query } from "./_generated/server";
import { components } from "./_generated/api";
import { v } from "convex/values";
import { Presence } from "@convex-dev/presence";

// Initialize Presence Component
export const presence = new Presence(components.presence);

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
        return await presence.heartbeat(ctx, args.roomId, args.userId, args.sessionId, args.interval);
    },
});

/**
 * Returns a list of all users currently in a room.
 */
export const list = query({
    args: { roomToken: v.string() },
    handler: async (ctx, { roomToken }) => {
        return await presence.list(ctx, roomToken);
    },
});

/**
 * Graceful disconnect (e.g., when closing tab).
 */
export const disconnect = mutation({
    args: { sessionToken: v.string() },
    handler: async (ctx, { sessionToken }) => {
        return await presence.disconnect(ctx, sessionToken);
    },
});