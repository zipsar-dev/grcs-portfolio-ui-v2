// components/CheckoutPage.tsx
import React from "react";
import {
  User,
  MapPin,
  Phone,
  Mail,
  CreditCard,
  CheckCircle,
} from "lucide-react";

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
}

const CheckoutPage: React.FC<CheckoutPageProps> = ({
  cart,
  customerInfo,
  handleCustomerInfoChange,
  getCartTotal,
  handleCheckout,
  setPaymentMethod,
  paymentMethod,
}) => {
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
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-600">Shipping</span>
                <span className="font-semibold text-green-600">Free</span>
              </div>
              <div className="flex justify-between items-center text-lg font-bold">
                <span>Total</span>
                <span className="text-[#39b54b]">
                  ₹{getCartTotal().toFixed(2)}
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
                value="cod"
                checked={paymentMethod === "cod"}
                onChange={() => setPaymentMethod("Cash on Delivery")}
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
                value="online"
                checked={paymentMethod === "online"}
                onChange={() => setPaymentMethod("Online Payment")}
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
              onClick={handleCheckout}
              disabled={
              !customerInfo.name ||
              !customerInfo.email ||
              !customerInfo.phone ||
              !customerInfo.address
              }
              className={`w-full py-4 rounded-xl font-semibold text-lg transition-all duration-300 flex items-center justify-center space-x-2 ${
              customerInfo.name &&
              customerInfo.email &&
              customerInfo.phone &&
              customerInfo.address
                ? "bg-gradient-to-r from-[#39b54b] to-[#2da03e] text-white hover:shadow-lg"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            >
              <CheckCircle className="w-5 h-5" />
              <span>Place Order</span>
            </button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
