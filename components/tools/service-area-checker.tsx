// file: components/tools/service-area-checker.tsx
"use client";

import { useState } from "react";
import { SERVICE_AREAS } from "@/lib/service-areas";
import { MapPin, CheckCircle, XCircle, Loader2 } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function ServiceAreaChecker({ className }: { className?: string }) {
  const [zip, setZip] = useState("");
  const [status, setStatus] = useState<"idle" | "checking" | "available" | "unavailable">("idle");

  const checkArea = (e: React.FormEvent) => {
    e.preventDefault();
    if (zip.length !== 5) return;

    setStatus("checking");
    
    // Simulate a brief network delay for UX realism, 
    // though the check is instant/local.
    setTimeout(() => {
      if (SERVICE_AREAS.includes(zip)) {
        setStatus("available");
      } else {
        setStatus("unavailable");
      }
    }, 600);
  };

  return (
    <div className={cn("bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8", className)}>
      <div className="flex items-center gap-3 mb-4">
        <div className="bg-[#00ae98]/10 p-2.5 rounded-lg">
          <MapPin className="w-6 h-6 text-[#00ae98]" />
        </div>
        <h3 className="text-xl font-bold text-white">Do We Come To You?</h3>
      </div>
      
      <p className="text-slate-400 mb-6 text-sm">
        Enter your ZIP code to verify if your location is within our mobile service radius.
      </p>

      <form onSubmit={checkArea} className="relative">
        <div className="flex gap-2">
          <input
            type="text"
            value={zip}
            onChange={(e) => {
              setZip(e.target.value.replace(/\D/g, "").slice(0, 5));
              setStatus("idle");
            }}
            placeholder="e.g. 78258"
            className="flex-1 bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#00ae98] placeholder:text-slate-600 font-mono tracking-wider"
            maxLength={5}
          />
          <button
            type="submit"
            disabled={zip.length < 5 || status === "checking"}
            className="bg-[#00ae98] hover:bg-[#009b86] disabled:opacity-50 disabled:cursor-not-allowed text-white px-6 rounded-lg font-bold transition-colors flex items-center"
          >
            {status === "checking" ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              "Check"
            )}
          </button>
        </div>
      </form>

      {/* Result Messages */}
      {status === "available" && (
        <div className="mt-4 animate-in fade-in slide-in-from-top-2">
          <div className="flex items-start gap-3 bg-green-500/10 border border-green-500/20 p-4 rounded-lg">
            <CheckCircle className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
            <div>
              <p className="text-green-500 font-bold text-sm">You're in our service area!</p>
              <p className="text-green-400/80 text-xs mt-1 mb-3">
                We are frequently in {zip}.
              </p>
              <Link 
                href="/booking"
                className="text-sm bg-green-500 text-white px-4 py-2 rounded-md font-bold hover:bg-green-600 transition-colors inline-block"
              >
                Book Now
              </Link>
            </div>
          </div>
        </div>
      )}

      {status === "unavailable" && (
        <div className="mt-4 animate-in fade-in slide-in-from-top-2">
          <div className="flex items-start gap-3 bg-red-500/10 border border-red-500/20 p-4 rounded-lg">
            <XCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
            <div>
              <p className="text-red-500 font-bold text-sm">We might not be there yet.</p>
              <p className="text-red-400/80 text-xs mt-1 mb-2">
                Zip code {zip} is currently outside our standard radius, but we may make exceptions for large packages.
              </p>
              <Link 
                href="/contact"
                className="text-xs text-white underline hover:text-red-400"
              >
                Contact us to inquire
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}