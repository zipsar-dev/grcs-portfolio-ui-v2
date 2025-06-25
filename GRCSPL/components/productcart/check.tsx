import {
  User,
  MapPin,
  Phone,
  Mail,
  CreditCard,
  CheckCircle,
  Package,
  Truck,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { postorder } from "../api/order";

if (typeof window !== "undefined") {
  const script = document.createElement("script");
  script.src = "https://checkout.razorpay.com/v1/checkout.js";
  script.async = true;
  document.body.appendChild(script);
}

interface CartItem {
  product: any; // Replace 'any' with the actual type of your product
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

interface CheckoutPageProps {
  cart: CartItem[];
  customerInfo: CustomerInfo;
  handleCustomerInfoChange: (field: keyof CustomerInfo, value: string) => void;
  getCartTotal: () => number;
  handleCheckout: () => void;
  setCurrentPage: (page: string) => void;
  paymentMethod: string;
  setPaymentMethod: (method: string) => void;
  setTransactionId: (id: string) => void;
  setTransportCharges?: (charges: number) => void;
}

// Calculate transport charges based on weight
const calculateTransportCharges = (totalWeight: number): number => {
  if (totalWeight <= 500) {
    return 1;
  } else if (totalWeight <= 1000) {
    return 60;
  } else if (totalWeight <= 2000) {
    return 80; // ₹80 for <= 2000g (2kg)
  } else if (totalWeight <= 5000) {
    return 120; // ₹120 for <= 5000g (5kg)
  } else {
    // For > 5kg, ₹120 + ₹20 for each additional kg
    const additionalKg = Math.ceil((totalWeight - 5000) / 1000);
    return 120 + additionalKg * 20;
  }
};

const formatOrderData = (
  customerInfo: CustomerInfo,
  cart: CartItem[],
  getCartTotal: () => number,
  transportCharges: number,
  paymentMethod: string,
  transactionId: string = ""
) => {
  // Format cart items for the order
  const items = cart.map((item) => ({
    productName: item.product.name,
    price: item.product.discountPrice,
    quantity: item.quantity,
    subtotal: item.product.discountPrice * item.quantity,
  }));

  // Create invoice ID with current date and random digits
  const now = new Date();
  const dateStr = `${now.getFullYear()}${String(now.getMonth() + 1).padStart(
    2,
    "0"
  )}${String(now.getDate()).padStart(2, "0")}`;
  const randomDigits = Math.floor(Math.random() * 1000)
    .toString()
    .padStart(3, "0");
  const invoiceId = `INV-${dateStr}-${randomDigits}`;

  // Calculate totals
  const subtotal = getCartTotal();
  const totalAmount = subtotal + transportCharges;

  // Convert payment method to the format expected by the API
  let formattedPaymentMethod;
  if (paymentMethod === "Online") {
    formattedPaymentMethod = "online"; // Changed from "online_payment" to match API expectations
  } else {
    formattedPaymentMethod = "cash_on_delivery";
  }

  return {
    customer: {
      name: customerInfo.name,
      email: customerInfo.email,
      phone: customerInfo.phone,
      address: {
        street: customerInfo.address,
        city: customerInfo.city,
        state: customerInfo.city, // Using city as state to ensure it's not empty
        zipCode: customerInfo.pincode,
        country: "IN",
      },
    },
    items,
    paymentMethod: formattedPaymentMethod,
    paymentStatus:
      paymentMethod === "Online" && transactionId ? "paid" : "unpaid",
    transactionId: transactionId || "",
    invoiceId,
    subtotal,
    taxAmount: 0,
    discountAmount: 0,
    shippingCharges: transportCharges,
    totalAmount,
    notes: "",
    trackingNumber: "",
    estimatedDelivery: new Date(
      new Date().setDate(now.getDate() + 5)
    ).toISOString(),
    actualDelivery: null,
  };
};

const handlepayment = async (
  e: React.MouseEvent<HTMLButtonElement>,
  customerInfo: CustomerInfo,
  cart: CartItem[],
  getCartTotal: () => number,
  transportCharges: number,
  paymentMethod: string,
  setCurrentPage: (page: string) => void,
  setTransactionId: (id: string) => void
): Promise<void> => {
  console.log("Payment handler customerInfo:", customerInfo);
  e.preventDefault();
  const subtotal = getCartTotal();
  const totalAmount = (subtotal + transportCharges).toFixed(2);
  if (totalAmount === "0.00") {
    console.log("please enter amount");
  } else {
    interface RazorpayOptions {
      key: string;
      key_secret: string;
      amount: number;
      currency: string;
      name: string;
      description: string;
      handler: (response: RazorpayResponse) => void;
      prefill: RazorpayPrefill;
      notes: RazorpayNotes;
      theme: RazorpayTheme;
    }

    interface RazorpayResponse {
      razorpay_payment_id: string;
    }

    interface RazorpayPrefill {
      name: string;
      email: string;
      contact: string;
    }

    interface RazorpayNotes {
      address: string;
    }

    interface RazorpayTheme {
      color: string;
    }

    // Combine address fields into a single string
    const fullAddress = `Address: ${customerInfo.address}, City: ${customerInfo.city}, State: ${customerInfo.city}, Pincode: ${customerInfo.pincode}`;

    const options: RazorpayOptions = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY || "default_key",
      key_secret:
      process.env.NEXT_PUBLIC_RAZORPAY_KEY_SECRET || "default_key_secret",
      amount: parseFloat(totalAmount) * 100, // Convert total to paise
      currency: "INR",
      name: "GRCSPL",
      description: "Order Payment",
      handler: async function (response: RazorpayResponse): Promise<void> {
      const transactionId = response.razorpay_payment_id;
      setTransactionId(transactionId);

      try {
        const captureRes = await fetch(
        `https://api.razorpay.com/v1/payments/${transactionId}/capture`,
        {
          method: "POST",
          headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization:
            "Basic " +
            btoa(
            `${process.env.NEXT_PUBLIC_RAZORPAY_KEY}:${process.env.NEXT_PUBLIC_RAZORPAY_KEY_SECRET}`
            ),
          },
          body: `amount=${parseFloat(totalAmount) * 100}&currency=INR`,
        }
        );
        if (!captureRes.ok) {
        throw new Error("Failed to capture payment");
        }
        await captureRes.json();
      } catch (err) {
        console.log(
        "Payment was successful but capture failed. Proceeding to next step."
        );
      }

      const orderData = formatOrderData(
        customerInfo,
        cart,
        getCartTotal,
        transportCharges,
        paymentMethod,
        transactionId
      );
      if (typeof window !== "undefined") {
        localStorage.setItem("addToCart", JSON.stringify(null));
      }

      try {
        await postorder(orderData);
        setCurrentPage("success");
      } catch (error) {
        alert(
        "Payment successful but failed to submit order. Please contact support."
        );
      }
      },
      prefill: {
      name: customerInfo.name,
      email: customerInfo.email,
      contact: customerInfo.phone,
      },
      notes: {
      address: fullAddress,
      },
      theme: {
      color: "#39b54b",
      },
    };
    const pay = new (window as any).Razorpay(options);
    pay.open();
  }
};

