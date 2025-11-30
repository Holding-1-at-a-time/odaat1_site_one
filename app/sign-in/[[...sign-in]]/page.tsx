// file: app/sign-in/[[...sign-in]]/page.tsx
import { SignIn } from "@clerk/nextjs";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Admin Login | One Detail At A Time",
};

export default function Page() {
    return (
        <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4">
            <div className="mb-8 text-center">
                <h1 className="text-2xl font-bold text-white mb-2">Admin Access</h1>
                <p className="text-slate-400">Please sign in to manage bookings.</p>
            </div>
            <SignIn
                appearance={{
                    elements: {
                        formButtonPrimary: "bg-[#00ae98] hover:bg-[#009b86]",
                        footerActionLink: "text-[#00ae98] hover:text-[#009b86]",
                        card: "bg-slate-900 border border-slate-800",
                        headerTitle: "text-white",
                        headerSubtitle: "text-slate-400",
                        socialButtonsBlockButton: "text-slate-300 border-slate-700 hover:bg-slate-800",
                        formFieldLabel: "text-slate-300",
                        formFieldInput: "bg-slate-950 border-slate-800 text-white",
                    }
                }}
            />
        </div>
    );
}