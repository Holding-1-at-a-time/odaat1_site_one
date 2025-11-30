// file: components/admin/booking-table.tsx
"use client";

import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { StatusBadge } from "./status-badge";
import { format } from "date-fns";
import { Loader2, Check, X, CheckCheck } from "lucide-react";

export function BookingTable() {
    const bookings = useQuery(api.bookings.getDashboardBookings);
    const updateStatus = useMutation(api.bookings.updateBookingStatus);

    if (bookings === undefined) {
        return (
            <div className="flex justify-center p-12">
                <Loader2 className="w-8 h-8 text-[#00ae98] animate-spin" />
            </div>
        );
    }

    if (bookings.length === 0) {
        return (
            <div className="text-center p-12 text-slate-400 border border-slate-800 rounded-lg bg-slate-900/50">
                No bookings found.
            </div>
        );
    }

    return (
        <div className="overflow-x-auto rounded-lg border border-slate-800">
            <table className="w-full text-left text-sm text-slate-400">
                <thead className="bg-slate-900 text-slate-200 uppercase font-medium">
                    <tr>
                        <th className="px-6 py-4">Customer</th>
                        <th className="px-6 py-4">Service</th>
                        <th className="px-6 py-4">Date</th>
                        <th className="px-6 py-4">Status</th>
                        <th className="px-6 py-4 text-right">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 bg-slate-950">
                    {bookings.map((booking) => (
                        <tr key={booking._id} className="hover:bg-slate-900/50 transition-colors">
                            <td className="px-6 py-4">
                                <div className="font-medium text-white">{booking.customerName}</div>
                                <div className="text-xs">{booking.customerEmail}</div>
                                <div className="text-xs">{booking.customerPhone}</div>
                            </td>
                            <td className="px-6 py-4 font-medium text-white">
                                {booking.serviceSlug.replace("-", " ")}
                            </td>
                            <td className="px-6 py-4">
                                {format(new Date(booking.scheduledDate), "MMM d, yyyy")}
                            </td>
                            <td className="px-6 py-4">
                                <StatusBadge status={booking.status} />
                            </td>
                            <td className="px-6 py-4 text-right">
                                <div className="flex justify-end gap-2">
                                    {booking.status === "pending" && (
                                        <>
                                            <button
                                                onClick={() => updateStatus({ bookingId: booking._id, status: "confirmed" })}
                                                className="p-2 bg-blue-500/10 text-blue-500 hover:bg-blue-500/20 rounded-md transition-colors"
                                                title="Confirm Booking"
                                            >
                                                <Check className="w-4 h-4" />
                                            </button>
                                            <button
                                                onClick={() => updateStatus({ bookingId: booking._id, status: "cancelled" })}
                                                className="p-2 bg-red-500/10 text-red-500 hover:bg-red-500/20 rounded-md transition-colors"
                                                title="Cancel Booking"
                                            >
                                                <X className="w-4 h-4" />
                                            </button>
                                        </>
                                    )}
                                    {booking.status === "confirmed" && (
                                        <button
                                            onClick={() => updateStatus({ bookingId: booking._id, status: "completed" })}
                                            className="p-2 bg-green-500/10 text-green-500 hover:bg-green-500/20 rounded-md transition-colors"
                                            title="Mark Completed"
                                        >
                                            <CheckCheck className="w-4 h-4" />
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