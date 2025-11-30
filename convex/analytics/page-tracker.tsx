// file: components/analytics/page-tracker.tsx
"use client";

import { useEffect, useRef } from "react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";

interface PageTrackerProps {
    slug: string;
    type: "landing" | "pillar" | "home";
}

export function PageTracker({ slug, type }: PageTrackerProps) {
    const logView = useMutation(api.analytics.logPageView);
    const hasLogged = useRef(false);

    useEffect(() => {
        // Prevent double logging in React Strict Mode or on re-renders
        if (hasLogged.current) return;

        logView({ slug, type });
        hasLogged.current = true;
    }, [slug, type, logView]);

    return null; // Invisible component
}