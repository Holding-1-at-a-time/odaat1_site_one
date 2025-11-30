// file: app/landing/[serviceSlug]/layout.tsx
import { Metadata } from "next";
import Link from "next/link";
import { Phone } from "lucide-react";
import { BUSINESS_NAP } from "@/lib/constants";
import { PageTracker } from "@/components/analytics/page-tracker"; // Added Tracker

export const metadata: Metadata = {
    robots: "noindex, nofollow",
};

/**
 * Renders the landing page layout for a specific service slug, wrapping provided page content with a header, analytics injection, and footer.
 *
 * @param children - The main page content to render inside the layout.
 * @param params - A promise that resolves to route parameters; the layout extracts `serviceSlug` to scope analytics and page behavior.
 * @returns A JSX element representing the complete landing layout for the resolved `serviceSlug`.
 */
export default async function LandingLayout({
    children,
    params
}: {
    children: React.ReactNode;
    params: Promise<{ serviceSlug: string }>;
}) {
    const { serviceSlug } = await params;

    return (
        <div className="min-h-screen bg-slate-950 text-slate-50 selection:bg-[#00ae98] selection:text-white">
            {/* Analytics Injection */}
            <PageTracker slug={serviceSlug} type="landing" />

            <header className="absolute top-0 w-full z-50 py-6">
                <div className="container mx-auto px-4 flex justify-between items-center">
                    <Link href="/" className="font-bold text-xl md:text-2xl text-white">
                        ODAAT <span className="text-[#00ae98]">Studios</span>
                    </Link>
                    <a
                        href={`tel:${BUSINESS_NAP.phone.replace(/\D/g, "")}`}
                        className="flex items-center gap-2 font-bold text-white hover:text-[#00ae98] transition-colors"
                    >
                        <div className="bg-[#00ae98] p-2 rounded-full">
                            <Phone className="w-4 h-4 text-white" />
                        </div>
                        <span className="hidden md:inline">{BUSINESS_NAP.phone}</span>
                    </a>
                </div>
            </header>

            <main>
                {children}
            </main>

            <footer className="bg-slate-900 py-8 text-center text-slate-500 text-sm border-t border-slate-800">
                <p>&copy; {new Date().getFullYear()} One Detail At A Time LLC. San Antonio, TX.</p>
                <p className="mt-2 text-xs opacity-60">Proud Supporter of Junior Achievement South Texas.</p>
            </footer>
        </div>
    );
}