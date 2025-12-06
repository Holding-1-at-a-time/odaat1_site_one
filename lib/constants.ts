// file: lib/constants.ts

export const BUSINESS_NAP = {
    name: "One Detail At A Time LLC",
    streetAddress: "11692 Bricken Circle",
    addressLocality: "San Antonio",
    addressRegion: "TX",
    postalCode: "78233",
    addressCountry: "US",
    phone: "(726) 207-1007",
    email: "rromerojr1@gmail.com",
    url: "https://odaat1.com",
    image: "https://odaat1.com/logo.png", // Ensure this asset exists
    priceRange: "$$",
    coordinates: {
        latitude: 29.6199,
        longitude: -98.4738,
    },
    openingHours: [
        {
            dayOfWeek: ["Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
            opens: "07:00",
            closes: "22:00",
        },
        {
            dayOfWeek: "Monday",
            opens: null,
            closes: null,
        },
    ],
    serviceAreas: [
        "San Antonio",
        "Stone Oak",
        "Alamo Heights",
        "North Side",
        "Medical Center",
        "Northwest Side",
        "Northeast Side",
        "Downtown",
    ],
    socialMedia: {
        facebook: "https://www.facebook.com/odaat1",
        instagram: "https://www.instagram.com/odaat1",
        twitter: "https://twitter.com/odaat1",
    },
    Services: {

        // --- Core Auto Detailing Services ---

        "Car detailing service": {
            "Primary category": "Auto detailing",
            "Title": "IDA Certified Auto Detailing in San Antonio, TX | One Detail At A Time - Premium Auto Detailing & Ceramic Coating Prep",
            "Description": "Experience the gold standard in vehicle maintenance with our premium auto detailing services for San Antonio residents. Our comprehensive offering encompasses a full, meticulous spectrum of interior and exterior care, going far beyond a standard car wash. We provide expert car detailing, superior paint protection solutions (including prep for ceramic coatings), and intensive interior deep cleanse and sanitization services. Our business is fully licensed, insured, and operated exclusively by certified professionals (IDA Certified) committed to absolute excellence and unmatched customer satisfaction. We serve the entire San Antonio metro area, ensuring your vehicle receives the highest level of care.",
            "Keywords": ["auto detailing", "premium car care", "paint protection", "interior deep cleanse", "IDA certified", "San Antonio detailing", "full service auto detail", "ceramic coating preparation"]
        },


        // --- Interior Detailing Specialties ---

        "Auto interior vacuuming": {
            "Title": "IDA Certified Auto Interior Vacuuming San Antonio, TX | One Detail At A Time - Professional Deep-Clean Car Vacuuming & Pet Hair Removal",
            "Description": "Professional, industrial-grade, and exceptionally thorough car vacuuming services tailored for all San Antonio vehicles, including heavy-duty work trucks and family SUVs. Our service includes expert, multi-stage carpet cleaning, meticulous upholstery vacuuming using specialized tools to reach every crevice, and complete removal of all visible and embedded debris, dirt, and pet hair from all hard-to-reach areas. We proudly serve specific neighborhoods like Stone Oak, Alamo Heights, the North Side, and all surrounding SA areas. Contact us today for a free, no-obligation quote and discover the difference a professional vacuum makes!",
            "Service Areas": ["Stone Oak", "Alamo Heights", "North Side", "All SA areas", "Boerne", "Helotes"],
            "Keywords": ["car vacuuming", "interior cleaning", "upholstery vacuuming", "carpet cleaning", "debris removal", "pet hair removal", "mobile detailing", "IDA certified", "deep interior vacuum"]
        },

        "Seat shampooing": {
            "Title": "IDA Certified Seat Shampooing & Interior Detailing San Antonio, TX | One Detail At A Time - Professional Deep Upholstery Extraction & Stain Removal",
            "Description": "Dedicated, professional hot water extraction and upholstery cleaning services specifically for San Antonio vehicles' seating, headliners, and floor mats. We specialize in expert, targeted stain removal (coffee, oil, ink, etc.), deep fiber cleaning to remove odors and bacteria, and the optional application of premium fabric protection treatments (Scotchgard-style) to restore and safeguard your vehicle's interior against future spills. We guarantee a refreshed, sanitized, and like-new feel, restoring your vehicle’s comfort and appearance.",
            "Keywords": ["seat shampooing", "upholstery cleaning", "stain removal", "interior deep cleaning", "fabric protection", "IDA certified", "hot water extraction", "odor removal from seats"]
        },

        "Interior scenting": {
            "Title": "IDA Certified Interior Scenting & Auto Detailing San Antonio, TX | One Detail At A Time - Professional Car Odor Elimination & Customized Air Freshening",
            "Description": "Professional car interior freshening and full-scale odor remediation services designed to permanently eliminate deep-seated odors (smoke, pet, mildew) and create a pleasant, customized driving environment. Our comprehensive process includes expert odor source identification, advanced ozone or enzyme odor elimination techniques, and the application of long-lasting, customizable, and non-overpowering interior scents. Serving Stone Oak, Alamo Heights, the North Side, and all SA areas. Request your free consultation and quote for a fresh start now!",
            "Keywords": ["interior scenting", "odor elimination", "air freshening", "car freshening", "IDA certified", "smoke odor removal", "ozone treatment", "custom car scent"]
        },

        "Steam cleaning": {
            "Title": "IDA Certified Steam Cleaning & Auto Detailing San Antonio, TX | One Detail At A Time - Professional Deep Sanitization & Germ Elimination",
            "Description": "Cutting-edge professional steam cleaning services for all San Antonio vehicle interiors and exteriors, offering the ultimate in sanitization, disinfection, and deep cleaning. We utilize powerful, high-temperature, chemical-free detailing methods to safely disinfect all hard and soft surfaces, break down stubborn grime, remove caked-on contaminants, and eliminate 99.9% of germs and bacteria. Serving Stone Oak, Alamo Heights, the North Side, and all SA areas. Contact us for a free quote on a truly sanitized vehicle.",
            "Keywords": ["steam cleaning", "sanitization", "deep cleaning", "chemical-free detailing", "interior disinfection", "IDA certified", "germ removal", "high-temperature cleaning"]
        },


        // --- Exterior Protection and Restoration ---

        "Car waxing": {
            "Title": "IDA Certified Car Waxing & Auto Detailing San Antonio, TX | One Detail At A Time - Professional Mobile Hand Wax & Sealant Application",
            "Description": "Premium professional mobile waxing and paint sealant services brought directly to your home or office location in San Antonio. We provide expert hand wax application using high-quality Carnauba and synthetic waxes for deep gloss, superior paint protection against UV and environmental fallout, and brilliant high-gloss shine restoration for your vehicle's finish. Serving Stone Oak, Alamo Heights, the North Side, and all SA areas. We are fully licensed and insured for your peace of mind. Get a free, instant quote today!",
            "Service Type": "Mobile Service",
            "Keywords": ["car waxing", "hand wax", "mobile detailing", "paint protection", "shine restoration", "IDA certified", "paint sealant", "carnauba wax"]
        },

        "Clay bar treatment": {
            "Title": "IDA Certified Clay Bar Treatment & Paint Prep San Antonio, TX | One Detail At A Time - Professional Bonded Contaminant Removal & Smooth Finish",
            "Description": "An absolutely essential paint preparation step before any waxing, sealing, or ceramic coating, our professional clay bar treatment meticulously removes bonded surface contaminants (industrial fallout, rail dust, tar, tree sap mist) that washing alone cannot dissolve. This crucial service ensures a perfectly smooth, glassy surface, maximizing the effectiveness of protective coatings, restoring paint clarity, and significantly enhancing reflective shine. Serving all of San Antonio and surrounding counties.",
            "Keywords": ["clay bar treatment", "paint prep", "contaminant removal", "paint restoration", "smooth finish", "IDA certified", "decontamination wash", "tar removal"]
        },

        "Full body wash": {
            "Title": "IDA Certified Full Body Wash & Auto Detailing San Antonio, TX | One Detail At A Time - Professional Two-Bucket Exterior Car Washing & Scratch Prevention",
            "Description": "Professional exterior car washing services for all San Antonio vehicles, utilizing the meticulous Two-Bucket Method to prevent wash-induced scratches and swirl marks. Our process includes a thorough, expert hand wash with pH-neutral soap, a luxurious thick foam bath pre-soak for safe dirt loosening, and a deionized, spot-free rinse and forced-air drying finish. Serving Stone Oak, Alamo Heights, the North Side, and all SA areas with convenient mobile service. Request your free quote today for a superior clean!",
            "Service Type": "Mobile Service",
            "Keywords": ["full body wash", "hand wash", "foam bath", "spot-free rinse", "exterior cleaning", "mobile detailing", "IDA certified", "two-bucket wash", "scratch-free car wash"]
        },

        "Wheel washing": {
            "Title": "IDA Certified Wheel Cleaning & Detailing San Antonio, TX | One Detail At A Time - Professional Rim Polishing, Brake Dust Decontamination & Tire Dressing",
            "Description": "Specialized professional wheel washing, tire, and undercarriage detailing services for San Antonio vehicles. We utilize non-acidic, iron-removing chemicals to target and expertly dissolve stubborn brake dust and road grime, polish rims (chrome, alloy, painted) to a brilliant shine, and apply a premium, non-sling, long-lasting tire shine dressing. Serving Stone Oak, Alamo Heights, the North Side, and all SA areas. Get a free quote today for dazzling wheels and tires!",
            "Keywords": ["wheel washing", "rim polishing", "brake dust removal", "tire shine", "wheel detailing", "IDA certified", "tire dressing", "iron decontamination"]
        },

        "Exhaust tip polishing": {
            "Title": "Professional Exhaust Tip Polishing & Metal Restoration Service",
            "Description": "A critical and highly visible finishing touch service that restores the chrome, stainless steel, or black metal on your vehicle's exhaust tips to a high-gloss, mirror-like finish. This service involves specialized polishing compounds and techniques to safely remove heavy soot, carbon buildup, and oxidation, significantly enhancing the vehicle's rear-end appearance and completing the detail.",
            "Keywords": ["exhaust tip polishing", "chrome polishing", "metal restoration", "stainless steel polishing", "carbon removal"]
        },

        "Headlight polishing": {
            "Title": "IDA Certified Headlight Restoration San Antonio, TX | One Detail At A Time - Professional Headlight Polishing & UV Sealing",
            "Description": "Professional, multi-stage headlight polishing and restoration services for San Antonio vehicles. We perform expert oxidation and UV damage removal, utilize fine-grit sanding for deep defect correction, and apply a durable, long-lasting UV protection sealant. This process restores crystal-clear clarity to yellowed, hazy, or cloudy lenses, significantly improving night-time visibility, safety, and the vehicle's overall aesthetics. Serving Stone Oak, Alamo Heights, the North Side, and all SA areas. Contact us for free quotes and a safety check.",
            "Keywords": ["headlight polishing", "headlight restoration", "oxidation removal", "UV protection", "clarity restoration", "IDA certified", "night-time visibility improvement", "lens defogging"]
        },

        "Engine detailing": {
            "Title": "IDA Certified Engine Detailing San Antonio, TX | One Detail At A Time - Professional Engine Bay Cleaning, Degreasing & Dressing",
            "Description": "Professional, safe, and meticulous engine bay cleaning and detailing for all San Antonio vehicles. Our detailed process involves expert low-pressure degreasing and specialized steam cleaning to safely remove oil, dirt, and road grime, followed by a careful drying process and the application of protective, non-greasy dressings to all hoses, plastic components, and belts. This service enhances the vehicle's value, makes maintenance easier, and prevents premature component degradation. Serving Stone Oak, Alamo Heights, the North Side, and all SA areas. Convenient mobile service is available. Get free, competitive quotes now!",
            "Service Type": "Mobile Service Available",
            "Keywords": ["engine detailing", "engine bay cleaning", "degreasing", "steam cleaning", "protection dressing", "IDA certified", "safe engine wash", "under hood cleaning"]
        },


        // --- Paint Correction & Repair ---

        "Paint repair": {
            "Title": "IDA Certified Paint Correction & Repair San Antonio, TX | One Detail At A Time - Professional Full Paint Restoration & Defect Removal",
            "Description": "Comprehensive professional paint repair and restoration services tailored for San Antonio vehicles exposed to harsh sun and road conditions. We specialize in expert scratch removal, precision touch-up chip repair, and full-panel paint restoration through compounding and polishing to eliminate imperfections, oxidation, and restore a deep, flawless, mirror-like finish. Serving Stone Oak, Alamo Heights, the North Side, and all SA areas. Free, detailed consultation quotes are available today!",
            "Keywords": ["paint repair", "scratch removal", "chip repair", "paint restoration", "paint correction", "IDA certified", "swirl mark removal", "buffing"]
        },

        "Polishing": {
            "Additional category": "Paint Correction",
            "Description": "The fundamental process within paint correction, involving the use of fine abrasive polishes and dual-action or rotary machines to remove shallow imperfections such as light swirl marks, holograms, fine spiderweb scratches, and mild oxidation from the clear coat. This refines the paint surface, maximizing gloss and clarity, and is a prerequisite step for the application of any high-quality protective coating.",
            "Keywords": ["paint polishing", "swirl removal", "paint refinement", "gloss enhancement", "clear coat polishing", "machine polishing"]
        },

        "Scratch removal": {
            "Additional category": "Paint Correction",
            "Description": "A specialized, multi-stage service focused on safely and permanently eliminating surface-level and moderate-depth scratches from the vehicle's clear coat. This process often involves isolated wet sanding, aggressive compounding, and followed by fine polishing techniques to restore a perfectly smooth, invisible repair and maintain the paint's original thickness as much as possible.",
            "Keywords": ["scratch repair", "clear coat repair", "paint blemish removal", "deep scratch treatment", "compounding for scratches"]
        },

        "Wet Sanding": {
            "Additional category": "Advanced Paint Correction",
            "Description": "An advanced, highly specialized, and aggressive technique used by master detailers to remove severe paint defects such as deep scratches that haven't reached the base coat, heavy oxidation, paint runs, or to level the 'orange peel' texture from the clear coat for a flatter, higher-gloss finish. This invasive process requires precision and is always followed by compounding and multi-stage polishing for a mirror-like, high-gloss result.",
            "Keywords": ["wet sanding", "sanding", "orange peel removal", "deep scratch removal", "leveling paint defects", "color sanding"]
        },

        "Cut and Buff": {
            "Additional category": "Advanced Paint Correction",
            "Description": "A professional, intensive, multi-step paint correction process used to restore heavily oxidized or severely scratched paint finishes. It involves an aggressive compounding ('cutting') phase with heavy abrasives to remove deep defects (scratches, etching), followed by a lighter, multi-stage polishing ('buffing') phase to remove compounding marks and restore ultimate gloss, depth, and clarity to the paint.",
            "Keywords": ["cut and buff", "compounding", "heavy defect removal", "paint restoration after bodywork", "two-step correction"]
        },

        "Ceramic Coating Application": {
            "Additional category": "Premium Protection",
            "Title": "Professional IDA Certified Ceramic Coating Application San Antonio, TX | One Detail At A Time - Long-Term Paint Protection",
            "Description": "The pinnacle of paint protection: professional, certified application of high-durability, professional-grade ceramic (SiO2/SiC) coatings. These coatings provide a semi-permanent, extremely hard layer of protection against environmental contaminants, UV damage, acid etching (bird droppings/sap), and road salts. They offer unparalleled, maintenance-friendly gloss, extreme hydrophobic properties (water beading), and chemical resistance, lasting for multiple years. Proper paint correction is included prior to application for a flawless base.",
            "Keywords": ["ceramic coating", "paint protection film", "hydrophobic coating", "nanoceramic", "SiO2 coating", "paint longevity", "long-term protection"]
        },


        // --- Related Automotive Services ---

        "Car wash": {
            "Additional category": "Auto detailing",
            "Description": "A general term for washing the exterior of a vehicle. Our service elevates this to a professional, scratch-free level. We utilize gentle microfiber wash mitts and the two-bucket method, ensuring a high-quality, safe clean as a clean foundation for further detailing or as a premium maintenance wash.",
            "Keywords": ["car wash", "exterior wash", "premium car wash", "maintenance wash"]
        },

        "Vacuuming": {
            "Additional category": "Auto detailing",
            "Description": "The fundamental and necessary process of comprehensively removing loose dirt, dust, sand, and debris from the interior carpets, trunk space, floor mats, and seats of a vehicle using high-powered extractors and specialized brushes to agitate and lift embedded particulate matter.",
            "Keywords": ["interior vacuum", "dust removal", "dirt extraction", "basic vacuuming"]
        },

        "Delivery": {
            "Additional category": "Logistics",
            "Description": "A premium, value-added logistics service offering the secure pickup and/or drop-off of the vehicle to and from the customer's specified home or business location. This complements our mobile detailing and shop services, maximizing customer convenience and minimizing disruption to their day.",
            "Keywords": ["vehicle delivery", "car transport", "customer convenience", "valet detailing service", "vehicle pickup"]
        },


        // --- Auto Paint & Restoration Services (Non-Detailing) ---

        "Auto painting": {
            "Additional category": "Auto body & painting",
            "Description": "Comprehensive, professional auto painting services ranging from full vehicle repaints to panel-specific color matching and the precise application of base coat, clear coat, and protective layers in a controlled environment to match OEM standards.",
            "Keywords": ["auto painting", "car repaint", "color matching", "clear coat application", "full body paint"]
        },

        "Rock chip repair": {
            "Additional category": "Auto body & painting",
            "Description": "A precision service for filling and sealing small, isolated chips in the paint caused by road debris or stones. This localized repair prevents rust and corrosion from setting in, restoring the paint's cosmetic integrity and protection barrier without repainting the entire panel.",
            "Keywords": ["rock chip repair", "paint chip filling", "touch up repair", "road debris damage"]
        },

        "Paint Transfer Removal": {
            "Additional category": "Auto body & painting",
            "Description": "Specialized service to safely remove foreign paint residue or scuff marks transferred onto the vehicle's surface during minor contact (e.g., parking garage pillar, minor fender tap) with another object. Techniques involve compounding and light solvent use to dissolve the transfer without damaging the original factory paint.",
            "Keywords": ["paint transfer removal", "scuff removal", "minor collision repair", "compound for transfer"]
        },

        "Touch Up Paint": {
            "Additional category": "Auto body & painting",
            "Description": "Detailed, localized application of manufacturer-matching factory paint to small scratches, nicks, and chips. This cost-effective service offers a discreet, protective repair to seal the exposed metal and prevent oxidation, improving the vehicle's overall appearance.",
            "Keywords": ["touch up paint", "scratch filling", "paint pen application", "minor paint blemishes"]
        },

        "Auto restoration service": {
            "Additional category": "Auto restoration service",
            "Description": "Full-scale, bumper-to-bumper restoration services for classic, vintage, or severely damaged vehicles. This can include bodywork, mechanical overhaul, interior re-upholstery, and full custom paint jobs, bringing the vehicle back to its original factory condition or a customized specification.",
            "Keywords": ["auto restoration", "classic car restoration", "vintage car repair", "full vehicle rebuild"]
        },


        // --- Dent & Body Repair Services ---

        "Auto dent removal service": {
            "Additional category": "Auto dent removal service",
            "Description": "General body shop services for removing various types of dents, creases, and dings from a vehicle's body panels. We focus on non-invasive Paintless Dent Repair (PDR) techniques where possible, but also offer traditional body repair and panel replacement when damage is severe.",
            "Keywords": ["dent removal", "body repair", "car bodywork", "crease removal"]
        },

        "Dent Removal Services": {
            "Additional category": "Auto dent removal service",
            "Description": "Comprehensive services utilizing specialized Paintless Dent Repair (PDR) techniques. This method carefully massages or pulls out small to medium-sized, non-creased dents from behind the panel without disturbing the factory paint finish, providing a faster and more affordable repair solution.",
            "Keywords": ["PDR", "paintless dent removal", "ding repair", "door ding removal", "non-invasive dent repair"]
        },

        "Hail Damage Repairs": {
            "Additional category": "Auto dent removal service",
            "Description": "Specialized, high-volume repair service for vehicles that have sustained damage from severe hailstorms. This process often utilizes extensive PDR methods on multiple panels (hood, roof, trunk) to meticulously restore the vehicle's body panels and factory finish.",
            "Keywords": ["hail damage repair", "storm damage", "PDR for hail", "paintless hail repair", "roof dent repair"]
        },

        "Ding Repairs": {
            "Additional category": "Auto dent removal service",
            "Description": "Focused, minor dent repair service concentrating on small, shallow, sharp imperfections and door dings commonly caused by stray shopping carts, door taps in parking lots, or small objects. These repairs are typically handled quickly and effectively with Paintless Dent Repair.",
            "Keywords": ["ding repair", "minor dent removal", "parking lot ding repair", "small dent fix"]
        }

    }
};