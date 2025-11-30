// file: convex/users.ts
import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

/**
 * Interface strictly typed to match your Clerk JWT Template.
 * This ensures intellisense works for fields like 'source_platform' when reading the token.
 */
export interface ClerkClaims {
    // Standard Claims
    sub: string;
    aud: string;
    exp: number;
    iat: number;

    // Custom Mapped Claims (Matches your Clerk Dashboard JSON)
    clerk_id: string;
    external_id?: string;
    email?: string;
    email_verified?: boolean;
    phone_number?: string;
    phone_number_verified?: boolean;
    name?: string;
    given_name?: string;
    family_name?: string;
    nickname?: string;
    picture?: string;
    has_image?: boolean;

    // Metadata & Security
    public_metadata?: { role?: string;[key: string]: any };
    unsafe_metadata?: any;
    two_factor_enabled?: boolean;

    // Session & Platform
    session_actor?: any;
    source_platform?: string;

    // Timestamps
    created_at?: number;
    updated_at?: number;
    last_sign_in_at?: number;
}

/**
 * Returns the current user's profile populated INSTANTLY by the Token Claims.
 * No database lookup required for these fields.
 */
export const currentUser = query({
    args: {},
    handler: async (ctx) => {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) return null;

        // Cast identity to our typed interface to access custom claims
        const claims = identity as unknown as ClerkClaims;

        return {
            // Identity
            clerkId: claims.clerk_id || identity.subject, // Fallback to 'sub' if custom claim fails
            externalId: claims.external_id,

            // Contact
            email: claims.email || identity.email,
            isEmailVerified: claims.email_verified,
            phone: claims.phone_number,
            isPhoneVerified: claims.phone_number_verified,

            // Profile
            name: claims.name || identity.name,
            givenName: claims.given_name,
            familyName: claims.family_name,
            nickname: claims.nickname,
            picture: claims.picture || identity.pictureUrl,
            hasImage: claims.has_image,

            // Security & Metadata
            role: claims.public_metadata?.role, // Easy access to Role
            publicMetadata: claims.public_metadata,
            unsafeMetadata: claims.unsafe_metadata,
            twoFactorEnabled: claims.two_factor_enabled,

            // Platform
            sourcePlatform: claims.source_platform,

            // Timestamps
            createdAt: claims.created_at,
            updatedAt: claims.updated_at,
            lastSignInAt: claims.last_sign_in_at,
        };
    },
});

/**
 * Syncs the full user profile from Client -> Database.
 * This ensures we can Query/Filter users by these fields (e.g., "Find all users created in 2024").
 */
export const syncUser = mutation({
    args: {
        clerkId: v.string(),
        externalId: v.optional(v.string()),

        email: v.string(),
        emailVerified: v.boolean(),
        phone: v.optional(v.string()),
        phoneVerified: v.boolean(),

        name: v.optional(v.string()),
        givenName: v.optional(v.string()),
        familyName: v.optional(v.string()),
        nickname: v.optional(v.string()),
        picture: v.optional(v.string()),
        hasImage: v.boolean(),

        role: v.optional(v.string()),
        publicMetadata: v.optional(v.any()),
        unsafeMetadata: v.optional(v.any()),
        twoFactorEnabled: v.boolean(),

        sourcePlatform: v.optional(v.string()),

        clerkCreatedAt: v.optional(v.number()),
        clerkUpdatedAt: v.optional(v.number()),
        lastSignInAt: v.optional(v.number()),
    },
    handler: async (ctx, args) => {
        const existingUser = await ctx.db
            .query("users")
            .withIndex("by_clerk_id", (q) => q.eq("clerkId", args.clerkId))
            .first();

        const userData = {
            ...args,
            lastLogin: Date.now(),
        };

        if (existingUser) {
            await ctx.db.patch(existingUser._id, userData);
        } else {
            await ctx.db.insert("users", userData);
        }
    },
});