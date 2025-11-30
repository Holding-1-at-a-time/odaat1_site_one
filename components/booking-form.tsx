// file: components/booking-form.tsx
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { bookingSchema, BookingFormValues } from "@/lib/schemas";
import { Loader2, CheckCircle } from "lucide-react";

export function BookingForm() {
    const [isSubmitted, setIsSubmitted] = useState(false);

    // Fetch services for the dropdown
    const services = useQuery(api.content.getAllPillars);

    const createBooking = useMutation(api.bookings.createBooking);

    const form = useForm<BookingFormValues>({
        resolver: zodResolver(bookingSchema),
        defaultValues: {
            customerName: "",
            customerEmail: "",
            customerPhone: "",
            serviceSlug: "",
            scheduledDate: "",
            notes: "",
        },
    });

    const onSubmit = async (data: BookingFormValues) => {
        try {
            await createBooking({
                customerName: data.customerName,
                customerEmail: data.customerEmail,
                customerPhone: data.customerPhone,
                serviceSlug: data.serviceSlug,
                scheduledDate: data.scheduledDate,
                notes: data.notes,
            });
            setIsSubmitted(true);
        } catch (error) {
            console.error("Booking failed:", error);
            alert("Something went wrong. Please try again.");
        }
    };

    if (isSubmitted) {
        return (
            <div className="bg-slate-900 border border-[#00ae98] rounded-xl p-8 text-center animate-in fade-in zoom-in duration-300">
                <div className="w-16 h-16 bg-[#00ae98]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-8 h-8 text-[#00ae98]" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Booking Received!</h3>
                <p className="text-slate-400 mb-6">
                    Thank you for choosing One Detail At A Time. We will contact you shortly to confirm your appointment.
                </p>
                <button
                    onClick={() => window.location.href = "/"}
                    className="bg-slate-800 hover:bg-slate-700 text-white font-medium py-2 px-6 rounded-lg transition-colors"
                >
                    Return Home
                </button>
            </div>
        );
    }

    return (
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
                {/* Name */}
                <div className="space-y-2">
                    <label htmlFor="customerName" className="text-sm font-medium text-slate-300">
                        Full Name
                    </label>
                    <input
                        {...form.register("customerName")}
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#00ae98] focus:ring-1 focus:ring-[#00ae98] transition-all"
                        placeholder="John Doe"
                    />
                    {form.formState.errors.customerName && (
                        <p className="text-red-500 text-xs">{form.formState.errors.customerName.message}</p>
                    )}
                </div>

                {/* Email */}
                <div className="space-y-2">
                    <label htmlFor="customerEmail" className="text-sm font-medium text-slate-300">
                        Email Address
                    </label>
                    <input
                        {...form.register("customerEmail")}
                        type="email"
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#00ae98] focus:ring-1 focus:ring-[#00ae98] transition-all"
                        placeholder="john@example.com"
                    />
                    {form.formState.errors.customerEmail && (
                        <p className="text-red-500 text-xs">{form.formState.errors.customerEmail.message}</p>
                    )}
                </div>

                {/* Phone */}
                <div className="space-y-2">
                    <label htmlFor="customerPhone" className="text-sm font-medium text-slate-300">
                        Phone Number
                    </label>
                    <input
                        {...form.register("customerPhone")}
                        type="tel"
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#00ae98] focus:ring-1 focus:ring-[#00ae98] transition-all"
                        placeholder="(726) 207-1007"
                    />
                    {form.formState.errors.customerPhone && (
                        <p className="text-red-500 text-xs">{form.formState.errors.customerPhone.message}</p>
                    )}
                </div>

                {/* Service Selection */}
                <div className="space-y-2">
                    <label htmlFor="serviceSlug" className="text-sm font-medium text-slate-300">
                        Service Required
                    </label>
                    <select
                        {...form.register("serviceSlug")}
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#00ae98] focus:ring-1 focus:ring-[#00ae98] transition-all appearance-none"
                    >
                        <option value="">Select a service...</option>
                        {services?.map((service) => (
                            <option key={service._id} value={service.slug}>
                                {service.serviceName}
                            </option>
                        ))}
                    </select>
                    {form.formState.errors.serviceSlug && (
                        <p className="text-red-500 text-xs">{form.formState.errors.serviceSlug.message}</p>
                    )}
                </div>

                {/* Date */}
                <div className="space-y-2">
                    <label htmlFor="scheduledDate" className="text-sm font-medium text-slate-300">
                        Preferred Date
                    </label>
                    <input
                        {...form.register("scheduledDate")}
                        type="date"
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#00ae98] focus:ring-1 focus:ring-[#00ae98] transition-all [color-scheme:dark]"
                    />
                    {form.formState.errors.scheduledDate && (
                        <p className="text-red-500 text-xs">{form.formState.errors.scheduledDate.message}</p>
                    )}
                </div>
            </div>

            {/* Notes */}
            <div className="space-y-2">
                <label htmlFor="notes" className="text-sm font-medium text-slate-300">
                    Additional Notes (Optional)
                </label>
                <textarea
                    {...form.register("notes")}
                    rows={4}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#00ae98] focus:ring-1 focus:ring-[#00ae98] transition-all resize-none"
                    placeholder="Tell us about your vehicle's condition or specific needs..."
                />
            </div>

            <button
                type="submit"
                disabled={form.formState.isSubmitting}
                className="w-full bg-[#00ae98] hover:bg-[#009b86] text-white font-bold py-4 rounded-lg transition-all flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {form.formState.isSubmitting ? (
                    <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        <span>Scheduling...</span>
                    </>
                ) : (
                    <span>Confirm Booking</span>
                )}
            </button>
        </form>
    );
}