// file: app/booking/page.tsx
import { BookingForm } from "@/components/booking-form";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Book Auto Detailing | One Detail At A Time",
    description: "Schedule your professional auto detailing service in San Antonio. Quick and easy online booking.",
};

export default function BookingPage() {
    return (
        <div className="min-h-screen bg-slate-950 py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-white mb-4">
                        Book Your Detail
                    </h1>
                    <p className="text-lg text-slate-400">
                        Tell us about your vehicle and preferred time. We'll bring the showroom shine to you.
                    </p>
                </div>

                <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-2xl p-6 md:p-10 shadow-xl">
                    <BookingForm />
                </div>

                <div className="mt-8 text-center text-sm text-slate-500">
                    <p>
                        Prefer to call? <a href="tel:7262071007" className="text-[#00ae98] hover:underline">(726) 207-1007</a>
                    </p>
                    <p className="mt-2">
                        Serving San Antonio, Stone Oak, Alamo Heights & Surrounding Areas
                    </p>
                </div>
            </div>
        </div>
    );
}