import { ConvexHttpClient } from "convex/browser";
import { api } from "./_generated/api";

/**
 * Seed Script for Topic Cluster Architecture
 * This script populates the database with initial pillar and cluster content
 * for the auto detailing business.
 */

if (!process.env.NEXT_PUBLIC_CONVEX_URL) {
  console.error("❌ Error: NEXT_PUBLIC_CONVEX_URL environment variable is required");
  process.exit(1);
}

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

async function main() {
  console.log("🌱 Starting database seed...");

  try {
    // Define the 14 service pillar pages based on current business focus
    const pillarPages = [
      {
        slug: "auto-detailing",
        serviceName: "Auto Detailing",
        title: "Professional Auto Detailing Services San Antonio | One Detail At A Time",
        metaDescription: "Premium auto detailing services in San Antonio. From basic washes to full paint correction. IDA certified technicians serving Stone Oak, Alamo Heights, and surrounding areas.",
        content: `
          <h2>Professional Auto Detailing in San Antonio</h2>
          <p>At One Detail At A Time, we offer comprehensive auto detailing services designed to restore and protect your vehicle's appearance. Our IDA certified technicians use premium products and proven techniques to deliver exceptional results.</p>
          
          <h3>Our Detailing Services Include:</h3>
          <ul>
            <li>Exterior wash and wax</li>
            <li>Interior deep cleaning and conditioning</li>
            <li>Paint correction and protection</li>
            <li>Engine bay detailing</li>
            <li>Headlight restoration</li>
          </ul>
          
          <p>Whether you need routine maintenance or a complete transformation, we have the expertise and equipment to make your vehicle look its best.</p>
        `,
        keywords: ["auto detailing San Antonio", "car wash", "vehicle detailing", "paint protection"],
        updatedAt: Date.now(),
      },
      {
        slug: "ceramic-coating",
        serviceName: "Ceramic Coating",
        title: "Ceramic Coating San Antonio | Paint Protection & Gloss Enhancement",
        metaDescription: "Professional ceramic coating application in San Antonio. Long-lasting paint protection with incredible gloss. Protect your investment with our certified coating services.",
        content: `
          <h2>Premium Ceramic Coating Services</h2>
          <p>Our ceramic coating services provide the ultimate in paint protection and gloss enhancement. Using industry-leading ceramic coatings, we create a durable barrier that protects your vehicle from environmental damage.</p>
          
          <h3>Benefits of Ceramic Coating:</h3>
          <ul>
            <li>Superior paint protection</li>
            <li>Incredible depth and gloss</li>
            <li>Easy maintenance</li>
            <li>UV protection</li>
            <li>Chemical resistance</li>
          </ul>
          
          <p>Our certified technicians ensure proper preparation and application for maximum durability and performance.</p>
        `,
        keywords: ["ceramic coating San Antonio", "paint protection", "car coating", "vehicle protection"],
        updatedAt: Date.now(),
      },
      {
        slug: "paint-correction",
        serviceName: "Paint Correction",
        title: "Paint Correction San Antonio | Remove Scratches & Restore Gloss",
        metaDescription: "Professional paint correction services in San Antonio. Remove scratches, swirls, and oxidation to restore your vehicle's original beauty. Expert paint restoration services.",
        content: `
          <h2>Expert Paint Correction Services</h2>
          <p>Our paint correction process removes surface defects and restores your vehicle's paint to like-new condition. Using professional-grade tools and techniques, we eliminate scratches, swirl marks, and oxidation.</p>
          
          <h3>What We Correct:</h3>
          <ul>
            <li>Scratches and scuffs</li>
            <li>Swirl marks</li>
            <li>Oxidation</li>
            <li>Water spots</li>
            <li>Etching from bird droppings</li>
          </ul>
          
          <p>Each correction is tailored to your vehicle's specific needs and paint condition.</p>
        `,
        keywords: ["paint correction San Antonio", "scratch removal", "paint restoration", "auto body repair"],
        updatedAt: Date.now(),
      },
      {
        slug: "interior-detailing",
        serviceName: "Interior Detailing",
        title: "Interior Detailing San Antonio | Deep Clean & Protect Cabin",
        metaDescription: "Complete interior detailing services in San Antonio. Deep cleaning, conditioning, and protection for seats, carpets, and all interior surfaces. Refresh your cabin today.",
        content: `
          <h2>Comprehensive Interior Detailing</h2>
          <p>Our interior detailing service transforms your cabin into a pristine environment. We deep clean and condition all surfaces, leaving your interior fresh and protected.</p>
          
          <h3>Interior Services:</h3>
          <ul>
            <li>Leather cleaning and conditioning</li>
            <li>Fabric shampooing and steam cleaning</li>
            <li>Dashboard and trim restoration</li>
            <li>Carpet and mat deep cleaning</li>
            <li>Odor elimination</li>
          </ul>
          
          <p>Using premium products specifically designed for automotive interiors, we ensure lasting results.</p>
        `,
        keywords: ["interior detailing San Antonio", "car interior cleaning", "leather conditioning", "auto detailing"],
        updatedAt: Date.now(),
      },
      {
        slug: "headlight-restoration",
        serviceName: "Headlight Restoration",
        title: "Headlight Restoration San Antonio | Improve Visibility & Safety",
        metaDescription: "Professional headlight restoration services in San Antonio. Improve night visibility and vehicle safety. Remove oxidation and restore clarity to cloudy headlights.",
        content: `
          <h2>Professional Headlight Restoration</h2>
          <p>Restore your headlights to like-new condition with our professional restoration service. We remove oxidation, scratches, and cloudiness to improve visibility and safety.</p>
          
          <h3>Restoration Process:</h3>
          <ul>
            <li>Sand and polish clouded lenses</li>
            <li>Remove scratches and oxidation</li>
            <li>Apply UV protection coating</li>
            <li>Restore original clarity</li>
          </ul>
          
          <p>Clear headlights are essential for safe nighttime driving and improved vehicle aesthetics.</p>
        `,
        keywords: ["headlight restoration San Antonio", "headlight cleaning", "car safety", "automotive restoration"],
        updatedAt: Date.now(),
      },
      {
        slug: "engine-bay-detailing",
        serviceName: "Engine Bay Detailing",
        title: "Engine Bay Detailing San Antonio | Complete Engine Cleaning",
        metaDescription: "Professional engine bay detailing in San Antonio. Deep clean your engine compartment for improved aesthetics and easier maintenance. Professional engine cleaning services.",
        content: `
          <h2>Professional Engine Bay Detailing</h2>
          <p>Our engine bay detailing service thoroughly cleans and protects your engine compartment. We remove grease, dirt, and grime while protecting sensitive components.</p>
          
          <h3>Engine Bay Services:</h3>
          <ul>
            <li>Degreasing and cleaning</li>
            <li>Plastic component restoration</li>
            <li>Protective coating application</li>
            <li>Detailed cleaning of all surfaces</li>
          </ul>
          
          <p>A clean engine bay not only looks great but also makes maintenance easier and helps identify potential issues.</p>
        `,
        keywords: ["engine bay detailing San Antonio", "engine cleaning", "car maintenance", "automotive cleaning"],
        updatedAt: Date.now(),
      },
      {
        slug: "paint-protection-film",
        serviceName: "Paint Protection Film",
        title: "Paint Protection Film San Antonio | PPF Installation & Protection",
        metaDescription: "Professional paint protection film installation in San Antonio. Ultimate protection from chips, scratches, and road debris. Preserve your vehicle's finish with PPF.",
        content: `
          <h2>Professional Paint Protection Film Services</h2>
          <p>Our paint protection film services provide the ultimate defense for your vehicle's paintwork. Using industry-leading PPF materials, we create an invisible barrier that protects against chips, scratches, and environmental damage.</p>
          
          <h3>PPF Benefits:</h3>
          <ul>
            <li>Invisible protection layer</li>
            <li>Self-healing properties</li>
            <li>Long-term durability</li>
            <li>Enhanced resale value</li>
            <li>Professional installation</li>
          </ul>
          
          <p>Our certified installers ensure perfect application for maximum protection and aesthetics.</p>
        `,
        keywords: ["paint protection film San Antonio", "PPF installation", "car paint protection", "automotive film"],
        updatedAt: Date.now(),
      },
      {
        slug: "window-tinting",
        serviceName: "Window Tinting",
        title: "Window Tinting San Antonio | Professional Film Installation",
        metaDescription: "Professional window tinting services in San Antonio. Reduce heat, glare, and UV damage with premium window films. Expert installation and lifetime warranty.",
        content: `
          <h2>Expert Window Tinting Solutions</h2>
          <p>Our window tinting services enhance your vehicle's comfort, privacy, and protection. We use only the highest quality films for superior performance and longevity.</p>
          
          <h3>Tinting Benefits:</h3>
          <ul>
            <li>Heat reduction and UV protection</li>
            <li>Glare reduction for safer driving</li>
            <li>Enhanced privacy and security</li>
            <li>Interior protection from fading</li>
            <li>Professional installation</li>
          </ul>
          
          <p>Choose from various tint levels to meet your needs and local regulations.</p>
        `,
        keywords: ["window tinting San Antonio", "car window film", "automotive tinting", "UV protection"],
        updatedAt: Date.now(),
      },
      {
        slug: "wheels-tires",
        serviceName: "Wheels & Tires",
        title: "Wheels & Tires San Antonio | Professional Care & Protection",
        metaDescription: "Professional wheels and tires services in San Antonio. Cleaning, polishing, tire care, and protection services. Keep your wheels looking perfect.",
        content: `
          <h2>Complete Wheels & Tires Care</h2>
          <p>Our wheels and tires services keep your vehicle's rubber and rims in pristine condition. We provide comprehensive care for both appearance and performance.</p>
          
          <h3>Wheels & Tires Services:</h3>
          <ul>
            <li>Deep wheel cleaning and polishing</li>
            <li>Tire cleaning and conditioning</li>
            <li>Rust and corrosion protection</li>
            <li>Tire shine and protectant application</li>
            <li>Performance optimization</li>
          </ul>
          
          <p>Proper wheel and tire care extends life and maintains your vehicle's appearance and performance.</p>
        `,
        keywords: ["wheels tires San Antonio", "tire care", "wheel cleaning", "automotive wheels"],
        updatedAt: Date.now(),
      },
      {
        slug: "convertible-top-care",
        serviceName: "Convertible Top Care",
        title: "Convertible Top Care San Antonio | Soft Top Cleaning & Protection",
        metaDescription: "Professional convertible top care in San Antonio. Specialized cleaning, conditioning, and protection for soft convertible tops. Extend your top's life.",
        content: `
          <h2>Expert Convertible Top Care</h2>
          <p>Our convertible top care services ensure your soft top stays clean, conditioned, and protected. We use specialized products and techniques for fabric and vinyl convertible tops.</p>
          
          <h3>Convertible Top Services:</h3>
          <ul>
            <li>Deep cleaning and decontamination</li>
            <li>Conditioning and moisturizing</li>
            <li>UV protection application</li>
            <li>Waterproofing treatment</li>
            <li>Structural integrity inspection</li>
          </ul>
          
          <p>Regular care prevents premature aging and extends the life of your convertible top.</p>
        `,
        keywords: ["convertible top care San Antonio", "soft top cleaning", "convertible maintenance", "car top care"],
        updatedAt: Date.now(),
      },
      {
        slug: "luxury-detailing",
        serviceName: "Luxury Detailing",
        title: "Luxury Detailing San Antonio | Premium Vehicle Care Services",
        metaDescription: "Luxury detailing services in San Antonio. Premium care for high-end vehicles. White-glove service with attention to every detail for luxury automobiles.",
        content: `
          <h2>Premium Luxury Vehicle Care</h2>
          <p>Our luxury detailing service provides white-glove care for high-end vehicles. Every detail is carefully attended to with premium products and meticulous techniques.</p>
          
          <h3>Luxury Services Include:</h3>
          <ul>
            <li>Multi-stage paint correction</li>
            <li>Premium ceramic coating application</li>
            <li>Leather care and conditioning</li>
            <li>Interior restoration and protection</li>
            <li>Concierge pickup and delivery</li>
          </ul>
          
          <p>Experience the highest level of automotive care for your luxury vehicle.</p>
        `,
        keywords: ["luxury detailing San Antonio", "premium car care", "high-end detailing", "luxury vehicle service"],
        updatedAt: Date.now(),
      },
      {
        slug: "fleet-services",
        serviceName: "Fleet Services",
        title: "Fleet Services San Antonio | Commercial Vehicle Detailing",
        metaDescription: "Commercial fleet detailing services in San Antonio. Professional maintenance for business vehicles. Volume discounts and flexible scheduling for fleets.",
        content: `
          <h2>Commercial Fleet Detailing Solutions</h2>
          <p>Our fleet services provide professional detailing solutions for businesses with multiple vehicles. We offer volume pricing and flexible scheduling to meet your business needs.</p>
          
          <h3>Fleet Service Benefits:</h3>
          <ul>
            <li>Volume discount pricing</li>
            <li>Flexible scheduling options</li>
            <li>Professional image maintenance</li>
            <li>Comprehensive service packages</li>
            <li>Business account management</li>
          </ul>
          
          <p>Keep your business fleet looking professional and well-maintained.</p>
        `,
        keywords: ["fleet services San Antonio", "commercial vehicle detailing", "business fleet care", "fleet maintenance"],
        updatedAt: Date.now(),
      },
      {
        slug: "seasonal-services",
        serviceName: "Seasonal Services",
        title: "Seasonal Auto Care San Antonio | Weather Protection Services",
        metaDescription: "Seasonal auto care services in San Antonio. Protect your vehicle from weather damage with our seasonal protection packages. Summer and winter care.",
        content: `
          <h2>Seasonal Vehicle Protection</h2>
          <p>Our seasonal services protect your vehicle from weather-related damage throughout the year. We offer specialized treatments for summer heat and winter conditions.</p>
          
          <h3>Seasonal Protection:</h3>
          <ul>
            <li>Summer heat and UV protection</li>
            <li>Winter salt and corrosion protection</li>
            <li>Seasonal deep cleaning packages</li>
            <li>Weather-specific product application</li>
            <li>Preventive maintenance advice</li>
          </ul>
          
          <p>Prepare your vehicle for any season with our targeted protection services.</p>
        `,
        keywords: ["seasonal auto care San Antonio", "weather protection", "seasonal detailing", "car weather care"],
        updatedAt: Date.now(),
      },
      {
        slug: "paint-restoration",
        serviceName: "Paint Restoration",
        title: "Paint Restoration San Antonio | Complete Paint Revival",
        metaDescription: "Professional paint restoration services in San Antonio. Restore your vehicle's paint to like-new condition. Complete paint revival and protection services.",
        content: `
          <h2>Complete Paint Restoration</h2>
          <p>Our paint restoration service transforms weathered, faded paint into a vibrant, glossy finish. We use advanced techniques to restore your vehicle's original beauty.</p>
          
          <h3>Restoration Process:</h3>
          <ul>
            <li>Paint condition assessment</li>
            <li>Multi-stage compound and polish</li>
            <li>Scratch and oxidation removal</li>
            <li>Color restoration and enhancement</li>
            <li>Protective coating application</li>
          </ul>
          
          <p>Bring back the lustrous finish your vehicle deserves with our expert restoration process.</p>
        `,
        keywords: ["paint restoration San Antonio", "paint revival", "car paint repair", "automotive restoration"],
        updatedAt: Date.now(),
      },
    ];

    // Create pillar pages
    console.log("Creating pillar pages...");
    for (const pillar of pillarPages) {
      const pillarId = await convex.mutation(api.pillarPages.createPillarPage, {
        ...pillar,
        createdAt: Date.now(),
      });
      console.log(`✅ Created pillar page: ${pillar.serviceName} (${pillarId})`);
    }

    // Define cluster pages for each pillar
    const clusterPages = [
      // Auto Detailing clusters
      {
        slug: "exterior-detailing-process",
        pillarSlug: "auto-detailing",
        title: "Complete Exterior Detailing Process Guide",
        metaDescription: "Learn about our step-by-step exterior detailing process. From pre-wash to final protection, discover how we achieve perfect results.",
        content: `
          <h2>Our Exterior Detailing Process</h2>
          <p>We follow a meticulous process to ensure every vehicle receives the highest quality exterior detailing service.</p>
          
          <h3>Step 1: Pre-Wash Assessment</h3>
          <p>We begin by assessing your vehicle's condition and selecting the appropriate products and techniques.</p>
          
          <h3>Step 2: Thorough Wash</h3>
          <p>Using the two-bucket method and premium soaps, we safely remove dirt and contaminants.</p>
          
          <h3>Step 3: Clay Bar Treatment</h3>
          <p>We remove embedded contaminants that washing can't eliminate, leaving your paint smooth to the touch.</p>
          
          <h3>Step 4: Polish and Protect</h3>
          <p>We apply premium wax or sealant to protect your paint and enhance its gloss.</p>
        `,
        keywords: ["exterior detailing process", "car washing", "paint protection"],
        relatedClusterIds: [
          "interior-cleaning-techniques",
          "scratch-removal-techniques",
          "ceramic-coating-benefits",
          "coating-application-process"
        ],
      },
      {
        slug: "interior-cleaning-techniques",
        pillarSlug: "auto-detailing",
        title: "Professional Interior Cleaning Techniques",
        metaDescription: "Discover the professional techniques we use to deep clean and restore your vehicle's interior. From leather to fabric, we handle all materials.",
        content: `
          <h2>Interior Cleaning Mastery</h2>
          <p>Our interior cleaning process is designed to restore every surface in your vehicle's cabin to like-new condition.</p>
          
          <h3>Vacuum and Preparation</h3>
          <p>We start with thorough vacuuming using specialized tools to reach every corner and crevice.</p>
          
          <h3>Surface-Specific Cleaning</h3>
          <p>Each material receives specialized treatment - leather gets conditioned, fabric gets shampooed, and plastics get detailed.</p>
          
          <h3>Finishing Touches</h3>
          <p>We finish with odor elimination and protective treatments to keep your interior fresh.</p>
        `,
        keywords: ["interior cleaning", "car detailing", "leather cleaning"],
        relatedClusterIds: [],
      },

      // Ceramic Coating clusters
      {
        slug: "ceramic-coating-benefits",
        pillarSlug: "ceramic-coating",
        title: "Benefits of Ceramic Coating for Your Vehicle",
        metaDescription: "Learn about the many benefits of ceramic coating: protection, gloss, easy maintenance, and long-lasting results for your vehicle.",
        content: `
          <h2>Why Choose Ceramic Coating?</h2>
          <p>Ceramic coating offers unparalleled protection and beauty enhancement for your vehicle's paint.</p>
          
          <h3>Superior Protection</h3>
          <p>Creates a hard, protective layer that resists scratches, chemical etching, and UV damage.</p>
          
          <h3>Incredible Gloss</h3>
          <p>Enhances your paint's depth and shine, giving your vehicle a showroom appearance.</p>
          
          <h3>Easy Maintenance</h3>
          <p>Makes washing easier and reduces the frequency needed, saving you time and effort.</p>
        `,
        keywords: ["ceramic coating benefits", "paint protection", "car coating"],
        relatedClusterIds: [],
      },
      {
        slug: "coating-application-process",
        pillarSlug: "ceramic-coating",
        title: "Ceramic Coating Application Process",
        metaDescription: "See how our professional ceramic coating application process works. From preparation to curing, we ensure perfect results every time.",
        content: `
          <h2>Professional Coating Application</h2>
          <p>Our ceramic coating process requires careful preparation and expert application for optimal results.</p>
          
          <h3>Paint Preparation</h3>
          <p>We start with thorough washing, decontamination, and paint correction if needed.</p>
          
          <h3>Application Process</h3>
          <p>Using specialized techniques, we apply the coating in a controlled environment.</p>
          
          <h3>Curing and Protection</h3>
          <p>The coating cures to form a hard, protective layer that will protect your paint for years.</p>
        `,
        keywords: ["ceramic coating process", "paint protection", "coating application"],
        relatedClusterIds: [],
      },

      // Paint Correction clusters
      {
        slug: "scratch-removal-techniques",
        pillarSlug: "paint-correction",
        title: "Professional Scratch Removal Techniques",
        metaDescription: "Learn about the professional techniques we use to remove scratches from your vehicle's paint. Restore your car's appearance.",
        content: `
          <h2>Expert Scratch Removal</h2>
          <p>Our paint correction specialists use proven techniques to safely remove scratches and restore your paint's finish.</p>
          
          <h3>Scratch Assessment</h3>
          <p>We evaluate each scratch to determine the best removal method and products to use.</p>
          
          <h3>Precision Correction</h3>
          <p>Using professional machine polishing, we carefully remove scratches without damaging surrounding paint.</p>
          
          <h3>Protection Application</h3>
          <p>After correction, we apply protection to prevent future scratches and maintain the finish.</p>
        `,
        keywords: ["scratch removal", "paint correction", "auto body repair"],
        relatedClusterIds: [],
      },

      // Interior Detailing clusters
      {
        slug: "leather-fabric-care",
        pillarSlug: "interior-detailing",
        title: "Professional Leather and Fabric Care",
        metaDescription: "Learn how we professionally clean and condition leather seats and fabric upholstery to keep your interior looking pristine.",
        content: `
          <h2>Expert Leather and Fabric Care</h2>
          <p>Proper care of your interior surfaces ensures longevity and maintains the luxury feel of your vehicle.</p>
          
          <h3>Leather Treatment</h3>
          <p>We deep clean leather surfaces and apply premium conditioners to prevent cracking and fading.</p>
          
          <h3>Fabric Restoration</h3>
          <p>Our hot water extraction method removes deep-seated dirt and stains from fabric seats and carpets.</p>
          
          <h3>Protection and Maintenance</h3>
          <p>We apply protective treatments to make future cleaning easier and extend the life of your interior.</p>
        `,
        keywords: ["leather cleaning", "fabric care", "interior detailing", "seat conditioning"],
        relatedClusterIds: [],
      },
      {
        slug: "odor-elimination-process",
        pillarSlug: "interior-detailing",
        title: "Professional Odor Elimination Process",
        metaDescription: "Discover our systematic approach to eliminating stubborn odors from your vehicle's interior for a fresh, clean cabin.",
        content: `
          <h2>Complete Odor Elimination</h2>
          <p>We identify and eliminate the source of odors rather than just masking them with fragrances.</p>
          
          <h3>Odor Source Identification</h3>
          <p>We locate and treat the root cause of odors, whether it's from spills, pets, or environmental factors.</p>
          
          <h3>Deep Cleaning Treatment</h3>
          <p>Our deep cleaning process penetrates materials to remove odor-causing bacteria and residues.</p>
          
          <h3>Preventive Protection</h3>
          <p>We apply protective treatments to help prevent future odor issues and maintain a fresh interior.</p>
        `,
        keywords: ["odor elimination", "interior cleaning", "car freshness", "smell removal"],
        relatedClusterIds: [],
      },

      // Headlight Restoration clusters
      {
        slug: "headlight-clarity-restoration",
        pillarSlug: "headlight-restoration",
        title: "Professional Headlight Clarity Restoration",
        metaDescription: "Learn how we restore your headlights to crystal-clear condition, improving both safety and vehicle appearance.",
        content: `
          <h2>Restoring Headlight Clarity</h2>
          <p>Cloudy headlights aren't just unsightly - they reduce your night visibility and safety.</p>
          
          <h3>Oxidation Removal</h3>
          <p>We carefully remove the oxidation and scratches that cause the cloudy appearance.</p>
          
          <h3>Precision Sanding</h3>
          <p>Our multi-stage sanding process progressively refines the lens surface to original clarity.</p>
          
          <h3>Protective Coating</h3>
          <p>We apply UV-resistant coatings to protect your restored headlights from future damage.</p>
        `,
        keywords: ["headlight restoration", "lens clarity", "headlight cleaning", "automotive safety"],
        relatedClusterIds: [],
      },
      {
        slug: "headlight-safety-benefits",
        pillarSlug: "headlight-restoration",
        title: "Safety Benefits of Headlight Restoration",
        metaDescription: "Discover how restored headlights improve night visibility, safety, and your vehicle's overall appearance and value.",
        content: `
          <h2>Safety Through Clear Vision</h2>
          <p>Restored headlights are a critical safety investment that improves visibility and protects you and your family.</p>
          
          <h3>Improved Night Visibility</h3>
          <p>Clear headlights dramatically improve your ability to see obstacles, road signs, and hazards at night.</p>
          
          <h3>Enhanced Safety for Others</h3>
          <p>Brighter headlights help other drivers see you more clearly, reducing accident risk.</p>
          
          <h3>Vehicle Value Protection</h3>
          <p>Clear headlights maintain your vehicle's appearance and can improve resale value.</p>
        `,
        keywords: ["headlight safety", "night driving", "vehicle safety", "headlight benefits"],
        relatedClusterIds: [],
      },

      // Engine Bay Detailing clusters
      {
        slug: "engine-cleaning-techniques",
        pillarSlug: "engine-bay-detailing",
        title: "Professional Engine Cleaning Techniques",
        metaDescription: "See how we safely and effectively clean your engine bay using specialized techniques and environmentally safe products.",
        content: `
          <h2>Safe Engine Cleaning Methods</h2>
          <p>Our engine cleaning process removes built-up grime and grease while protecting sensitive electrical components.</p>
          
          <h3>Pre-Cleaning Preparation</h3>
          <p>We carefully protect electrical connections and cover sensitive areas before cleaning begins.</p>
          
          <h3>Degreasing Process</h3>
          <p>Using specialized degreasers, we break down and remove years of built-up grease and dirt.</p>
          
          <h3>Detailed Cleaning</h3>
          <p>Every component receives individual attention to ensure a thorough clean without damage.</p>
        `,
        keywords: ["engine cleaning", "engine bay detailing", "automotive cleaning", "engine maintenance"],
        relatedClusterIds: [],
      },
      {
        slug: "engine-bay-maintenance-benefits",
        pillarSlug: "engine-bay-detailing",
        title: "Benefits of Regular Engine Bay Maintenance",
        metaDescription: "Learn how regular engine bay cleaning and maintenance can improve performance, identify issues early, and maintain value.",
        content: `
          <h2>Engine Bay Maintenance Benefits</h2>
          <p>Regular engine bay cleaning isn't just about appearance - it's about maintenance, performance, and early problem detection.</p>
          
          <h3>Easier Maintenance</h3>
          <p>A clean engine bay makes routine maintenance tasks easier and helps identify issues before they become major problems.</p>
          
          <h3>Early Problem Detection</h3>
          <p>Regular cleaning allows you to spot leaks, worn hoses, and other issues before they cause expensive damage.</p>
          
          <h3>Improved Performance</h3>
          <p>A clean engine runs cooler and more efficiently, potentially improving performance and fuel economy.</p>
        `,
        keywords: ["engine maintenance", "car care", "automotive maintenance", "engine protection"],
        relatedClusterIds: [],
      },
    ];

    // TODO: Consider adding more cluster pages in the future for additional SEO opportunities
    // such as seasonal services, specific vehicle types, or advanced techniques.
    // All current pillars now have at least 2 cluster pages for comprehensive topic coverage.

    // Create cluster pages without relationships first
    console.log("Creating cluster pages...");
    const createdClusterIds: Record<string, string> = {};
    for (const cluster of clusterPages) {
      const { relatedClusterIds, ...clusterData } = cluster;
      const clusterId = await convex.mutation(api.clusterPages.createClusterPage, clusterData);
      createdClusterIds[cluster.slug] = clusterId;
      console.log(`✅ Created cluster page: ${cluster.title} (${clusterId})`);
    }

    // Now update cluster relationships
    console.log("Updating cluster relationships...");
    for (const cluster of clusterPages) {
      if (cluster.relatedClusterIds && cluster.relatedClusterIds.length > 0) {
        // Map slugs to actual IDs
        const relatedIds = cluster.relatedClusterIds
          .map(slug => createdClusterIds[slug])
          .filter(id => id) as any; // Type assertion for Convex IDs

        if (relatedIds.length > 0) {
          await convex.mutation(api.clusterPages.updateClusterRelationships, {
            clusterSlug: cluster.slug,
            relatedClusterIds: relatedIds,
          });
          console.log(`✅ Updated relationships for: ${cluster.title}`);
        }
      }
    }

    // Add some sample reviews
    console.log("Adding sample reviews...");
    const sampleReviews = [
      {
        serviceSlug: "auto-detailing",
        customerName: "Mike Rodriguez",
        rating: 5,
        comment: "Absolutely fantastic service! My car looks better than when I first bought it. The team at One Detail At A Time is professional and thorough.",
        isVerified: true,
      },
      {
        serviceSlug: "ceramic-coating",
        customerName: "Sarah Johnson",
        rating: 5,
        comment: "The ceramic coating looks incredible and has made maintenance so much easier. Worth every penny!",
        isVerified: true,
      },
      {
        serviceSlug: "paint-correction",
        customerName: "David Chen",
        rating: 5,
        comment: "They removed years of scratches and swirl marks. My car looks brand new again. Highly recommended!",
        isVerified: true,
      },
    ];

    for (const review of sampleReviews) {
      const reviewId = await convex.mutation(api.reviews.createReview, review);
      console.log(`✅ Added review from: ${review.customerName} (${reviewId})`);
    }

    console.log("🎉 Database seeding completed successfully!");
  } catch (error) {
    console.error("❌ Error during seeding:", error);
    process.exit(1);
  }
}

main();