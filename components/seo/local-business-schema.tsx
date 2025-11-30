// file: components/seo/local-business-schema.tsx
import { BUSINESS_NAP } from "@/lib/constants";

/**
 * Injects a JSON-LD LocalBusiness schema into the page using values from BUSINESS_NAP.
 *
 * @returns A React <script> element of type "application/ld+json" whose content is the serialized LocalBusiness JSON-LD schema
 */
export function LocalBusinessSchema() {
    const schema = {
        "@context": "https://schema.org",
        "@type": "AutoRepair", // Or "AutoDetailing" if supported, AutoRepair is standard fallback
        name: BUSINESS_NAP.name,
        image: BUSINESS_NAP.image,
        "@id": BUSINESS_NAP.url,
        url: BUSINESS_NAP.url,
        telephone: BUSINESS_NAP.phone,
        priceRange: BUSINESS_NAP.priceRange,
        address: {
            "@type": "PostalAddress",
            streetAddress: BUSINESS_NAP.streetAddress,
            addressLocality: BUSINESS_NAP.addressLocality,
            addressRegion: BUSINESS_NAP.addressRegion,
            postalCode: BUSINESS_NAP.postalCode,
            addressCountry: BUSINESS_NAP.addressCountry,
        },
        geo: {
            "@type": "GeoCoordinates",
            latitude: BUSINESS_NAP.coordinates.latitude,
            longitude: BUSINESS_NAP.coordinates.longitude,
        },
        areaServed: BUSINESS_NAP.serviceArea.map((area: any) => ({
            "@type": "Place",
            name: area,
        })),
        openingHoursSpecification: BUSINESS_NAP.openingHours.map((hours) => ({
            "@type": "OpeningHoursSpecification",
            dayOfWeek: hours.dayOfWeek,
            opens: hours.opens,
            closes: hours.closes,
        })),
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}