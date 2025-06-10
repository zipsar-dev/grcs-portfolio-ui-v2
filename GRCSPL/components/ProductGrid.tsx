"use client";

import React, { useState, useEffect } from "react";
import ProductsPage from "@/components/productcart/ProductsPage";
import CartPage from "@/components/productcart/CartPage";
import CheckoutPage from "@/components/productcart/check";
import SuccessPage from "@/components/productcart/SuccessPage";
import { Star, X, ShoppingCart, Award, Zap, Users } from "lucide-react";
import OfferPopupCard from "@/components/Popup/sidepopup";

// Define types based on your data
interface Product {
  name: string;
  category: string;
  src: string;
  code: string;
  mrp: number;
  discountPrice: number;
  businessValue: number;
  description: string;
  benefit: string;
  usageTips?: string;
  useTips?: string;
  inStock?: boolean;
  rating?: number;
  reviews?: number;
}

interface CartItem {
  product: Product;
  quantity: number;
}

interface CustomerInfo {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  pincode: string;
}

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
      rating: 4.5,
      reviews: 128,
      inStock: true,
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
      businessValue: 352,
      rating: 4.5,
      reviews: 128,
      inStock: true,
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
      rating: 3.5,
      reviews:8,
      inStock: true,
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
      rating: 4.3,
      reviews: 562,
      inStock: true,
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
      rating: 4.2,
      reviews: 108,
      inStock: true,
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
      rating: 4.0,
      reviews: 58,
      inStock: true,
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
      rating: 4.3,
      reviews:82,
      inStock: true,
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
      rating: 4.8,
      reviews: 528,
      inStock: true,
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
      rating: 4.0,
      reviews: 328,
      inStock: true,
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
      rating: 4.5,
      reviews:58,
      inStock: true,
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
      rating: 4.5,
      reviews: 18,
      inStock: true,
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
      rating: 5.0,
      reviews: 11,
      inStock: true,
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
      rating: 4.5,
      reviews: 28,
      inStock: true,
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
      rating: 4.3,
      reviews: 118,
      inStock: true,
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
      rating: 4.9,
      reviews: 58,
      inStock: true,
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
      rating: 4.2,
      reviews: 58,
      inStock: true,
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
      rating: 4.5,
      reviews: 368,
      inStock: true,
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
      rating: 3.8,
      reviews: 418,
      inStock: true,
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
      rating: 4.7,
      reviews: 158,
      inStock: true,
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
      rating: 4.1,
      reviews:28,
      inStock: true,
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
      rating: 4.5,
      reviews: 210,
      inStock: true,
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
      rating: 4.3,
      reviews: 188,
      inStock: true,
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
      rating: 4.8,
      reviews: 78,
      inStock: true,
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
      rating: 4.8,
      reviews: 428,
      inStock: true,
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
      rating: 4.5,
      reviews: 23,
      inStock: true,
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
      rating: 3.5,
      reviews: 18,
      inStock: true,
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
      rating: 4.7,
      reviews: 110,
      inStock: true,
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
      rating: 4.6,
      reviews: 88,
      inStock: true,
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
      rating: 4.2,
      reviews: 135,
      inStock: true,
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
      rating: 5.0,
      reviews: 11,
      inStock: true,
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
      rating: 5.0,
      reviews: 20,
      inStock: true,
      description:
        "An effective solution for removing water spots and mineral deposits from your vehicle's surfaces, restoring clarity and shine.",
      benefit:
        "Eliminates stubborn water stains from glass, paint, and chrome without damaging the surface. Leaves a streak-free, polished finish.",
      useTips:
        "Spray directly onto the affected area. Use a microfiber cloth to scrub gently and wipe away the residue for a clean look.",
    },
  },
];

