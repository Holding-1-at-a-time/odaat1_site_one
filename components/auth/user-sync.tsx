// file: components/auth/user-sync.tsx
"use client";

import { useUser } from "@clerk/nextjs";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useEffect } from "react";

export function UserSync() {
    const { user, isLoaded } = useUser();
    const syncUser = useMutation(api.users.syncUser);

    useEffect(() => {
        if (!isLoaded || !user) return;

        // Helper to safely parse dates from Clerk SDK (which might return Date objects or null)
        const getTime = (date: Date | null | undefined) => date ? date.getTime() : undefined;

        // Extract Role from publicMetadata (Type assertion for safety)
        const metadata = user.publicMetadata as { role?: string;[key: string]: any };

        syncUser({
            // IDs
            clerkId: user.id,
            externalId: user.externalId || undefined,

            // Contact
            email: user.primaryEmailAddress?.emailAddress || "",
            emailVerified: user.primaryEmailAddress?.verification?.status === "verified",
            phone: user.primaryPhoneNumber?.phoneNumber,
            phoneVerified: user.primaryPhoneNumber?.verification?.status === "verified",

            // Profile
            name: user.fullName || undefined,
            givenName: user.firstName || undefined,
            familyName: user.lastName || undefined,
            nickname: user.username || undefined,
            picture: user.imageUrl,
            hasImage: user.hasImage,

            // Metadata & Security
            role: metadata.role,
            publicMetadata: user.publicMetadata,
            unsafeMetadata: user.unsafeMetadata,
            twoFactorEnabled: user.twoFactorEnabled,

            // Timestamps
            clerkCreatedAt: getTime(user.createdAt),
            clerkUpdatedAt: getTime(user.updatedAt),
            lastSignInAt: getTime(user.lastSignInAt),
        }).catch((err) => {
            // In production, you might want to log this to an error tracking service
            console.error("Failed to sync user claims:", err);
        });
    }, [user, isLoaded, syncUser]);

    return null; // Invisible component
}