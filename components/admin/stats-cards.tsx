// file: components/admin/stats-cards.tsx
"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Eye, MousePointerClick, CalendarCheck, TrendingUp } from "lucide-react";

export function StatsCards() {
    const stats = useQuery(api.analytics.getKeyMetrics);

    if (!stats) {
        return <div className="h-24 bg-slate-900/50 rounded-xl animate-pulse" />;
    }

    const items = [
        {
            label: "30-Day Views",
            value: stats.totalViews,
            icon: Eye,
            color: "text-blue-500",
            bg: "bg-blue-500/10",
        },
        {
            label: "Total Leads",
            value: stats.totalLeads,
            icon: MousePointerClick,
            color: "text-[#00ae98]",
            bg: "bg-[#00ae98]/10",
        },
        {
            label: "Conversion Rate",
            value: `${stats.conversionRate}%`,
            icon: TrendingUp,
            color: "text-yellow-500",
            bg: "bg-yellow-500/10",
        },
        {
            label: "Active Bookings",
            value: stats.totalBookings,
            icon: CalendarCheck,
            color: "text-purple-500",
            bg: "bg-purple-500/10",
        },
    ];

    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {items.map((item) => (
                <div key={item.label} className="bg-slate-900 border border-slate-800 p-4 rounded-xl">
                    <div className="flex items-center gap-3 mb-2">
                        <div className={`p-2 rounded-lg ${item.bg}`}>
                            <item.icon className={`w-4 h-4 ${item.color}`} />
                        </div>
                        <span className="text-slate-400 text-xs font-medium uppercase">{item.label}</span>
                    </div>
                    <div className="text-2xl font-bold text-white pl-1">
                        {item.value}
                    </div>
                </div>
            ))}
        </div>
    );
}