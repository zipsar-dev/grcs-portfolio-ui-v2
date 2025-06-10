import React, { useEffect, useState } from "react";
import { CheckCircle, CreditCard } from "lucide-react";

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

interface SuccessPageProps {
  cart: CartItem[];
  customerInfo: CustomerInfo;
  getCartTotal: () => number;
  setCurrentPage: (page: string) => void;
  paymentMethod: string;
}

const SuccessPage: React.FC<SuccessPageProps> = ({
  cart,
  customerInfo,
  getCartTotal,
  setCurrentPage,
  paymentMethod,
}) => {
  const orderId = Date.now().toString().slice(-6);
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    // Calculate total when component mounts
    const total = getCartTotal();
    setTotalAmount(total);
  }, [getCartTotal]);

  // Verify if data exists
  if (!cart || !customerInfo) {
    return (
      <div className="text-center py-16">
        <p className="text-xl text-gray-600">Loading order details...</p>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6">
      <div className="max-w-4xl mx-auto text-center py-10">
        {/* Success Icon */}
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-10 h-10 text-green-600" />
        </div>

        {/* Title */}
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Order Placed Successfully!
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Thank you for your purchase. Your order has been confirmed.
        </p>

        {/* Order Summary Card */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 mb-8">
          {/* Order Info Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left mb-6 bg-gray-50 p-4 rounded-xl">
            <div>
              <p className="text-sm text-gray-500 font-medium">Order ID</p>
              <p className="font-semibold text-gray-900">{`#ORD${orderId}`}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">Date</p>
              <p className="font-semibold text-gray-900">
                {new Date().toLocaleString()}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">
                Payment Method
              </p>
                <p className="font-semibold text-gray-900 flex items-center">
                <CreditCard className="w-4 h-4 mr-1 text-[#39b54b]" />
                {paymentMethod}
                </p>
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">Status</p>
              <p className="font-semibold text-green-600">Order Confirmed</p>
            </div>
          </div>

          {/* Customer Info Section */}
          <div className="border-t pt-6 mt-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Customer Information
            </h3>
            <div className="bg-blue-50 p-4 rounded-xl space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Name</p>
                  <p className="font-semibold text-gray-900">
                    {customerInfo.name}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="font-semibold text-gray-900 break-all">
                    {customerInfo.email}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Phone</p>
                  <p className="font-semibold text-gray-900">
                    {customerInfo.phone}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Shipping Address</p>
                  <p className="font-semibold text-gray-900">
                    {`${customerInfo.address}, ${customerInfo.city}, ${customerInfo.pincode}`}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Order Items Section */}
          <div className="border-t pt-6 mt-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Order Items
            </h3>
            <div className="overflow-hidden rounded-xl border border-gray-200">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"
                    >
                      Product
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase"
                    >
                      Price
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase"
                    >
                      Quantity
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase"
                    >
                      Total
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {cart.map((item) => (
                    <tr key={item.product.code}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-16 w-16 flex-shrink-0">
                            <img
                              className="h-16 w-16 rounded-md object-cover"
                              src={item.product.src}
                              alt={item.product.name}
                            />
                          </div>
                          <div className="ml-4">
                            <div className="font-medium text-gray-900">
                              {item.product.name}
                            </div>
                            <div className="text-sm text-gray-500">
                              {item.product.category}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        ₹{item.product.discountPrice.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        {item.quantity}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right font-medium">
                        ₹
                        {(item.product.discountPrice * item.quantity).toFixed(
                          2
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Order Summary Section */}
          <div className="border-t pt-6 mt-6">
            <div className="bg-gray-50 rounded-xl p-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">₹{totalAmount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium">Free</span>
                </div>
                <div className="border-t border-gray-200 pt-2 mt-2">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-gray-900">
                      Total
                    </span>
                    <span className="text-xl font-bold text-[#39b54b]">
                      ₹{totalAmount.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-x-4">
          <button
            onClick={() => setCurrentPage("products")}
            className="bg-gradient-to-r from-[#39b54b] to-[#2da03e] text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300"
          >
            Continue Shopping
          </button>
          <button
            onClick={() => window.print()}
            className="border-2 border-[#39b54b] text-[#39b54b] px-6 py-3 rounded-xl font-semibold hover:bg-[#39b54b] hover:text-white transition-all duration-300"
          >
            Print Receipt
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuccessPage;
