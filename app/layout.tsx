import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { UserSync } from "@/components/auth/user-sync"; // Keeps your sync logic alive
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import ConvexClientProvider from "@/components/ConvexClientProvider";
import { Footer } from "@/components/layout/footer";
import { BUSINESS_NAP } from "@/lib/constants";
import { Header } from "@/components/layout/header";
import { defineTable } from "convex/schema";


const inter = Inter({ subsets: ["latin"] });

// GLOBAL SEO METADATA
// Sets the defaults for any page that doesn't override them.
export const metadata: Metadata = {
  title: {
    template: "%s | One Detail At A Time San Antonio", // e.g. "Auto Detailing | One Detail At A Time..."
    default: "One Detail At A Time | Premier Auto Detailing San Antonio",
  },
  description: "Professional auto detailing, ceramic coating, and paint correction in San Antonio, Stone Oak, and Alamo Heights. IDA Certified.",
  // Important for social sharing to resolve relative image paths correctly
  metadataBase: new URL("https://odaat1.com"),
};

// JSON-LD STRUCTURED DATA
// This script is invisible to users but read by Google to understand business details.
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "AutoRepair", // Specific schema type for detailing/repair shops
  "name": "One Detail At A Time LLC",
  "image": "https://odaat1.com/logo.png",
  "telephone": "(726) 207-1007",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "11692 Bricken Circle",
    "addressLocality": "San Antonio",
    "addressRegion": "TX",
    "postalCode": "78233",
    "addressCountry": "US"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 29.6199,
    "longitude": -98.4738
  },
  // Explicitly lists service areas to help rank for "Detailing near Stone Oak"
  "areaServed": ["San Antonio", "Stone Oak", "Alamo Heights", "Dominion"],
  "priceRange": "$"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-slate-950 text-slate-200 antialiased`}>
        {/* Inject JSON-LD into the head of the document */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {/* 1. Clerk Provider (Auth Context) */}
        <ClerkProvider
          publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
          appearance={{ baseTheme: dark }}
        >
          {/* 2. Convex Provider (Data Context) - Needs Clerk Context to exist first */}
          <ConvexClientProvider>

            {/* Sync Clerk Claims to Convex DB */}
            <UserSync />
            <div className="min-h-screen flex flex-col">
              <Header />
              <main className="flex-grow">
                {/* Wrap app in Convex Provider for data access */}
                <ConvexClientProvider>
                  {children}
                </ConvexClientProvider>
              </main>
              <Footer />
            </div>
          </ConvexClientProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
