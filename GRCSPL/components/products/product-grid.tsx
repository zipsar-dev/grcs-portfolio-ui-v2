"use client";
import React, { useState } from "react";
import { Search, Grid, List } from "lucide-react";

interface ProductDetails {
  name: string;
  category: string;
  code: string;
  mrp: number;
  discountPrice: number;
  businessValue: number;
  description: string;
  benefit: string;
  usageTips: string;
}
const products = [
  {
    HN1001: {
      name: "Fabricare Liquid Detergent 500ml",
      category: "HOME CARE",
      src: "/product/home/1.png",
      code: "HN1001",
      mrp: 215.0,
      discountPrice: 195.0,
      businessValue: 47,
      description:
        "An advanced liquid detergent that effectively removes stains while being gentle on fabrics, leaving clothes fresh and clean.",
      benefit:
        "Deep cleanses clothes, retains fabric softness, and imparts a long-lasting fragrance. Suitable for both machine and hand washing, ensuring convenience and efficiency.",
      usageTips:
        "Use as directed on the label for best results. For tough stains, pre-soak clothes in a diluted solution before washing.",
    },
    HN1002: {
      name: "GR Sanitone Toilet Cleaner 500ml",
      src: "/product/home/2.png",
      category: "HOME CARE",
      code: "HN1002",
      mrp: 155.0,
      discountPrice: 145.0,
      businessValue: 35,
      description:
        "A powerful toilet cleaner formulated to remove tough stains, kill germs, and leave toilets sparkling clean.",
      benefit:
        "Effectively removes limescale and tough stains, eliminates odor-causing bacteria, and ensures hygienic freshness after every use.",
      usageTips:
        "Apply around the bowl and under the rim, leave for 10 minutes, then scrub and flush for a spotless finish.",
    },
    HN1003: {
      name: "GR Fabricool After Wash 250ml",
      src: "/product/home/3.png",
      category: "HOME CARE",
      code: "HN1003",
      mrp: 146.0,
      discountPrice: 126.0,
      businessValue: 30,
      description:
        "A premium after-wash fabric conditioner that adds softness and freshness to your clothes.",
      benefit:
        "Reduces static cling, enhances fabric texture, and imparts a delightful fragrance. Helps maintain the vibrancy and longevity of fabrics.",
      usageTips:
        "Add directly to the rinse cycle of your washing machine or dilute for hand-washing. Avoid pouring directly onto clothes.",
    },
    HN1004: {
      name: "Kitchen Scrub 3pcs (with SS Thread)",
      src: "/product/home/4.png",
      category: "HOME CARE",
      code: "HN1004",
      mrp: 68.0,
      discountPrice: 64.0,
      businessValue: 15,
      description:
        "A durable and efficient kitchen scrub designed for heavy-duty cleaning, perfect for scrubbing away tough food residues and stains from utensils and surfaces.",
      benefit:
        "Tough on grime but gentle on surfaces. Ergonomic design provides a comfortable grip. Versatile for cookware, countertops, and utensils.",
      usageTips:
        "Rinse thoroughly before and after use. Use with dish soap for optimal results on greasy stains.",
    },
    HN1005: {
      name: "Multipurpose Cleaning Scrubber 1pc",
      src: "/product/home/5.png",
      category: "HOME CARE",
      code: "HN1005",
      mrp: 135.0,
      discountPrice: 90.0,
      businessValue: 22,
      description:
        "A versatile scrubber suitable for various cleaning tasks, ensuring spotless results on multiple surfaces.",
      benefit:
        "Highly effective on tough stains and grime. Long-lasting and durable. Safe for use on a variety of surfaces, including tiles, countertops, and more.",
      usageTips:
        "Use with an appropriate cleaning agent for stubborn stains. Replace periodically for maximum efficiency.",
    },

    HN1006: {
      name: "Multi-Purpose Stain Remover 200ml",
      src: "/product/home/6.png",
      category: "HOME CARE",
      code: "HN1006",
      mrp: 180.0,
      discountPrice: 150.0,
      businessValue: 37,
      description:
        "A concentrated stain remover specially designed to tackle stubborn stains on clothes, upholstery, and more.",
      benefit:
        "Quickly dissolves tough stains without damaging fabric or surface integrity. Easy-to-use formula suitable for various materials.",
      usageTips:
        "Apply directly on the stain, wait for a few minutes, and then wash or wipe. Test on an inconspicuous area before use.",
    },
    HN1007: {
      name: "Bathroom Tile Cleaner 500ml",
      src: "/product/home/7.png",
      category: "HOME CARE",
      code: "HN1007",
      mrp: 390.0,
      discountPrice: 360.0,
      businessValue: 86,
      description:
        "A specialized cleaner for bathroom tiles that removes dirt, grime, and watermarks, leaving surfaces sparkling clean.",
      benefit:
        "Effectively removes stubborn stains, soap scum, and hard water deposits. Leaves a fresh and hygienic finish.",
      usageTips:
        "Spray directly onto tiles, scrub gently, and rinse with water. Wear gloves for prolonged use.",
    },
    HN1008: {
      name: "Dish Wash Plus (Green) 500ml",
      src: "/product/home/8.png",
      category: "HOME CARE",
      code: "HN1008",
      mrp: 220.0,
      discountPrice: 190.0,
      businessValue: 48,
      description:
        "A high-performance liquid dishwashing solution designed to cut through grease and tough food residues effectively.",
      benefit:
        "Gentle on hands, tough on grease. Provides a rich lather, ensuring spotless dishes with minimal effort.",
      usageTips:
        "Dilute a small amount in water for regular cleaning or use directly for tough grease.",
    },
    HN1009: {
      name: "Florex Plus Cleaner 500ml",
      src: "/product/home/9.png",
      category: "HOME CARE",
      code: "HN1009",
      mrp: 165.0,
      discountPrice: 154.0,
      businessValue: 37,
      description:
        "A versatile floor cleaner that disinfects and leaves a pleasant fragrance, ensuring a clean and germ-free environment.",
      benefit:
        "Kills 99.9% of germs while effectively removing dirt and stains. Leaves a long-lasting fresh fragrance.",
      usageTips:
        "Dilute in water as per instructions for mopping. Use undiluted on tough stains for better results.",
    },
    HN1010: {
      name: "Glass Cleaner 500ml",
      src: "/product/home/10.png",
      category: "HOME CARE",
      code: "HN1010",
      mrp: 250.0,
      discountPrice: 230.0,
      businessValue: 55,
      description:
        "A streak-free glass cleaner that ensures crystal-clear surfaces with minimal effort.",
      benefit:
        "Removes smudges, fingerprints, and dust effectively. Leaves a streak-free shine and enhances visibility.",
      usageTips:
        "Spray directly on glass surfaces and wipe with a clean, dry cloth for a sparkling finish.",
    },
    HC001: {
      name: "மோரிங்கோ கேப்ஸூல் | MORINGO CAPSULES 60tablets",
      src: "/product/health/1.png",
      category: "HEALTH CARE",
      code: "HC001",
      mrp: 975.0,
      discountPrice: 780.0,
      businessValue: 187,
      description:
        "A powerful supplement enriched with the goodness of Moringa, packed with essential vitamins, minerals, and antioxidants.",
      benefit:
        "Boosts immunity, supports overall health, promotes energy levels, and helps improve digestive functions. Rich in antioxidants, it aids in detoxification and reduces inflammation.",
      usageTips:
        "Take one capsule daily with water, preferably after meals, for best results.",
    },
    HC002: {
      name: "சந்தி வலி நிவாரண கேப்ஸூல் | JOINT PAIN RELIEVER CAPSULE 30tablets",
      src: "/product/health/2.png",
      category: "HEALTH CARE",
      code: "HC002",
      mrp: 1140.0,
      discountPrice: 950.0,
      businessValue: 227,
      description:
        "A specially formulated capsule to provide relief from joint pain and improve mobility.",
      benefit:
        "Helps reduce joint inflammation, strengthens cartilage, and improves flexibility for a more active lifestyle.",
      usageTips:
        "Consume one capsule twice a day with warm water after meals for effective relief from joint discomfort.",
    },
    HC003: {
      name: "ஸ்டாமினா பூஸ்டர் | GR NATURE CARE STAMINA BOOSTER 10tablets",
      src: "/product/health/3.png",
      category: "HEALTH CARE",
      code: "HC003",
      mrp: 1190.0,
      discountPrice: 930.0,
      businessValue: 223,
      description:
        "An energy-enhancing supplement designed to boost stamina and endurance naturally.",
      benefit:
        "Improves energy levels, enhances physical performance, and reduces fatigue. Supports overall vitality and well-being.",
      usageTips:
        "Take one tablet daily with milk or water before workouts or during times of high physical activity.",
    },
    HC004: {
      name: "ஆர்கானிக் மொரிங்கா டீ | GR NATURE FRESH ORGANIC MORINGA TEA 100gm",
      src: "/product/health/4.png",
      category: "HEALTH CARE",
      code: "HC004",
      mrp: 399.0,
      discountPrice: 370.0,
      businessValue: 89,
      description:
        "A refreshing and nutrient-rich organic Moringa tea to rejuvenate your body and mind.",
      benefit:
        "Boosts metabolism, supports weight management, and provides essential antioxidants. Promotes relaxation and enhances digestion.",
      usageTips:
        "Steep one teaspoon of tea in hot water for 3-5 minutes. Consume twice daily for maximum benefits.",
    },
    HC005: {
      name: "வலி நிவாரண எண்ணெய் | GR Pain Relief Oil",
      src: "/product/health/5.png",
      category: "HEALTH CARE",
      code: "HC005",
      mrp: 180.0,
      discountPrice: 150.0,
      businessValue: 37,
      description:
        "An effective herbal pain relief oil to alleviate aches and soreness in muscles and joints.",
      benefit:
        "Provides quick relief from pain, reduces inflammation, and enhances blood circulation in the affected areas.",
      usageTips:
        "Massage gently onto the affected area 2-3 times a day for immediate and long-lasting relief.",
    },
    PC001: {
      name: "Natural Aloe Vera Gel 60gm",
      src: "/product/personal/1.png",
      category: "Personal CARE",
      code: "PC001",
      mrp: 99.0,
      discountPrice: 99.0,
      businessValue: 24,
      description:
        "A soothing and hydrating aloe vera gel enriched with natural extracts to nourish and rejuvenate your skin.",
      benefit:
        "Deeply moisturizes skin, soothes irritation, and promotes a healthy glow. Ideal for reducing sunburn, dryness, and minor cuts.",
      usageTips:
        "Apply a small amount directly to the skin or hair as needed. Use twice daily for optimal hydration and repair.",
    },
    PC002: {
      name: "ALOENOVA (Aloevera MILK SOAP) 80gm",
      src: "/product/personal/2.png",
      category: "Personal CARE",
      code: "PC002",
      mrp: 60.0,
      discountPrice: 55.0,
      businessValue: 13,
      description:
        "A luxurious soap infused with aloe vera and milk to cleanse and nourish your skin naturally.",
      benefit:
        "Gently cleanses while retaining skin moisture. Promotes softer, smoother, and radiant skin with daily use.",
      usageTips:
        "Use during your daily bath or shower. Lather and rinse thoroughly for a refreshing feel.",
    },
    PC003: {
      name: "ALOENOVA (Lemon Grass Soap) 100gm",
      src: "/product/personal/3.png",
      category: "Personal CARE",
      code: "PC003",
      mrp: 60.0,
      discountPrice: 55.0,
      businessValue: 13,
      description:
        "An invigorating soap made with lemongrass extracts to refresh and purify your skin.",
      benefit:
        "Cleanses deeply, revitalizes the senses, and leaves skin soft and hydrated. Ideal for oily or acne-prone skin.",
      usageTips:
        "Lather onto wet skin and rinse thoroughly. Use daily for a refreshing and rejuvenating experience.",
    },
    PC004: {
      name: "GEEAAR RED ONION HAIR OIL 200ml",
      src: "/product/personal/4.png",
      category: "Personal CARE",
      code: "PC004",
      mrp: 210.0,
      discountPrice: 175.0,
      businessValue: 41,
      description:
        "A nutrient-rich hair oil with red onion extracts to strengthen hair and promote healthy growth.",
      benefit:
        "Reduces hair fall, strengthens roots, and promotes shiny, thicker hair. Helps combat dandruff and scalp dryness.",
      usageTips:
        "Massage gently onto the scalp and hair. Leave for 1-2 hours or overnight before washing off.",
    },
    PC005: {
      name: "GEEAAR BODY LOTION 200ML",
      src: "/product/personal/5.png",
      category: "Personal CARE",
      code: "PC005",
      mrp: 152.0,
      discountPrice: 142.0,
      businessValue: 34,
      description:
        "A nourishing body lotion formulated to provide long-lasting hydration and softness to your skin.",
      benefit:
        "Moisturizes deeply, improves skin texture, and provides a protective barrier against dryness and irritation.",
      usageTips:
        "Apply generously all over the body after a shower or whenever your skin feels dry.",
    },
    PC006: {
      name: "GEEAAR ANTI-DANDRUFF SHAMPOO 200ml",
      src: "/product/personal/6.png",
      category: "Personal CARE",
      code: "PC006",
      mrp: 195.0,
      discountPrice: 170.0,
      businessValue: 41,
      description:
        "An effective anti-dandruff shampoo designed to cleanse and nourish your scalp while eliminating dandruff.",
      benefit:
        "Reduces dandruff, soothes scalp irritation, and leaves hair soft and manageable. Promotes a healthy scalp environment.",
      usageTips:
        "Apply to wet hair, lather well, and rinse thoroughly. Use 2-3 times a week for best results.",
    },
    PC007: {
      name: "GEEAAR HERBAL SHAMPOO 200ml",
      src: "/product/personal/7.png",
      category: "Personal CARE",
      code: "PC007",
      mrp: 185.0,
      discountPrice: 165.0,
      businessValue: 40,
      description:
        "A herbal shampoo enriched with natural ingredients to cleanse and nourish hair, leaving it soft and shiny.",
      benefit:
        "Strengthens hair follicles, adds shine, and reduces breakage. Suitable for all hair types.",
      usageTips:
        "Apply to damp hair, massage into a rich lather, and rinse thoroughly. Use regularly for best results.",
    },
    PC008: {
      name: "GEEAAR BODY WASH 200ml",
      src: "/product/personal/8.png",
      category: "Personal CARE",
      code: "PC008",
      mrp: 175.0,
      discountPrice: 160.0,
      businessValue: 38,
      description:
        "A refreshing body wash infused with gentle cleansers and natural extracts to leave your skin soft and fragrant.",
      benefit:
        "Cleanses without stripping natural oils, leaving skin smooth and hydrated. Provides a refreshing and soothing experience.",
      usageTips:
        "Apply to a loofah or directly onto wet skin. Lather and rinse thoroughly for a clean, refreshing feel.",
    },
    PC009: {
      name: "FACE WASH CAKE 30gm",
      src: "/product/personal/9.png",
      category: "Personal CARE",
      code: "PC009",
      mrp: 110.0,
      discountPrice: 99.0,
      businessValue: 24,
      description:
        "A compact face wash cake formulated to cleanse and refresh your skin, removing dirt and impurities.",
      benefit:
        "Gently cleanses pores, removes excess oil, and leaves skin feeling fresh and radiant. Ideal for travel use.",
      usageTips:
        "Rub onto wet hands to create a lather. Massage onto face and rinse thoroughly. Use twice daily.",
    },
    AC001: {
      name: "PLASTIC RESTORER 200ml",
      src: "/product/auto/1.png",
      category: "AUTO CARE",
      code: "AC001",
      mrp: 450.0,
      discountPrice: 405.0,
      businessValue: 97,
      description:
        "A premium plastic restorer that revives and protects dull and faded plastic surfaces on your vehicle, providing a showroom-like shine.",
      benefit:
        "Restores color and shine to faded plastics, protects against harmful UV rays, and prevents future damage. Keeps your car's interior and exterior plastic parts looking fresh and new.",
      useTips:
        "Clean the surface thoroughly before use. Apply the restorer evenly with a microfiber cloth. Let it dry to see a noticeable difference in the surface finish.",
    },
    AC002: {
      name: "CAR INTERIOR POLISH 200ml",
      src: "/product/auto/2.png",
      category: "AUTO CARE",
      code: "AC002",
      mrp: 250.0,
      discountPrice: 210.0,
      businessValue: 50,
      description:
        "A specially formulated polish for maintaining the shine and cleanliness of your car's interior surfaces, keeping them looking brand new.",
      benefit:
        "Cleans and enhances the gloss of dashboards, leather, and vinyl surfaces. Provides anti-static properties to repel dust and maintain cleanliness for longer.",
      useTips:
        "Spray a small amount onto a soft cloth. Wipe it gently over the desired interior surface. Buff lightly for a natural shine.",
    },
    AC003: {
      name: "CAR SCREEN WASH Liquid 200ml",
      src: "/product/auto/3.png",
      category: "AUTO CARE",
      code: "AC003",
      mrp: 250.0,
      discountPrice: 210.0,
      businessValue: 50,
      description:
        "An advanced cleaning liquid for car windshields and windows, removing dirt, grime, and water spots effectively.",
      benefit:
        "Improves visibility by eliminating streaks, smudges, and grime. Enhances windshield clarity for safe driving.",
      useTips:
        "Dilute the liquid as per instructions. Apply using a spray bottle or directly into the windshield washer tank for on-the-go cleaning.",
    },
    AC004: {
      name: "CAR DASHBOARD Shine 100gm",
      src: "/product/auto/4.png",
      category: "AUTO CARE",
      code: "AC004",
      mrp: 285.0,
      discountPrice: 240.0,
      businessValue: 58,
      description:
        "A specialized shine formula designed for car dashboards, offering a glossy, non-greasy finish that lasts long.",
      benefit:
        "Protects against UV damage and fading while restoring the natural look of dashboards and trims.",
      useTips:
        "Apply a small amount onto a clean, dry cloth. Gently spread across the dashboard and buff to a smooth finish.",
    },
    AC005: {
      name: "CAR Ultra Foam SHAMPOO 200ml",
      src: "/product/auto/5.png",
      category: "AUTO CARE",
      code: "AC005",
      mrp: 145.0,
      discountPrice: 120.0,
      businessValue: 29,
      description:
        "A high-foam car shampoo that lifts dirt and grime effectively while being gentle on your car's paint.",
      benefit:
        "Produces a rich foam that cleans thoroughly without stripping wax or protective coatings. Leaves your car shining and streak-free.",
      useTips:
        "Mix with water as directed. Apply using a sponge or foam cannon, and rinse thoroughly for a spotless finish.",
    },
    AC006: {
      name: "G.COAT WINDSHIELD PROTECTOR 50ml",
      src: "/product/auto/6.png",
      category: "AUTO CARE",
      code: "AC006",
      mrp: 540.0,
      discountPrice: 450.0,
      businessValue: 105,
      description:
        "A cutting-edge windshield protector that provides a hydrophobic coating, repelling water and improving driving visibility.",
      benefit:
        "Enhances safety by repelling rain and reducing glare. Long-lasting and easy to apply.",
      useTips:
        "Clean the windshield thoroughly. Apply the protector evenly in circular motions. Let it cure before exposing to water.",
    },
    AC007: {
      name: "WATER SPOT REMOVER 200ml",
      src: "/product/auto/7.png",
      category: "AUTO CARE",
      code: "AC007",
      mrp: 520.0,
      discountPrice: 480.0,
      businessValue: 115,
      description:
        "An effective solution for removing water spots and mineral deposits from your vehicle's surfaces, restoring clarity and shine.",
      benefit:
        "Eliminates stubborn water stains from glass, paint, and chrome without damaging the surface. Leaves a streak-free, polished finish.",
      useTips:
        "Spray directly onto the affected area. Use a microfiber cloth to scrub gently and wipe away the residue for a clean look.",
    },
  },
];

