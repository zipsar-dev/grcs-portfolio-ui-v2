"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Package,
  Calendar,
  MapPin,
  Phone,
  User,
  CreditCard,
  FileText,
  Clock,
  Truck,
  ShoppingBag,
  CheckCircle,
  Tag,
  AlertCircle,
} from "lucide-react";
import { getorder } from "@/components/api/order";

interface Order {
  _id: string;
  orderId: string;
  items: Array<{
    productName: string;
    price: number;
    quantity: number;
    subtotal: number;
    _id: string;
  }>;
  status: string;
  paymentMethod: string;
  paymentStatus: string;
  transactionId: string;
  invoiceId: string;
  subtotal: number;
  taxAmount: number;
  discountAmount: number;
  shippingCharges: number;
  totalAmount: number;
  notes: string;
  trackingNumber: string;
  estimatedDelivery: string;
  actualDelivery: string | null;
  createdAt: string;
  updatedAt: string;
  customer: {
    name: string;
    email: string;
    phone: string;
    address: {
      street: string;
      city: string;
      state: string;
      zipCode: string;
      country: string;
    };
  };
}

const CheckOrderPage = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    setError("");
    setOrders([]);
    setSearched(false);
    if (!phoneNumber.trim()) return;
    setLoading(true);
    try {
      const res = await getorder(phoneNumber);
      if (
        res &&
        res.success &&
        Array.isArray(res.data) &&
        res.data.length > 0
      ) {
        setOrders(res.data);
      } else {
        setOrders([]);
      }
    } catch (err) {
      setError("Failed to fetch order details. Please try again.");
      setOrders([]);
    }
    setLoading(false);
    setSearched(true);
  };
  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "confirmed":
        return "bg-blue-100 text-blue-800";
      case "shipped":
        return "bg-purple-100 text-purple-800";
      case "delivered":
        return "bg-[#e8f7e8] text-[#39b54b]";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Check Your Orders
          </h1>
          <p className="text-gray-600">
            Enter your phone number to view order details
          </p>
        </motion.div>

        {/* Search Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-xl shadow-lg p-6 mb-8"
        >
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="tel"
                placeholder="Enter your phone number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#39b54b] focus:border-transparent"
              />
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSearch}
              disabled={loading}
              className="px-6 py-3 bg-[#39b54b] text-white rounded-lg hover:bg-[#2e9a3e] flex items-center gap-2 disabled:opacity-50"
            >
              {loading ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                />
              ) : (
                <Search className="w-5 h-5" />
              )}
              Search Orders
            </motion.button>
          </div>
        </motion.div>

        {/* Orders List */}
        <AnimatePresence>
          {searched && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              {error && (
                <div className="bg-red-100 text-red-700 rounded-lg p-4 mb-4 text-center font-medium">
                  {error}
                </div>
              )}
              {orders.length > 0 ? (
                <div className="space-y-6">
                  <h2 className="text-2xl font-semibold text-gray-800">
                    Found {orders.length} order{orders.length > 1 ? "s" : ""}
                  </h2>
                  {orders.map((order, index) => (
                    <motion.div
                      key={order._id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100"
                    >
                      <div className="p-6">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="text-xl font-semibold text-gray-800 mb-1">
                              Order ID: {order.orderId}
                            </h3>
                            <p className="text-gray-600">
                              Invoice: {order.invoiceId}
                            </p>
                          </div>
                          <span
                            className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                              order.status
                            )}`}
                          >
                            {order.status.charAt(0).toUpperCase() +
                              order.status.slice(1)}
                          </span>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-3">
                            <div className="flex items-center gap-3">
                              <User className="w-5 h-5 text-gray-400" />
                              <span className="text-gray-700">
                                {order.customer.name}
                              </span>
                            </div>
                            <div className="flex items-center gap-3">
                              <Phone className="w-5 h-5 text-gray-400" />
                              <span className="text-gray-700">
                                {order.customer.phone}
                              </span>
                            </div>
                            <div className="flex items-center gap-3">
                              <MapPin className="w-5 h-5 text-gray-400" />
                              <span className="text-gray-700">
                                {order.customer.address.street},{" "}
                                {order.customer.address.city},{" "}
                                {order.customer.address.state} -{" "}
                                {order.customer.address.zipCode}
                              </span>
                            </div>
                            <div className="flex items-center gap-3">
                              <Calendar className="w-5 h-5 text-gray-400" />
                              <span className="text-gray-700">
                                Ordered on:{" "}
                                {new Date(order.createdAt).toLocaleDateString()}
                              </span>
                            </div>
                            <div className="flex items-center gap-3">
                              <CreditCard className="w-5 h-5 text-gray-400" />
                              <span className="text-gray-700 font-semibold">
                                ₹{order.totalAmount.toLocaleString()} (
                                {order.paymentMethod.replace(/_/g, " ")})
                              </span>
                            </div>
                          </div>
                          <div className="space-y-3">
                            <div className="font-semibold text-gray-700 mb-2 flex items-center gap-2">
                              <Package className="w-5 h-5 text-gray-400" />
                              Items:
                            </div>
                            <ul className="divide-y divide-gray-100">
                              {order.items.map((item) => (
                                <li
                                  key={item._id}
                                  className="py-2 flex justify-between items-center"
                                >
                                  <span className="text-gray-800">
                                    {item.productName}{" "}
                                    <span className="text-gray-500">
                                      x{item.quantity}
                                    </span>
                                  </span>
                                  <span className="text-gray-700 font-medium">
                                    ₹{item.subtotal.toLocaleString()}
                                  </span>
                                </li>
                              ))}
                            </ul>
                            <div className="flex justify-between text-gray-600 text-sm pt-2">
                              <span>Subtotal:</span>
                              <span>₹{order.subtotal.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between text-gray-600 text-sm">
                              <span>Shipping:</span>
                              <span>
                                ₹{order.shippingCharges.toLocaleString()}
                              </span>
                            </div>
                            {order.discountAmount > 0 && (
                              <div className="flex justify-between text-green-600 text-sm">
                                <span>Discount:</span>
                                <span>
                                  -₹{order.discountAmount.toLocaleString()}
                                </span>
                              </div>
                            )}
                            <div className="flex justify-between text-gray-800 font-semibold text-base border-t border-gray-100 pt-2">
                              <span>Total:</span>
                              <span>₹{order.totalAmount.toLocaleString()}</span>
                            </div>
                            <div className="flex items-center gap-3 mt-2">
                              <span className="text-gray-500 text-xs">
                                Payment:{" "}
                                {order.paymentStatus.charAt(0).toUpperCase() +
                                  order.paymentStatus.slice(1)}
                              </span>
                              {order.trackingNumber && (
                                <span className="text-blue-600 text-xs">
                                  Tracking: {order.trackingNumber}
                                </span>
                              )}
                            </div>
                            <div className="flex items-center gap-3 mt-2">
                              <Clock className="w-4 h-4 text-gray-400" />
                              <span className="text-gray-500 text-xs">
                                Estimated Delivery:{" "}
                                {order.estimatedDelivery
                                  ? new Date(
                                      order.estimatedDelivery
                                    ).toLocaleDateString()
                                  : "-"}
                              </span>
                              {order.actualDelivery && (
                                <span className="text-green-600 text-xs flex items-center gap-1">
                                  <CheckCircle className="w-3 h-3" />
                                  Delivered:{" "}
                                  {new Date(
                                    order.actualDelivery
                                  ).toLocaleDateString()}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                        {order.notes && (
                          <div className="mt-4 bg-yellow-50 text-yellow-800 rounded-lg p-3 text-sm flex items-center gap-2">
                            <AlertCircle className="w-4 h-4" />
                            <span className="font-medium">Notes:</span>{" "}
                            {order.notes}
                          </div>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-white rounded-xl shadow-lg p-8 text-center"
                >
                  <Package className="w-16 h-16 text-[#39b54b] mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    No Orders Found
                  </h3>
                  <p className="text-gray-600">
                    No orders found for this phone number. Please check and try
                    again.
                  </p>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default CheckOrderPage;
