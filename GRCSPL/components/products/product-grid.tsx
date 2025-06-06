"use client";
import React, { useState,useEffect } from "react";
import { Search, Grid, List, X, Star, ShoppingCart, Eye, Zap, Award, Users,TrendingUp,Gift,ChevronLeft,ChevronRight } from "lucide-react";

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
// Combine all product objects into a flat array
const productsRaw = [
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
  }
];

// Flatten the first object (dictionary) and merge with the rest
const products = [
  ...Object.values(productsRaw[0]).map((p: any) => ({
    ...p,
    useTips: p.useTips ?? p.usageTips,
    rating: p.rating ?? 4.5,
    reviews: p.reviews ?? 0,
    inStock: p.inStock ?? true,
  })),
  ...productsRaw.slice(1)
];

export default function ProductSection() {
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState("grid");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showModal, setShowModal] = useState(false);

  const filteredProducts = products.filter(product =>
    typeof product.name === "string" && product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    typeof product.category === "string" && product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    typeof product.code === "string" && product.code.toLowerCase().includes(searchQuery.toLowerCase())
  );

  interface Product {
    name: string;
    src: string;
    category: string;
    code: string;
    mrp: number;
    discountPrice: number;
    businessValue: number;
    description: string;
    benefit: string;
    useTips?: string;
    usageTips?: string;
    rating?: number;
    reviews?: number;
    inStock?: boolean;
  }

  const openProductModal = (product: Product) => {
    setSelectedProduct(product);
    setShowModal(true);
    document.body.style.overflow = 'hidden';
  };

  const closeProductModal = () => {
    setShowModal(false);
    setSelectedProduct(null);
    document.body.style.overflow = 'unset';
  };

  interface CalculateDiscount {
    (mrp: number, discountPrice: number): number;
  }

  const calculateDiscount: CalculateDiscount = (mrp, discountPrice) => {
    return Math.round(((mrp - discountPrice) / mrp) * 100);
  };

  return (
    <div className="p-4 md:p-6 relative">
     
      {/* Search Bar & View Toggle */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div className="relative w-full sm:w-80">
          <input
            type="text"
            placeholder="Search products..."
            className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#39b54b] focus:border-[#39b54b] transition-all duration-300 bg-white shadow-sm"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
        </div>

        <div className="flex items-center space-x-4 bg-gray-50 rounded-2xl p-2">
          <span className="text-sm text-gray-600 font-medium px-2">View:</span>
          <button
            className={`p-2.5 rounded-xl transition-all duration-300 ${
              viewMode === "grid" 
                ? "bg-[#39b54b] text-white shadow-lg transform scale-105" 
                : "text-gray-600 hover:bg-white hover:shadow-md"
            }`}
            onClick={() => setViewMode("grid")}
            aria-label="Grid view"
          >
            <Grid className="h-5 w-5" />
          </button>
          <button
            className={`p-2.5 rounded-xl transition-all duration-300 ${
              viewMode === "list" 
                ? "bg-[#39b54b] text-white shadow-lg transform scale-105" 
                : "text-gray-600 hover:bg-white hover:shadow-md"
            }`}
            onClick={() => setViewMode("list")}
            aria-label="List view"
          >
            <List className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* No Result Found */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-16">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="w-12 h-12 text-gray-400" />
          </div>
          <p className="text-xl text-gray-600 mb-2">No products found</p>
          <p className="text-gray-500">Try adjusting your search terms</p>
        </div>
      ) : viewMode === "grid" ? (
        // Enhanced Grid View
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product, index) => (
            <div
              key={product.code}
              className="group bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100"
              style={{
                animationDelay: `${index * 100}ms`,
                animation: 'fadeInUp 0.6s ease-out forwards'
              }}
            >
              {/* Product Image with Overlay */}
              <div className="relative aspect-square bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
                <img
                  src={product.src}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                
                {/* Discount Badge */}
                {typeof product.mrp === "number" && typeof product.discountPrice === "number" && calculateDiscount(product.mrp, product.discountPrice) > 0 && (
                  <div className="absolute top-4 left-4 bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                    {calculateDiscount(product.mrp, product.discountPrice)}% OFF
                  </div>
                )}

                {/* Stock Status */}
                <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-sm font-medium ${
                  product.inStock 
                    ? "bg-green-100 text-green-800" 
                    : "bg-red-100 text-red-800"
                }`}>
                  {product.inStock ? "In Stock" : "Out of Stock"}
                </div>

                {/* Quick View Overlay */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <button
                    onClick={() => openProductModal(product)}
                    className="bg-white text-gray-900 px-6 py-3 rounded-full font-semibold flex items-center space-x-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300"
                  >
                    <Eye className="w-4 h-4" />
                    <span>Quick View</span>
                  </button>
                </div>
              </div>

              {/* Product Info */}
              <div className="p-6">
                <div className="mb-3">
                  <span className="text-xs font-semibold text-[#39b54b] bg-[#39b54b]/10 px-2 py-1 rounded-full">
                    {product.category}
                  </span>
                </div>
                
                <h3 className="text-lg font-bold mb-2 text-gray-800 line-clamp-2 group-hover:text-[#39b54b] transition-colors">
                  {product.name}
                </h3>
                
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                  {product.description}
                </p>

                {/* Rating */}
                <div className="flex items-center mb-4">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600 ml-2">({product.reviews})</span>
                </div>

                {/* Price and Action */}
                <div className="flex justify-between items-center">
                  <div>
                    <span className="block text-gray-400 line-through text-sm">
                      ₹{product.mrp.toFixed(2)}
                    </span>
                    <span className="text-2xl font-bold text-gray-900">
                      ₹{product.discountPrice.toFixed(2)}
                    </span>
                  </div>
                  <button 
                    onClick={() => openProductModal(product)}
                    className="px-4 py-2 text-sm text-white bg-gradient-to-r from-[#39b54b] to-[#2da03e] hover:from-[#2da03e] hover:to-[#259038] rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        // Enhanced List View
        <div className="space-y-6">
          {filteredProducts.map((product, index) => (
            <div
              key={product.code}
              className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col sm:flex-row border border-gray-100"
              style={{
                animationDelay: `${index * 100}ms`,
                animation: 'fadeInUp 0.6s ease-out forwards'
              }}
            >
              {/* Image */}
              <div className="sm:w-1/3 aspect-square sm:aspect-auto bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-6 relative">
                <img
                  src={product.src}
                  alt={product.name}
                  className="max-w-full max-h-48 object-contain"
                />
                
                {/* Discount Badge */}
                {calculateDiscount(product.mrp, product.discountPrice) > 0 && (
                  <div className="absolute top-4 left-4 bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                    {calculateDiscount(product.mrp, product.discountPrice)}% OFF
                  </div>
                )}
              </div>

              {/* Product Info */}
              <div className="p-6 sm:w-2/3 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-semibold text-[#39b54b] bg-[#39b54b]/10 px-2 py-1 rounded-full">
                      {product.category}
                    </span>
                    <span className={`text-sm font-medium ${
                      product.inStock ? "text-green-600" : "text-red-600"
                    }`}>
                      {product.inStock ? "In Stock" : "Out of Stock"}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-bold mb-2 text-gray-800">
                    {product.name}
                  </h3>
                  
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {product.description}
                  </p>

                  {/* Rating */}
                  <div className="flex items-center mb-4">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-600 ml-2">({product.reviews} reviews)</span>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <div>
                    <span className="block text-gray-400 line-through text-sm">
                      ₹{product.mrp.toFixed(2)}
                    </span>
                    <span className="text-2xl font-bold text-gray-900">
                      ₹{product.discountPrice.toFixed(2)}
                    </span>
                  </div>
                  <button 
                    onClick={() => openProductModal(product)}
                    className="px-6 py-3 text-white bg-gradient-to-r from-[#39b54b] to-[#2da03e] hover:from-[#2da03e] hover:to-[#259038] rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center space-x-2"
                  >
                    <Eye className="w-4 h-4" />
                    <span>View Details</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Animated Product Detail Modal */}
      {showModal && selectedProduct && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto animate-slideUp">
            {/* Modal Header */}
            <div className="sticky top-0 bg-white border-b border-gray-100 p-6 flex justify-between items-center rounded-t-3xl">
              <h2 className="text-2xl font-bold text-gray-900">Product Details</h2>
              <button
                onClick={closeProductModal}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Product Image */}
                <div className="relative">
                  <div className="aspect-square rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
                    <img
                      src={selectedProduct.src}
                      alt={selectedProduct.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  {/* Discount Badge */}
                  {calculateDiscount(selectedProduct.mrp, selectedProduct.discountPrice) > 0 && (
                    <div className="absolute top-4 left-4 bg-gradient-to-r from-red-500 to-pink-500 text-white px-4 py-2 rounded-full font-bold">
                      {calculateDiscount(selectedProduct.mrp, selectedProduct.discountPrice)}% OFF
                    </div>
                  )}
                </div>

                {/* Product Info */}
                <div>
                  <div className="mb-4">
                    <span className="text-sm font-semibold text-[#39b54b] bg-[#39b54b]/10 px-3 py-1 rounded-full">
                      {selectedProduct.category}
                    </span>
                    <span className="text-sm text-gray-600 ml-3">Code: {selectedProduct.code}</span>
                  </div>

                  <h1 className="text-3xl font-bold text-gray-900 mb-4">
                    {selectedProduct.name}
                  </h1>

                  {/* Rating and Reviews */}
                  <div className="flex items-center mb-6">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`w-5 h-5 ${i < Math.floor(selectedProduct.rating ?? 0) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                        />
                      ))}
                    </div>
                    <span className="text-lg font-semibold ml-2">{selectedProduct.rating}</span>
                    <span className="text-gray-600 ml-2">({selectedProduct.reviews} reviews)</span>
                  </div>

                  {/* Price */}
                  <div className="mb-6">
                    <div className="flex items-center space-x-4">
                      <span className="text-gray-400 line-through text-xl">
                        ₹{selectedProduct.mrp.toFixed(2)}
                      </span>
                      <span className="text-4xl font-bold text-gray-900">
                        ₹{selectedProduct.discountPrice.toFixed(2)}
                      </span>
                    </div>
                    <p className="text-green-600 font-semibold mt-2">
                      You save ₹{(selectedProduct.mrp - selectedProduct.discountPrice).toFixed(2)}
                    </p>
                  </div>

                  {/* Stock Status */}
                  <div className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold mb-6 ${
                    selectedProduct.inStock 
                      ? "bg-green-100 text-green-800" 
                      : "bg-red-100 text-red-800"
                  }`}>
                    {selectedProduct.inStock ? "✓ In Stock" : "✗ Out of Stock"}
                  </div>

                  {/* Business Value */}
                  <div className="bg-gradient-to-r from-[#39b54b]/10 to-[#2da03e]/10 rounded-2xl p-4 mb-6">
                    <div className="flex items-center space-x-2">
                      <Award className="w-5 h-5 text-[#39b54b]" />
                      <span className="font-semibold text-gray-900">Business Value: ₹{selectedProduct.businessValue}</span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <a href="https://pages.razorpay.com/stores/st_QD6JmHuMK8AMiy">
                  <div className="flex space-x-4 mb-8">
                    
                    <button className="flex-1 bg-gradient-to-r from-[#39b54b] to-[#2da03e] text-white py-4 rounded-2xl font-semibold text-lg hover:shadow-lg transition-all duration-300 flex items-center justify-center space-x-2">
                      <ShoppingCart className="w-5 h-5" />
                      <span>Buy Now</span>
                    </button>
                    
                  </div>
                  </a>
                </div>
              </div>

              {/* Detailed Information Tabs */}
              <div className="border-t border-gray-100 pt-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Description */}
                  <div className="bg-gray-50 rounded-2xl p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center">
                      <Zap className="w-5 h-5 text-[#39b54b] mr-2" />
                      Description
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      {selectedProduct.description}
                    </p>
                  </div>

                  {/* Benefits */}
                  <div className="bg-blue-50 rounded-2xl p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center">
                      <Award className="w-5 h-5 text-blue-600 mr-2" />
                      Key Benefits
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      {selectedProduct.benefit}
                    </p>
                  </div>

                  {/* Usage Tips */}
                  <div className="bg-green-50 rounded-2xl p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center">
                      <Users className="w-5 h-5 text-green-600 mr-2" />
                      Usage Tips
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      {selectedProduct.useTips}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(50px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        
        .animate-slideUp {
          animation: slideUp 0.4s ease-out;
        }
        
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
}

