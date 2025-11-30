// file: components/admin/leads-table.tsx
"use client";

import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { formatDistanceToNow } from "date-fns";
import { Loader2, Phone, CheckCircle, Archive, MessageSquare } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Display a dashboard table of leads with per-lead actions to update status.
 *
 * Renders a loading indicator while leads are being fetched, an empty-state message when there are no leads, or a scrollable table of leads showing received time, prospect contact details, interest (service), status badge, and action buttons to change a lead's status.
 *
 * @returns A React element that shows either a loading indicator, an empty-state message, or a table of leads with contact details, interest, status, and action controls to update lead status.
 */
export function LeadsTable() {
    const leads = useQuery(api.leads.getDashboardLeads);
    const updateStatus = useMutation(api.leads.updateLeadStatus);

    if (leads === undefined) {
        return (
            <div className="flex justify-center p-12">
                <Loader2 className="w-8 h-8 text-[#00ae98] animate-spin" />
            </div>
        );
    }

    if (leads.length === 0) {
        return (
            <div className="text-center p-12 text-slate-400 border border-slate-800 rounded-lg bg-slate-900/50">
                No leads capture yet. Share your landing pages to get started!
            </div>
        );
    }

    return (
        <div className="overflow-x-auto rounded-lg border border-slate-800">
            <table className="w-full text-left text-sm text-slate-400">
                <thead className="bg-slate-900 text-slate-200 uppercase font-medium">
                    <tr>
                        <th className="px-6 py-4">Received</th>
                        <th className="px-6 py-4">Prospect</th>
                        <th className="px-6 py-4">Interest</th>
                        <th className="px-6 py-4">Status</th>
                        <th className="px-6 py-4 text-right">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 bg-slate-950">
                    {leads.map((lead) => (
                        <tr key={lead._id} className={cn(
                            "hover:bg-slate-900/50 transition-colors",
                            lead.status === "new" && "bg-[#00ae98]/5" // Highlight new leads
                        )}>
                            <td className="px-6 py-4 whitespace-nowrap">
                                {formatDistanceToNow(lead.createdAt, { addSuffix: true })}
                            </td>
                            <td className="px-6 py-4">
                                <div className="font-medium text-white text-base">{lead.name}</div>
                                <div className="flex items-center gap-2 mt-1">
                                    <a href={`tel:${lead.phone}`} className="flex items-center gap-1 text-[#00ae98] hover:underline">
                                        <Phone className="w-3 h-3" /> {lead.phone}
                                    </a>
                                </div>
                                {lead.email && <div className="text-xs mt-0.5">{lead.email}</div>}
                            </td>
                            <td className="px-6 py-4">
                                <span className="bg-slate-800 text-white px-2 py-1 rounded text-xs border border-slate-700">
                                    {lead.serviceSlug}
                                </span>
                                {lead.notes && (
                                    <p className="text-xs mt-2 italic opacity-70 max-w-[200px] truncate">{lead.notes}</p>
                                )}
                            </td>
                            <td className="px-6 py-4">
                                <span className={cn(
                                    "px-2.5 py-0.5 rounded-full text-xs font-medium border capitalize",
                                    lead.status === "new" ? "bg-green-500/10 text-green-500 border-green-500/20" :
                                        lead.status === "contacted" ? "bg-blue-500/10 text-blue-500 border-blue-500/20" :
                                            "bg-slate-800 text-slate-500 border-slate-700"
                                )}>
                                    {lead.status}
                                </span>
                            </td>
                            <td className="px-6 py-4 text-right">
                                <div className="flex justify-end gap-2">
                                    {lead.status === "new" && (
                                        <button
                                            onClick={() => updateStatus({ leadId: lead._id, status: "contacted" })}
                                            className="p-2 bg-blue-500/10 text-blue-500 hover:bg-blue-500/20 rounded-md transition-colors"
                                            title="Mark as Contacted"
                                        >
                                            <MessageSquare className="w-4 h-4" />
                                        </button>
                                    )}
                                    {lead.status !== "converted" && (
                                        <button
                                            onClick={() => updateStatus({ leadId: lead._id, status: "converted" })}
                                            className="p-2 bg-green-500/10 text-green-500 hover:bg-green-500/20 rounded-md transition-colors"
                                            title="Mark Converted (Booked)"
                                        >
                                            <CheckCircle className="w-4 h-4" />
                                        </button>
                                    )}
                                    {lead.status !== "archived" && (
                                        <button
                                            onClick={() => updateStatus({ leadId: lead._id, status: "archived" })}
                                            className="p-2 bg-slate-800 text-slate-400 hover:bg-slate-700 rounded-md transition-colors"
                                            title="Archive Lead"
                                        >
                                            <Archive className="w-4 h-4" />
                                        </button>
                                    )}
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}