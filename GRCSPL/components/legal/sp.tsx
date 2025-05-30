"use client";
import React, { useState } from 'react';

interface ExpandedSections {
  [key: string]: boolean;
}

import { 
  Truck, 
  Package, 
  MapPin, 
  Clock, 
  CreditCard, 
  Search, 
  AlertTriangle, 
  Shield, 
  XCircle, 
  Phone, 
  Mail, 
  ChevronDown, 
  ChevronUp,
  CheckCircle,
  Calendar,
  Settings,
  Globe,
  Eye,
  FileText,
  DollarSign,
  Timer,
  Ban
} from 'lucide-react';

const ShippingPolicy = () => {
  const [expandedSections, setExpandedSections] = useState<ExpandedSections>({});
  const [acknowledgedPolicy, setAcknowledgedPolicy] = useState(false);

  const toggleSection = (sectionId: string): void => {
    setExpandedSections((prev: ExpandedSections) => ({
        ...prev,
        [sectionId]: !prev[sectionId]
    }));
};

  const shippingData = [
    {
      id: 'methods',
      title: 'Shipping Methods',
      icon: Truck,
      content: [
        'We partner with reputable and trustworthy courier services including Blue Dart, Delhivery, DTDC, ST, A1 and India Post.',
        'Shipping method is chosen based on product nature, size, weight, and destination.',
        'For remote or less accessible regions, we may use India Post to ensure serviceability.'
      ],
      highlight: true
    },
    {
      id: 'charges',
      title: 'Shipping Charges',
      icon: DollarSign,
      content: [
        'Shipping charges are calculated based on weight and dimensions of products.',
        'Delivery method (Standard or Express) affects pricing.',
        'Destination address is considered in cost calculation.',
        'Promotional offers may include free shipping on orders above certain amounts.',
        'Applicable shipping fees are displayed during checkout before payment confirmation.'
      ]
    },
    {
      id: 'delivery-time',
      title: 'Estimated Delivery Time',
      icon: Timer,
      content: [
        'Standard Delivery: 5–7 business days (excluding weekends and holidays)',
        'Express Delivery: 3–4 business days for eligible locations and products',
        'Delivery timelines may vary due to product availability, location, and unforeseen courier delays.'
      ]
    },
    {
      id: 'processing',
      title: 'Order Processing Time',
      icon: Settings,
      content: [
        'Orders are typically processed and dispatched within 1–2 business days after payment confirmation.',
        'Email/SMS notification sent once your order is shipped.',
        'You can check order status in your GRCSPL User dashboard.'
      ]
    },
    {
      id: 'tracking',
      title: 'Order Tracking',
      icon: Search,
      content: [
        'Tracking number and link sent to your registered email and mobile number.',
        'Track your package directly on our website under "My Orders".',
        'Alternative tracking available via courier\'s official tracking portal.'
      ]
    },
    {
      id: 'restrictions',
      title: 'Shipping Restrictions',
      icon: Ban,
      content: [
        'Currently, we only ship within India.',
        'No deliveries to PO Boxes, APO/FPO addresses, or military zones.',
        'Deliveries may not be available in certain pin codes.',
        'Pin code availability can be checked at checkout.'
      ]
    },
    {
      id: 'delivery-issues',
      title: 'Delivery Issues & Damaged Goods',
      icon: AlertTriangle,
      content: [
        'Notify customer support within 48 hours for damaged, lost, or incorrect items.',
        'Images or unboxing videos may be requested for investigation.',
        'Our support team will process your complaint promptly.'
      ]
    },
    {
      id: 'delays',
      title: 'Delayed or Failed Deliveries',
      icon: Clock,
      content: [
        'Delays may occur due to natural disasters, national holidays, or strikes.',
        'Courier service disruptions or government restrictions may cause delays.',
        'We request your patience and assure you of our support in rare delay cases.'
      ]
    },
    {
      id: 'cancellations',
      title: 'Order Cancellations',
      icon: XCircle,
      content: [
        'Contact us within 24 hours of placing order or before dispatch.',
        'Send cancellation requests to shop@grcspl.com.',
        'Once dispatched, orders cannot be canceled - wait for delivery then request return.',
        'Refunds for canceled orders processed as per our Refund Policy.'
      ]
    }
  ];

  const courierPartners = [
    'Blue Dart', 'Delhivery', 'DTDC', 'ST', 'A1', 'India Post'
  ];

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-400 to-green-600 rounded-full mb-6 shadow-lg">
            <Package className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Shipping Policy
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Thank you for shopping with us. We're committed to providing a smooth and satisfying shopping experience.
          </p>
        </div>

        {/* Company Introduction */}
        <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-2xl shadow-lg p-8 mb-8 border border-green-200">
          <div className="flex items-start space-x-6">
            <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center flex-shrink-0 shadow-md">
              <Shield className="w-8 h-8" style={{ color: '#39b54b' }} />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                Geeaar Consumer Solution Private Limited
              </h3>
              <p className="text-gray-700 mb-4 leading-relaxed">
                We are committed to providing excellent service with secure and timely delivery of your orders 
                through our trusted courier partners across India.
              </p>
              <div className="flex flex-wrap gap-2">
                {courierPartners.map((partner, index) => (
                  <span 
                    key={index}
                    className="px-3 py-1 bg-white rounded-full text-sm font-medium text-gray-700 shadow-sm border border-green-100"
                  >
                    {partner}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Delivery Options Cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Truck className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h4 className="text-lg font-semibold text-gray-900">Standard Delivery</h4>
                <p className="text-sm text-gray-500">Most economical option</p>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Delivery Time:</span>
                <span className="font-medium text-gray-900">5-7 business days</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Excludes:</span>
                <span className="text-sm text-gray-700">Weekends & holidays</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border border-green-200 relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-gradient-to-l from-green-500 to-green-400 text-white px-3 py-1 text-xs font-medium rounded-bl-lg">
              FAST
            </div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Timer className="w-6 h-6" style={{ color: '#39b54b' }} />
              </div>
              <div>
                <h4 className="text-lg font-semibold text-gray-900">Express Delivery</h4>
                <p className="text-sm text-gray-500">For eligible locations</p>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Delivery Time:</span>
                <span className="font-medium" style={{ color: '#39b54b' }}>3-4 business days</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Availability:</span>
                <span className="text-sm text-gray-700">Select locations</span>
              </div>
            </div>
          </div>
        </div>

        {/* Important Notice */}
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 mb-8">
          <div className="flex items-start space-x-3">
            <AlertTriangle className="w-6 h-6 text-amber-600 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold text-amber-800 mb-2">Delivery Timeline Notice</h4>
              <p className="text-amber-700 text-sm leading-relaxed mb-2">
                Delivery timelines are estimates and may vary due to:
              </p>
              <ul className="text-amber-700 text-sm space-y-1">
                <li>• Product availability and processing time</li>
                <li>• Delivery location (urban vs. rural areas)</li>
                <li>• Unforeseen delays by courier (weather, strikes, restrictions)</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Shipping Sections */}
        <div className="space-y-4 mb-8">
          {shippingData.map((section, index) => {
            const Icon = section.icon;
            const isExpanded = expandedSections[section.id];
            
            return (
              <div 
                key={section.id} 
                className={`bg-white rounded-xl shadow-md border overflow-hidden transition-all duration-300 hover:shadow-lg ${
                  section.highlight ? 'border-green-200 bg-gradient-to-r from-green-50 to-white' : 'border-gray-100'
                }`}
              >
                <button
                  onClick={() => toggleSection(section.id)}
                  className="w-full p-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors duration-200"
                >
                  <div className="flex items-center space-x-4">
                    <div 
                      className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                        section.highlight ? 'bg-white shadow-md' : ''
                      }`} 
                      style={{ backgroundColor: section.highlight ? 'white' : '#39b54b15' }}
                    >
                      <Icon className="w-6 h-6" style={{ color: '#39b54b' }} />
                    </div>
                    <div>
                      <h3 className={`text-lg font-semibold ${section.highlight ? 'text-green-900' : 'text-gray-900'}`}>
                        {index + 1}. {section.title}
                      </h3>
                      <p className="text-sm text-gray-500 mt-1">
                        Click to {isExpanded ? 'collapse' : 'expand'} details
                      </p>
                    </div>
                  </div>
                  {isExpanded ? (
                    <ChevronUp className="w-5 h-5 text-gray-400" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                  )}
                </button>
                
                {isExpanded && (
                  <div className={`px-6 pb-6 border-t ${section.highlight ? 'border-green-100 bg-green-25' : 'border-gray-100 bg-gray-50'}`}>
                    <div className="pt-4">
                      <ul className="space-y-3">
                        {section.content.map((item, idx) => (
                          <li key={idx} className="flex items-start space-x-3">
                            <div className="w-2 h-2 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: '#39b54b' }}></div>
                            <span className="text-gray-700 text-sm leading-relaxed">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Customer Support Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8 border border-gray-100">
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-xl mb-4">
              <Phone className="w-6 h-6" style={{ color: '#39b54b' }} />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Customer Support</h3>
            <p className="text-gray-600">For any shipping-related questions or issues, contact our support team</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-gray-50 rounded-xl">
              <Mail className="w-8 h-8 mx-auto mb-3" style={{ color: '#39b54b' }} />
              <h4 className="font-semibold text-gray-900 mb-2">Email Support</h4>
              <p className="text-sm text-gray-600 mb-1">General Support:</p>
              <p className="text-sm font-medium text-gray-900">support@grcspl.com</p>
              <p className="text-sm text-gray-600 mb-1 mt-2">Order Cancellation:</p>
              <p className="text-sm font-medium text-gray-900">shop@grcspl.com</p>
            </div>
            
            <div className="text-center p-4 bg-gray-50 rounded-xl">
              <Phone className="w-8 h-8 mx-auto mb-3" style={{ color: '#39b54b' }} />
              <h4 className="font-semibold text-gray-900 mb-2">Phone Support</h4>
              <p className="text-sm text-gray-600 mb-1">Call us at:</p>
              <p className="text-lg font-semibold text-gray-900">+91 4224 350058</p>
            </div>
            
            <div className="text-center p-4 bg-gray-50 rounded-xl">
              <Calendar className="w-8 h-8 mx-auto mb-3" style={{ color: '#39b54b' }} />
              <h4 className="font-semibold text-gray-900 mb-2">Working Hours</h4>
              <p className="text-sm text-gray-600 mb-1">Monday to Saturday</p>
              <p className="text-sm font-medium text-gray-900">10 AM – 6 PM IST</p>
            </div>
          </div>
        </div>

        {/* Policy Acknowledgment */}
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
          <div className="flex items-start space-x-4 mb-6">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
              <FileText className="w-6 h-6" style={{ color: '#39b54b' }} />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Shipping Policy Acknowledgment
              </h3>
              <p className="text-gray-600">
                By placing an order, you acknowledge that you have read and understood our shipping policy 
                and agree to the terms and conditions outlined above.
              </p>
            </div>
          </div>
          
        </div>

        {/* Footer */}
        <div className="text-center mt-12 p-6 bg-white rounded-xl shadow-md border border-gray-100">
          <div className="flex items-center justify-center space-x-2 mb-3">
            <Eye className="w-5 h-5 text-gray-400" />
            <span className="text-sm text-gray-500">Shipping policy regularly updated for better service</span>
          </div>
          <p className="text-sm text-gray-600">
            For the most current shipping information, please check our website or contact customer support.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ShippingPolicy;