const CheckoutPage: React.FC<CheckoutPageProps> = ({
  cart,
  customerInfo,
  handleCustomerInfoChange,
  getCartTotal,
  handleCheckout,
  setCurrentPage,
  setPaymentMethod,
  paymentMethod,
  setTransactionId,
  setTransportCharges: setParentTransportCharges,
}) => {
  // Calculate total weight
  const getTotalWeight = () => {
    return cart.reduce(
      (total, item) => total + (item.product.weight || 0) * item.quantity,
      0
    );
  };

  // Calculate transport charges
  const [transportCharges, setTransportCharges] = useState(0);

  useEffect(() => {
    const totalWeight = getTotalWeight();
    const charges = calculateTransportCharges(totalWeight);
    setTransportCharges(charges);

    // Update parent component with transport charges if the function is provided
    if (setParentTransportCharges) {
      setParentTransportCharges(charges);
    }
  }, [cart, setParentTransportCharges]); // Calculate final total
  const getFinalTotal = () => {
    return getCartTotal() + transportCharges;
  };
  // Handle COD checkout
  const handleCODCheckout = async () => {
    if (paymentMethod === "cash_on_delivery") {
      try {
        const orderData = formatOrderData(
          customerInfo,
          cart,
          getCartTotal,
          transportCharges,
          paymentMethod
        );

        await postorder(orderData);

        // Clear the cart after successful order
        if (typeof window !== "undefined") {
          localStorage.setItem("addToCart", JSON.stringify(null));
        }

        // Proceed with regular checkout flow
        handleCheckout();
      } catch (error) {
        console.error("Failed to submit order:", error);
        alert("Failed to place order. Please try again.");
      }
    } else {
      handleCheckout();
    }
  };
  // Return transport charges for use in other components
  const getTransportCharges = () => {
    return transportCharges;
  };

  return (
    <div className="p-4 md:p-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Customer Information Form */}
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
            <User className="w-5 h-5 mr-2 text-[#39b54b]" />
            Customer Information
          </h2>
          <div className="space-y-4">
            <div>
              <label
                htmlFor="customer-name"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Full Name
              </label>
              <input
                id="customer-name"
                name="name"
                type="text"
                value={customerInfo.name}
                onChange={(e) =>
                  handleCustomerInfoChange("name", e.target.value)
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#39b54b] focus:border-[#39b54b]"
                placeholder="Enter your full name"
                autoComplete="name"
              />
            </div>
            <div>
              <label
                htmlFor="customer-email"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Email
              </label>
              <input
                id="customer-email"
                name="email"
                type="email"
                value={customerInfo.email}
                onChange={(e) =>
                  handleCustomerInfoChange("email", e.target.value)
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#39b54b] focus:border-[#39b54b]"
                placeholder="Enter your email"
                autoComplete="email"
              />
            </div>
            <div>
              <label
                htmlFor="customer-phone"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Phone
              </label>
              <input
                id="customer-phone"
                name="tel"
                type="tel"
                value={customerInfo.phone}
                onChange={(e) =>
                  handleCustomerInfoChange("phone", e.target.value)
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#39b54b] focus:border-[#39b54b]"
                placeholder="Enter your phone number"
                autoComplete="tel"
              />
            </div>
            <div>
              <label
                htmlFor="customer-address"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Address
              </label>
              <textarea
                id="customer-address"
                name="street-address"
                value={customerInfo.address}
                onChange={(e) =>
                  handleCustomerInfoChange("address", e.target.value)
                }
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#39b54b] focus:border-[#39b54b]"
                placeholder="Enter your full address"
                autoComplete="street-address"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="customer-city"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  City
                </label>
                <input
                  id="customer-city"
                  name="address-level2"
                  type="text"
                  value={customerInfo.city}
                  onChange={(e) =>
                    handleCustomerInfoChange("city", e.target.value)
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#39b54b] focus:border-[#39b54b]"
                  placeholder="City"
                  autoComplete="address-level2"
                />
              </div>
              <div>
                <label
                  htmlFor="customer-pincode"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Pincode
                </label>
                <input
                  id="customer-pincode"
                  name="postal-code"
                  type="text"
                  value={customerInfo.pincode}
                  onChange={(e) =>
                    handleCustomerInfoChange("pincode", e.target.value)
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#39b54b] focus:border-[#39b54b]"
                  placeholder="Pincode"
                  autoComplete="postal-code"
                />
              </div>
            </div>
          </div>
        </div>
        {/* Order Summary & Payment */}
        <div className="space-y-6">
          {/* Order Summary */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
              <MapPin className="w-5 h-5 mr-2 text-[#39b54b]" />
              Order Summary
            </h2>
            <div className="space-y-4 mb-6">
              {cart.map((item) => (
                <div
                  key={item.product.code}
                  className="flex items-center space-x-4"
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg flex items-center justify-center">
                    <img
                      src={item.product.src}
                      alt={item.product.name}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900">
                      {item.product.name}
                    </h4>
                    <p className="text-sm text-gray-600">
                      Qty: {item.quantity}
                    </p>
                    {/* <p className="text-xs text-gray-500">
                      Weight: {item.product.weight || 0}g × {item.quantity} = {(item.product.weight || 0) * item.quantity}g
                    </p> */}
                  </div>
                  <span className="font-bold text-gray-900">
                    ₹{(item.product.discountPrice * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
            <div className="border-t border-gray-200 pt-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-semibold">
                  ₹{getCartTotal().toFixed(2)}
                </span>
              </div>
              {/* <div className="flex justify-between items-center mb-2">
                <div className="flex items-center">
                  <Package className="w-4 h-4 mr-2 text-gray-600" />
                  <span className="text-gray-600">Total Weight</span>
                </div>
                <span className="font-semibold">
                  {getTotalWeight()}g
                </span>
              </div> */}
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center">
                  <Truck className="w-4 h-4 mr-2 text-gray-600" />
                  <span className="text-gray-600">Transport Charges</span>
                </div>
                <span className="font-semibold">
                  ₹{transportCharges.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between items-center text-lg font-bold">
                <span>Total</span>
                <span className="text-[#39b54b]">
                  ₹{getFinalTotal().toFixed(2)}
                </span>
              </div>
            </div>
          </div>
          {/* Payment Section */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
              <CreditCard className="w-5 h-5 mr-2 text-[#39b54b]" />
              Payment Method
            </h2>
            <div className="space-y-4 mb-6">
              <label className="flex items-center p-4 border-2 border-gray-200 rounded-xl hover:border-[#39b54b] cursor-pointer transition-colors">
                <input
                  type="radio"
                  name="payment-method"
                  id="payment-cod"
                  value="cash_on_delivery"
                  checked={paymentMethod === "cash_on_delivery"}
                  onChange={() => setPaymentMethod("cash_on_delivery")}
                  className="mr-3"
                />
                <div>
                  <span className="font-semibold">Cash on Delivery</span>
                  <p className="text-sm text-gray-600">
                    Pay when you receive your order
                  </p>
                </div>
              </label>
              <label className="flex items-center p-4 border-2 border-gray-200 rounded-xl hover:border-[#39b54b] cursor-pointer transition-colors">
                <input
                  type="radio"
                  name="payment-method"
                  id="payment-online"
                  value="Online"
                  checked={paymentMethod === "Online"}
                  onChange={() => setPaymentMethod("Online")}
                  className="mr-3"
                />
                <div>
                  <span className="font-semibold">Online Payment</span>
                  <p className="text-sm text-gray-600">
                    Pay securely with card or UPI
                  </p>
                </div>
              </label>
            </div>
            <button
              onClick={handleCODCheckout}
              disabled={
                !customerInfo.name ||
                !customerInfo.email ||
                !customerInfo.phone ||
                !customerInfo.address ||
                !paymentMethod
              }
              className={`w-full py-4 rounded-xl font-semibold text-lg transition-all duration-300 flex items-center justify-center space-x-2 ${
                customerInfo.name &&
                customerInfo.email &&
                customerInfo.phone &&
                customerInfo.address &&
                paymentMethod
                  ? "bg-gradient-to-r from-[#39b54b] to-[#2da03e] text-white hover:shadow-lg"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            >
              <CheckCircle className="w-5 h-5" />
              <span>Place Order</span>
            </button>
            {paymentMethod === "Online" && (
              <button
                onClick={(e) =>
                  handlepayment(
                    e,
                    customerInfo,
                    cart,
                    getCartTotal,
                    transportCharges,
                    paymentMethod,
                    setCurrentPage,
                    setTransactionId
                  )
                }
                disabled={
                  !customerInfo.name ||
                  !customerInfo.email ||
                  !customerInfo.phone ||
                  !customerInfo.address
                }
                className={`w-full py-4 mt-4 rounded-xl font-semibold text-lg transition-all duration-300 flex items-center justify-center space-x-2 ${
                  customerInfo.name &&
                  customerInfo.email &&
                  customerInfo.phone &&
                  customerInfo.address
                    ? "bg-gradient-to-r from-[#39b54b] to-[#2da03e] text-white hover:shadow-lg"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
              >
                <CheckCircle className="w-5 h-5" />
                <span>Payment now</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
