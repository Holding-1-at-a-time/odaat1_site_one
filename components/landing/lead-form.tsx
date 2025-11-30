// file: components/landing/lead-form.tsx
"use client";

import { useState } from "react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Loader2, ArrowRight, CheckCircle } from "lucide-react";

interface LeadFormProps {
    serviceSlug: string;
    serviceName: string;
}

export function LeadForm({ serviceSlug, serviceName }: LeadFormProps) {
    const submitLead = useMutation(api.leads.submitLead);
    const [formData, setFormData] = useState({ name: "", phone: "", email: "" });
    const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("submitting");

        try {
            await submitLead({
                serviceSlug,
                name: formData.name,
                phone: formData.phone,
                email: formData.email,
                notes: "Generated via Landing Page",
            });
            setStatus("success");
        } catch (error) {
            console.error(error);
            setStatus("idle");
            alert("Something went wrong. Please try again.");
        }
    };

    if (status === "success") {
        return (
            <div className="bg-[#00ae98] p-8 rounded-2xl text-center text-white shadow-xl animate-in fade-in zoom-in">
                <div className="bg-white/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-2">Request Received!</h3>
                <p className="opacity-90">
                    We will text/call you shortly to finalize your {serviceName} appointment.
                </p>
            </div>
        );
    }

    return (
        <div className="bg-white p-6 md:p-8 rounded-2xl shadow-2xl border-t-4 border-[#00ae98] text-slate-900">
            <h3 className="text-2xl font-bold mb-2 text-slate-900">
                Get Your Free Quote
            </h3>
            <p className="text-slate-500 mb-6 text-sm">
                San Antonio's Most Trusted Detailer. <br />
                <span className="text-[#00ae98] font-bold">Requires 20% Deposit to Book.</span>
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-xs font-bold uppercase text-slate-400 mb-1">Name</label>
                    <input
                        required
                        type="text"
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#00ae98] focus:outline-none transition-all"
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                </div>

                <div>
                    <label className="block text-xs font-bold uppercase text-slate-400 mb-1">Phone (Required)</label>
                    <input
                        required
                        type="tel"
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#00ae98] focus:outline-none transition-all"
                        placeholder="(210) 555-0123"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                </div>

                <div>
                    <label className="block text-xs font-bold uppercase text-slate-400 mb-1">Email (Optional)</label>
                    <input
                        type="email"
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#00ae98] focus:outline-none transition-all"
                        placeholder="john@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                </div>

                <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="w-full bg-[#00ae98] hover:bg-[#009b86] text-white font-bold py-4 rounded-lg shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 group"
                >
                    {status === "submitting" ? (
                        <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                        <>
                            Check Availability <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </>
                    )}
                </button>

                <p className="text-xs text-center text-slate-400 mt-4">
                    By submitting, you agree to receive SMS updates.
                </p>
            </form>
        </div>
    );
}