export default function ProductGrid() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");

  // Extract actual product objects from nested structure
  const allProducts = products.flatMap((item) =>
    Object.values(item).map((product) => product)
  );

  const filteredProducts = allProducts.filter(
    (product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-4 md:p-6">
      {/* Search Bar & View Toggle */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div className="relative w-full sm:w-64">
          <input
            type="text"
            placeholder="Search products..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#39b54b] focus:border-transparent"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        </div>

        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-600">View:</span>
          <button
            className={`p-1 rounded ${
              viewMode === "grid" ? "bg-gray-100" : ""
            }`}
            onClick={() => setViewMode("grid")}
            aria-label="Grid view"
          >
            <Grid className="h-5 w-5 text-gray-700" />
          </button>
          <button
            className={`p-1 rounded ${
              viewMode === "list" ? "bg-gray-100" : ""
            }`}
            onClick={() => setViewMode("list")}
            aria-label="List view"
          >
            <List className="h-5 w-5 text-gray-700" />
          </button>
        </div>
      </div>

      {/* No Result Found */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600">
            No products found matching your search.
          </p>
        </div>
      ) : viewMode === "grid" ? (
        // Grid View
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product.code}
              className="bg-white rounded-lg overflow-hidden shadow-md transition-all hover:shadow-lg"
            >
              {/* Image Placeholder */}
              <div className="aspect-square bg-gray-100 flex items-center justify-center">
                <img
                  src={product.src || "/placeholder.svg"}
                  alt={product.name}
                  className="w-3/4 h-auto object-contain"
                />
              </div>
              {/* Product Info */}
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-1 text-gray-800">
                  {product.name}
                </h3>
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                  {product.description}
                </p>
                <div className="flex justify-between items-center">
                  <div>
                    <span className="block text-gray-500 line-through text-sm">
                      ₹{product.mrp.toFixed(2)}
                    </span>
                    <span className="text-xl font-bold text-gray-900">
                      ₹{product.discountPrice.toFixed(2)}
                    </span>
                  </div>
                  <button className="px-3 py-1.5 text-sm text-white bg-[#39b54b] hover:bg-[#2da03e] rounded-md transition-colors">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        // List View
        <div className="space-y-4">
          {filteredProducts.map((product) => (
            <div
              key={product.code}
              className="bg-white rounded-lg overflow-hidden shadow-md flex flex-col sm:flex-row"
            >
              {/* Image */}
              <div className="sm:w-1/3 aspect-square sm:aspect-auto bg-gray-100 flex items-center justify-center p-4">
                <img
                  src={product.src || "/placeholder.svg"}
                  alt={product.name}
                  className="max-w-full max-h-40 object-contain"
                />
              </div>

              {/* Product Info */}
              <div className="p-4 sm:w-2/3">
                <h3 className="text-lg font-semibold mb-1 text-gray-800">
                  {product.name}
                </h3>
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                  {product.description}
                </p>
                <div className="flex justify-between items-center">
                  <div>
                    <span className="block text-gray-500 line-through text-sm">
                      ₹{product.mrp.toFixed(2)}
                    </span>
                    <span className="text-xl font-bold text-gray-900">
                      ₹{product.discountPrice.toFixed(2)}
                    </span>
                  </div>
                  <button className="px-4 py-2 text-sm text-white bg-[#39b54b] hover:bg-[#2da03e] rounded-md transition-colors">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
