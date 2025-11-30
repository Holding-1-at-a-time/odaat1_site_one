// file: app/admin/layout.tsx
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Admin Dashboard | One Detail At A Time",
    robots: "noindex, nofollow", // Prevent indexing of admin pages
};

/**
 * Admin layout component that renders a sticky header and a centered main content area for admin pages.
 *
 * @param children - Content to render inside the layout's main container
 * @returns The layout element wrapping `children` with the admin header and main content area
 */
export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-slate-950">
            <header className="border-b border-slate-800 bg-slate-900 sticky top-0 z-10">
                <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                    <div className="font-bold text-xl text-white">
                        ODAAT <span className="text-[#00ae98]">Admin</span>
                    </div>
                    <nav className="flex gap-4">
                        <Link href="/" className="text-sm text-slate-400 hover:text-white transition-colors">
                            View Site
                        </Link>
                        <div className="w-px h-4 bg-slate-700 my-auto" />
                        <span className="text-sm text-slate-500">Logged in as Admin</span>
                    </nav>
                </div>
            </header>
            <main className="container mx-auto px-4 py-8">
                {children}
            </main>
        </div>
    );
}