const ProductGrid = () => {
  const [currentPage, setCurrentPage] = useState<string>("products");
  const [products] = useState<Product[]>(Object.values(productsRaw[0]));
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [viewMode, setViewMode] = useState<string>("grid");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [customerInfo, setCustomerInfo] = useState<CustomerInfo>({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    pincode: "",
  });
  // Add paymentMethod to the state
  const [paymentMethod, setPaymentMethod] = useState<string>("");

  // Add to cart
  const addToCart = (product: Product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find(
        (item) => item.product.code === product.code
      );
      if (existingItem) {
        return prevCart.map((item) =>
          item.product.code === product.code
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { product, quantity: 1 }];
    });
  };

  // Update cart quantity
  const updateCartQuantity = ({
    productCode,
    newQuantity,
  }: {
    productCode: string;
    newQuantity: number;
  }) => {
    if (newQuantity <= 0) {
      removeFromCart(productCode);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.product.code === productCode
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  // Remove from cart
  const removeFromCart = (productCode: string) => {
    setCart((prevCart) =>
      prevCart.filter((item) => item.product.code !== productCode)
    );
  };

  // Get total cart value
  const getCartTotal = () => {
    return cart.reduce(
      (total, item) => total + item.product.discountPrice * item.quantity,
      0
    );
  };

  // Handle customer info change
  const handleCustomerInfoChange = (
    field: keyof CustomerInfo,
    value: string
  ) => {
    setCustomerInfo((prev) => ({ ...prev, [field]: value }));
  };

  // Modify handleCheckout to include paymentMethod
  const handleCheckout = () => {
    setTimeout(() => {
      setCurrentPage("success");
    }, 1000);
  };

  // Open product modal
  const openProductModal = (product: Product) => {
    setSelectedProduct(product);
  };

  // Close product modal
  const closeProductModal = () => {
    setSelectedProduct(null);
  };

  function calculateDiscount(mrp: number, discountPrice: number) {
    const discount = ((mrp - discountPrice) / mrp) * 100;
    return Math.round(discount);
  }

  // Render current page
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Offer Popup Card */}
      <OfferPopupCard />
      {/* Product Detail Modal */}
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-green-700 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setCurrentPage("products")}
                className="text-2xl font-bold text-[#39b54b] hover:text-[#2da03e] transition-colors"
              >
                GRCSPL Store
              </button>
              {currentPage !== "products" && (
                <button
                  onClick={() =>
                    setCurrentPage(
                      currentPage === "checkout" ? "cart" : "products"
                    )
                  }
                  className="flex items-center text-gray-600 hover:text-[#39b54b] transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 mr-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                  Back
                </button>
              )}
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setCurrentPage("cart")}
                className="relative p-2 text-gray-600 hover:text-[#39b54b] transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                  />
                </svg>
                {cart.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cart.reduce((acc, item) => acc + item.quantity, 0)}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {currentPage === "products" && (
          <ProductsPage
            products={products}
            addToCart={addToCart}
            openProductModal={openProductModal}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            viewMode={viewMode}
            setViewMode={setViewMode}
          />
        )}

        {currentPage === "cart" && (
          <CartPage
            cart={cart}
            updateCartQuantity={updateCartQuantity}
            removeFromCart={removeFromCart}
            getCartTotal={getCartTotal}
            setCurrentPage={setCurrentPage}
          />
        )}

        {currentPage === "checkout" && (
          <CheckoutPage
            cart={cart}
            customerInfo={customerInfo}
            handleCustomerInfoChange={handleCustomerInfoChange}
            getCartTotal={getCartTotal}
            handleCheckout={handleCheckout}
            setCurrentPage={setCurrentPage}
            paymentMethod={paymentMethod}
            setPaymentMethod={setPaymentMethod} // Add this prop
          />
        )}

        {currentPage === "success" && (
          <SuccessPage
            cart={cart}
            customerInfo={customerInfo}
            getCartTotal={getCartTotal}
            setCurrentPage={setCurrentPage}
            paymentMethod={paymentMethod} // Add this prop
          />
        )}
      </main>

      {/* Product Detail Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto animate-slideUp">
            {/* Modal Header */}
            <div className="sticky top-0 bg-white border-b border-gray-100 p-6 flex justify-between items-center rounded-t-3xl">
              <h2 className="text-2xl font-bold text-gray-900">
                Product Details
              </h2>
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
                  {calculateDiscount(
                    selectedProduct.mrp,
                    selectedProduct.discountPrice
                  ) > 0 && (
                    <div className="absolute top-4 left-4 bg-gradient-to-r from-red-500 to-pink-500 text-white px-4 py-2 rounded-full font-bold">
                      {calculateDiscount(
                        selectedProduct.mrp,
                        selectedProduct.discountPrice
                      )}
                      % OFF
                    </div>
                  )}
                </div>

                {/* Product Info */}
                <div>
                  <div className="mb-4">
                    <span className="text-sm font-semibold text-[#39b54b] bg-[#39b54b]/10 px-3 py-1 rounded-full">
                      {selectedProduct.category}
                    </span>
                    <span className="text-sm text-gray-600 ml-3">
                      Code: {selectedProduct.code}
                    </span>
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
                          className={`w-5 h-5 ${
                            i < Math.floor(selectedProduct.rating ?? 0)
                              ? "text-yellow-400 fill-current"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-lg font-semibold ml-2">
                      {selectedProduct.rating}
                    </span>
                    <span className="text-gray-600 ml-2">
                      ({selectedProduct.reviews} reviews)
                    </span>
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
                      You save ₹
                      {(
                        selectedProduct.mrp - selectedProduct.discountPrice
                      ).toFixed(2)}
                    </p>
                  </div>

                  {/* Stock Status */}
                  <div
                    className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold mb-6 ${
                      selectedProduct.inStock
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {selectedProduct.inStock ? "✓ In Stock" : "✗ Out of Stock"}
                  </div>

                  {/* Business Value */}
                  <div className="bg-gradient-to-r from-[#39b54b]/10 to-[#2da03e]/10 rounded-2xl p-4 mb-6">
                    <div className="flex items-center space-x-2">
                      <Award className="w-5 h-5 text-[#39b54b]" />
                      <span className="font-semibold text-gray-900">
                        Business Value: ₹{selectedProduct.businessValue}
                      </span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-4 mb-8">
                    <button
                      onClick={() => {
                        if (selectedProduct.inStock) {
                          addToCart(selectedProduct);
                        }
                      }}
                      disabled={!selectedProduct.inStock}
                      className={`flex-1 py-4 rounded-2xl font-semibold text-lg hover:shadow-lg transition-all duration-300 flex items-center justify-center space-x-2' ${
                        selectedProduct.inStock
                          ? "bg-gradient-to-r from-[#39b54b] to-[#2da03e] text-white hover:shadow-lg"
                          : "bg-gray-300 text-gray-500 cursor-not-allowed"
                      }`}
                    >
                      <ShoppingCart className="w-5 h-5" />
                      <span>Add to Cart</span>
                    </button>
                  </div>
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
                      {selectedProduct.usageTips}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductGrid;
