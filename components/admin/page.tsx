// file: app/admin/page.tsx
"use client";

import { useState } from "react";
import { BookingTable } from "@/components/admin/booking-table";
import { LeadsTable } from "@/components/admin/leads-table";
import { StatsCards } from "@/components/admin/stats-cards"; // New Stats Component
import { CalendarDays, Users } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Renders the admin dashboard page with analytics and a two-tab interface for Bookings and Inbound Leads.
 *
 * The component displays a header, analytics summary cards, a tab switcher that highlights the active tab,
 * and the table corresponding to the selected tab.
 *
 * @returns The JSX element for the admin dashboard containing header, stats cards, tab controls, and the active tab's table.
 */
export default function AdminDashboard() {
    const [activeTab, setActiveTab] = useState<"bookings" | "leads">("bookings");

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-white">Dashboard</h1>
                    <p className="text-slate-400">Overview of business performance.</p>
                </div>
            </div>

            {/* Analytics Overview */}
            <StatsCards />

            {/* Tabs Switcher */}
            <div className="flex space-x-1 bg-slate-900 p-1 rounded-lg w-fit border border-slate-800">
                <button
                    onClick={() => setActiveTab("bookings")}
                    className={cn(
                        "flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all",
                        activeTab === "bookings"
                            ? "bg-slate-800 text-white shadow-sm"
                            : "text-slate-400 hover:text-white hover:bg-slate-800/50"
                    )}
                >
                    <CalendarDays className="w-4 h-4" />
                    Bookings
                </button>
                <button
                    onClick={() => setActiveTab("leads")}
                    className={cn(
                        "flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all",
                        activeTab === "leads"
                            ? "bg-[#00ae98] text-white shadow-sm"
                            : "text-slate-400 hover:text-white hover:bg-slate-800/50"
                    )}
                >
                    <Users className="w-4 h-4" />
                    Inbound Leads
                </button>
            </div>

            {/* Dynamic Content */}
            <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                {activeTab === "bookings" ? (
                    <BookingTable />
                ) : (
                    <LeadsTable />
                )}
            </div>
        </div>
    );
}