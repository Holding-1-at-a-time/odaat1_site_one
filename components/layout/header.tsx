// file: components/layout/header.tsx
"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, Phone } from "lucide-react";
import { BUSINESS_NAP } from "@/lib/constants";

/**
 * Render the responsive site header with brand, navigation links, contact phone, and booking actions.
 *
 * The header displays a horizontal navigation and call-to-action on medium+ screens and a toggleable
 * mobile menu on small screens. The mobile menu opens and closes via local state and closes when a
 * navigation or booking link is selected.
 *
 * @returns The header JSX element containing the brand, navigation, phone link, and booking controls.
 */
export function Header() {
    const [isOpen, setIsOpen] = useState(false);

    const navLinks = [
        { href: "/", label: "Home" },
        { href: "/services", label: "Services" },
        { href: "/about", label: "About" },
        { href: "/contact", label: "Contact" },
    ];

    return (
        <header className="sticky top-0 z-50 w-full border-b border-slate-800 bg-slate-950/80 backdrop-blur supports-[backdrop-filter]:bg-slate-950/60">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="font-bold text-xl text-white flex items-center gap-2">
                    <span className="text-[#00ae98]">ODAAT</span>
                    <span className="hidden sm:inline-block">One Detail At A Time</span>
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className="text-sm font-medium text-slate-300 hover:text-[#00ae98] transition-colors"
                        >
                            {link.label}
                        </Link>
                    ))}
                    <a
                        href={`tel:${BUSINESS_NAP.phone.replace(/\D/g, "")}`}
                        className="flex items-center gap-2 text-sm font-bold text-white bg-slate-800 hover:bg-slate-700 px-4 py-2 rounded-full transition-colors"
                    >
                        <Phone className="w-4 h-4 text-[#00ae98]" />
                        {BUSINESS_NAP.phone}
                    </a>
                    <Link
                        href="/booking"
                        className="text-sm font-bold text-white bg-[#00ae98] hover:bg-[#009b86] px-5 py-2 rounded-full transition-colors"
                    >
                        Book Now
                    </Link>
                </nav>

                {/* Mobile Menu Toggle */}
                <button
                    className="md:hidden text-slate-300 hover:text-white"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X /> : <Menu />}
                </button>
            </div>

            {/* Mobile Nav */}
            {isOpen && (
                <div className="md:hidden border-t border-slate-800 bg-slate-950 absolute w-full">
                    <nav className="flex flex-col p-4 space-y-4">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                onClick={() => setIsOpen(false)}
                                className="text-base font-medium text-slate-300 hover:text-[#00ae98]"
                            >
                                {link.label}
                            </Link>
                        ))}
                        <hr className="border-slate-800" />
                        <Link
                            href="/booking"
                            onClick={() => setIsOpen(false)}
                            className="text-center w-full bg-[#00ae98] text-white font-bold py-3 rounded-lg"
                        >
                            Book Appointment
                        </Link>
                    </nav>
                </div>
            )}
        </header>
    );
}