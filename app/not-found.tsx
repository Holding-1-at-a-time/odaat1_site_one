// file: app/not-found.tsx
import Link from "next/link";
import { ArrowLeft, Search } from "lucide-react";

export default function NotFound() {
    return (
        <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 bg-slate-950">
            <div className="bg-[#00ae98]/10 p-6 rounded-full mb-8">
                <Search className="w-12 h-12 text-[#00ae98]" />
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Page Not Found
            </h1>

            <p className="text-lg text-slate-400 max-w-md mb-8">
                Looks like this spot was missed. The page you are looking for might have been moved or doesn't exist.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
                <Link
                    href="/"
                    className="flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 text-white px-6 py-3 rounded-full font-medium transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back Home
                </Link>
                <Link
                    href="/services"
                    className="bg-[#00ae98] hover:bg-[#009b86] text-white px-8 py-3 rounded-full font-bold transition-colors"
                >
                    View All Services
                </Link>
            </div>
        </div>
    );
}