import React, { useEffect, useState } from "react";
import { CheckCircle, CreditCard, Package, Truck } from "lucide-react";
import { sendmail } from "@/components/api/mail";
// Add a console log to track the module import
console.log("Mail module imported");

// Toast component for notifications
const Toast = ({
  message,
  show,
  onClose,
}: {
  message: string;
  show: boolean;
  onClose: () => void;
}) => {
  if (!show) return null;

  return (
    <div className="fixed top-4 right-4 bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded shadow-md z-50 animate-fade-in">
      <div className="flex items-center">
        <CheckCircle className="w-5 h-5 mr-2" />
        <p>{message}</p>
      </div>
    </div>
  );
};

interface Product {
  name: string;
  category: string;
  src: string;
  code: string;
  mrp: number;
  discountPrice: number;
  businessValue: number;
  weight?: number;
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
  transactionId?: string;
  transportCharge?: number;
}

const SuccessPage: React.FC<SuccessPageProps> = ({
  cart,
  customerInfo,
  getCartTotal,
  setCurrentPage,
  paymentMethod,
  transactionId,
  transportCharge,
}) => {
  // Generate invoice ID
  const now = new Date();
  const dateStr = `${now.getFullYear()}${String(now.getMonth() + 1).padStart(
    2,
    "0"
  )}${String(now.getDate()).padStart(2, "0")}`;
  const randomDigits = Math.floor(Math.random() * 1000)
    .toString()
    .padStart(3, "0");
  const invoiceId = `INV-${dateStr}-${randomDigits}`;

  const orderId = Date.now().toString().slice(-6);
  const [subtotal, setSubtotal] = useState(0);
  const [totalWeight, setTotalWeight] = useState(0);
  const [transportCharges, setTransportCharges] = useState(
    transportCharge || 0
  );
  const [finalTotal, setFinalTotal] = useState(0);
  const [showToast, setShowToast] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  useEffect(() => {
    // Calculate weight and prices when component mounts
    if (cart && cart.length > 0) {
      const cartSubtotal = getCartTotal();
      const weight = cart.reduce(
        (total, item) => total + (item.product.weight || 0) * item.quantity,
        0
      );

      const transport = transportCharge || 0;

      setSubtotal(cartSubtotal);
      setTotalWeight(weight);
      setTransportCharges(transport);
      setFinalTotal(cartSubtotal + transport);
    } else {
      setSubtotal(0);
      setFinalTotal(0);
    }
  }, [cart, getCartTotal, transportCharge]); // Send email with a 1 second delay
  useEffect(() => {
    
    if (
      !emailSent &&
      customerInfo &&
      customerInfo.email &&
      cart &&
      cart.length > 0
    ) {

      const timer = setTimeout(() => {

        try {
          sendInvoiceEmail();
        } catch (error) {
          console.error("Error when trying to send invoice email:", error);
        }
      }, 1000);

      return () => {
        clearTimeout(timer);
      };
    } 
  }, [cart, customerInfo, emailSent]);

 
  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => {
        setShowToast(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [showToast]);
  
  // Function to send invoice email
  const sendInvoiceEmail = async () => {
    try {
      // Calculate values synchronously for email
      const cartSubtotal = cart && cart.length > 0
        ? cart.reduce((sum, item) => sum + item.product.discountPrice * item.quantity, 0)
        : 0;
      const transport = typeof transportCharge === "number" ? transportCharge : 0;
      const total = cartSubtotal + transport;

      // Create HTML email content
      const emailContent = `
        <div style="padding:24px;max-width:600px;margin:auto;font-family:sans-serif;background:#f9fafb;">
          <div style="text-align:center;padding:32px 0;">
            <div style="width:80px;height:80px;background:#d1fae5;border-radius:50%;display:flex;align-items:center;justify-content:center;margin:auto;margin-bottom:24px;">
              <img src="https://cdn-icons-png.flaticon.com/512/845/845646.png" alt="Success" style="width:48px;height:48px;" />
            </div>
            <h1 style="font-size:28px;font-weight:bold;color:#111827;margin-bottom:16px;">Order Placed Successfully!</h1>
            <p style="font-size:18px;color:#6b7280;margin-bottom:32px;">Thank you for your purchase. Your order has been confirmed.</p>
          </div>
          <div style="background:#fff;border-radius:16px;box-shadow:0 2px 8px rgba(0,0,0,0.04);border:1px solid #e5e7eb;padding:24px;margin-bottom:32px;">
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;text-align:left;background:#f3f4f6;padding:16px;border-radius:12px;margin-bottom:24px;">
              <div>
                <p style="font-size:13px;color:#6b7280;font-weight:500;margin:0;">Order ID</p>
                <p style="font-weight:600;color:#111827;margin:0;">#ORD${orderId}</p>
              </div>
              <div>
                <p style="font-size:13px;color:#6b7280;font-weight:500;margin:0;">Invoice ID</p>
                <p style="font-weight:600;color:#111827;margin:0;">${invoiceId}</p>
              </div>
              <div>
                <p style="font-size:13px;color:#6b7280;font-weight:500;margin:0;">Date</p>
                <p style="font-weight:600;color:#111827;margin:0;">${now.toLocaleString()}</p>
              </div>
              <div>
                <p style="font-size:13px;color:#6b7280;font-weight:500;margin:0;">Payment Method</p>
                <p style="font-weight:600;color:#111827;margin:0;">${paymentMethod}</p>
              </div>
              ${
                transactionId
                  ? `<div>
                      <p style="font-size:13px;color:#6b7280;font-weight:500;margin:0;">Transaction ID</p>
                      <p style="font-weight:600;color:#111827;margin:0;">${transactionId}</p>
                    </div>`
                  : ""
              }
              <div>
                <p style="font-size:13px;color:#6b7280;font-weight:500;margin:0;">Status</p>
                <p style="font-weight:600;color:#22c55e;margin:0;">
                  ${
                    paymentMethod === "Online Payment" && transactionId
                      ? "Payment Successful, Order Confirmed"
                      : "Order Confirmed"
                  }
                </p>
              </div>
            </div>
            <div style="border-top:1px solid #e5e7eb;padding-top:24px;margin-top:16px;">
              <h3 style="font-size:18px;font-weight:600;color:#111827;margin-bottom:16px;">Customer Information</h3>
              <div style="background:#eff6ff;padding:16px;border-radius:12px;">
                <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;">
                  <div>
                    <p style="font-size:13px;color:#6b7280;margin:0;">Name</p>
                    <p style="font-weight:600;color:#111827;margin:0;">${
                      customerInfo.name
                    }</p>
                  </div>
                  <div>
                    <p style="font-size:13px;color:#6b7280;margin:0;">Email</p>
                    <p style="font-weight:600;color:#111827;margin:0;">${
                      customerInfo.email
                    }</p>
                  </div>
                  <div>
                    <p style="font-size:13px;color:#6b7280;margin:0;">Phone</p>
                    <p style="font-weight:600;color:#111827;margin:0;">${
                      customerInfo.phone
                    }</p>
                  </div>
                  <div>
                    <p style="font-size:13px;color:#6b7280;margin:0;">Shipping Address</p>
                    <p style="font-weight:600;color:#111827;margin:0;">${
                      customerInfo.address
                    }, ${customerInfo.city}, ${customerInfo.pincode}</p>
                  </div>
                </div>
              </div>
            </div>
            <div style="border-top:1px solid #e5e7eb;padding-top:24px;margin-top:24px;">
              <h3 style="font-size:18px;font-weight:600;color:#111827;margin-bottom:16px;">Order Items</h3>
              <table style="width:100%;border-collapse:collapse;">
                <thead>
                  <tr style="background:#f3f4f6;">
                    <th style="padding:12px 8px;text-align:left;font-size:12px;color:#6b7280;font-weight:500;">Product</th>
                    <th style="padding:12px 8px;text-align:center;font-size:12px;color:#6b7280;font-weight:500;">Price</th>
                    <th style="padding:12px 8px;text-align:center;font-size:12px;color:#6b7280;font-weight:500;">Quantity</th>
                    <th style="padding:12px 8px;text-align:right;font-size:12px;color:#6b7280;font-weight:500;">Total</th>
                  </tr>
                </thead>
                <tbody>
                  ${cart
                    .map(
                      (item) => `
                    <tr>
                      <td style="padding:12px 8px;vertical-align:top;">
                        <div style="display:flex;align-items:center;">
                          <div>
                            <div style="font-weight:500;color:#111827;">${
                              item.product.name
                            }</div>
                            <div style="font-size:13px;color:#6b7280;">${
                              item.product.category
                            }</div>
                          </div>
                        </div>
                      </td>
                      <td style="padding:12px 8px;text-align:center;">₹${item.product.discountPrice.toFixed(
                        2
                      )}</td>
                      <td style="padding:12px 8px;text-align:center;">${
                        item.quantity
                      }</td>
                      <td style="padding:12px 8px;text-align:right;font-weight:500;">₹${(
                        item.product.discountPrice * item.quantity
                      ).toFixed(2)}</td>
                    </tr>
                  `
                    )
                    .join("")}
                </tbody>
              </table>
            </div>
            <div style="border-top:1px solid #e5e7eb;padding-top:24px;margin-top:24px;">
              <div style="background:#f3f4f6;border-radius:12px;padding:16px;">
                <div style="display:flex;justify-content:space-between;margin-bottom:8px;">
                  <span style="color:#6b7280;">Subtotal</span>
                  <span style="font-weight:500;">${cartSubtotal.toFixed(2)}</span>
                </div>
                <div style="display:flex;justify-content:space-between;margin-bottom:8px;">
                  <span style="color:#6b7280;">Transport Charges</span>
                  <span style="font-weight:500;">${transport.toFixed(2)}</span>
                </div>
                <div style="border-top:1px solid #e5e7eb;padding-top:8px;margin-top:8px;display:flex;justify-content:space-between;align-items:center;">
                  <span style="font-size:18px;font-weight:bold;color:#111827;">Total</span>
                  <span style="font-size:20px;font-weight:bold;color:#39b54b;">${total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
          <div style="text-align:center;margin-top:32px;">
            <p style="color:#6b7280;font-size:14px;">If you have any questions, reply to this email or contact our support team.</p>
            <p style="color:#6b7280;font-size:14px;margin-top:8px;">Thank you for shopping with us!</p>
          </div>
        </div>
      `;
      
      const emailData = {
        email: customerInfo.email,
        subject: "Your Order Confirmation",
        html: emailContent,
      };
      // Send email using the API
      await sendmail(emailData);   
      setEmailSent(true);
      setShowToast(true);
    } catch (error) {
      // console.error("Failed to send invoice email:", error);
      // console.error("Error type:", typeof error);
      // console.error(
      //   "Customer info at time of error:",
      //   JSON.stringify(customerInfo, null, 2)
      // );

      // Try again with a hardcoded email if available
      try {
        if (customerInfo && customerInfo.email) {
          console.log("Trying to send to hardcoded email as fallback");
          await sendmail({
            email: customerInfo.email,
            subject: "Your Order Confirmation (Retry)",
            html: "<p>Order confirmation - please check your account for details.</p>",
          });
          setEmailSent(true);
          setShowToast(true);
        }
      } catch (retryError) {
        console.error("Retry also failed:", retryError);
      }
    }
  };

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
      {/* Toast notification */}
      <Toast
        message={`Invoice sent to ${customerInfo?.email}`}
        show={showToast}
        onClose={() => setShowToast(false)}
      />

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
              <p className="text-sm text-gray-500 font-medium">Invoice ID</p>
              <p className="font-semibold text-gray-900">{invoiceId}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">Date</p>
              <p className="font-semibold text-gray-900">
                {new Date().toLocaleString()}
              </p>
            </div>{" "}
            <div>
              <p className="text-sm text-gray-500 font-medium">
                Payment Method
              </p>
              <p className="font-semibold text-gray-900 flex items-center">
                <CreditCard className="w-4 h-4 mr-1 text-[#39b54b]" />
                {paymentMethod}
              </p>
            </div>
            {transactionId && (
              <div>
                <p className="text-sm text-gray-500 font-medium">
                  Transaction ID
                </p>
                <p className="font-semibold text-gray-900">{transactionId}</p>
              </div>
            )}
            {transactionId && (
              <div>
                <p className="text-sm text-gray-500 font-medium">
                  Transaction ID
                </p>
                <p className="font-semibold text-gray-900">{transactionId}</p>
              </div>
            )}
            <div>
              <p className="text-sm text-gray-500 font-medium">Status</p>
              <p className="font-semibold text-green-600">
                {paymentMethod === "Online Payment" && transactionId
                  ? "Payment Successful, Order Confirmed"
                  : "Order Confirmed"}
              </p>
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
                    {/* <th
                      scope="col"
                      className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase"
                    >
                      Weight
                    </th> */}
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
                      {/* <td className="px-6 py-4 whitespace-nowrap text-center">
                        {(item.product.weight || 0) * item.quantity}g
                      </td> */}
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
                  <span className="font-medium">₹{subtotal.toFixed(2)}</span>
                </div>
                {/* <div className="flex justify-between">
                  <div className="flex items-center">
                    <Package className="w-4 h-4 mr-2 text-gray-500" />
                    <span className="text-gray-600">Total Weight</span>
                  </div>
                  <span className="font-medium">{totalWeight}g</span>
                </div> */}
                <div className="flex justify-between">
                  <div className="flex items-center">
                    <Truck className="w-4 h-4 mr-2 text-gray-500" />
                    <span className="text-gray-600">Transport Charges</span>
                  </div>
                  <span className="font-medium">
                    ₹{transportCharges.toFixed(2)}
                  </span>
                </div>
                <div className="border-t border-gray-200 pt-2 mt-2">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-gray-900">
                      Total
                    </span>
                    <span className="text-xl font-bold text-[#39b54b]">
                      ₹{finalTotal.toFixed(2)}
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
