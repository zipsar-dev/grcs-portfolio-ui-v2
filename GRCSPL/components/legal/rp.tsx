"use client";

import React, { useState } from 'react';
import {
  CheckCircle,
  XCircle,
  AlertTriangle,
  Shield,
  Mail,
  DollarSign,
  RotateCcw,
  Truck,
  PackageCheck,
  Timer,
  FileText,
  Eye
} from 'lucide-react';

const RefundPolicy = () => {
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});

const toggleSection = (sectionId: string): void => {
    setExpandedSections((prev: Record<string, boolean>) => ({
        ...prev,
        [sectionId]: !prev[sectionId]
    }));
};

  const refundData = [
    {
      id: 'cancellations',
      title: 'Order Cancellations',
      icon: XCircle,
      content: [
        'Customers can cancel their orders within 24 hours of placing the order or before dispatching the order by emailing office@grcspl.com with their order ID. A full refund will be issued to the customer\'s original payment method.',
        'Orders cannot be cancelled once the item has been shipped.'
      ]
    },
    {
      id: 'returns',
      title: 'Return / Replacement Policy',
      icon: Truck,
      content: [
        'In the unlikely event that the customer receives a defective or damaged product, they can request a replacement within 3 days of delivery by emailing office@grcspl.com with their order ID and a description and photo of the issue.',
        'The replacement will be provided for the same product, subject to availability.',
        'Refund will be initiated in 3–5 business days and Returned in 5–7 Business days after the return request is approved.',
        'Original packaging, tags, and price tags must be intact. Returns will not be accepted if packaging elements are damaged.',
        'If the product is out of stock, the customer can receive a full refund or choose an alternative of equal value.',
        'Return policy applies only to defective or damaged products upon delivery, not for damages due to customer mishandling.',
        'We do not offer reverse pickup. Customer must ship the product back using a reliable courier at their own cost.'
      ]
    },
    {
      id: 'refunds',
      title: 'Refund Policy',
      icon: DollarSign,
      content: [
        'Refunds begin after product reaches our warehouse and quality checks are complete.',
        'Refund will be credited within 10–15 business days to the original payment method.',
        'Shipping and COD charges are non-refundable.',
        'If delivery is refused or fails due to customer negligence, a restocking fee of up to 20% and shipping charges will be deducted.',
        'Free shipping promotions do not mean zero cost. If order is refused, courier charges will be deducted.',
        'Refunds are issued to the same method used during order placement. Bank or UPI details may be requested in rare cases.',
        'Ensure bank details are accurate. We are not liable for errors in provided account information.',
        'Once you receive a confirmation email, we initiate the refund and follow up with financial institutions.',
        'Contact us in case of delays—we will assist promptly.',
        'We reserve the right to refuse a refund/replacement if policy terms are not followed.'
      ]
    }
  ];

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-400 to-green-600 rounded-full mb-6 shadow-lg">
            <FileText className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Refund & Return Policy</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Please read our refund, return, and cancellation policies carefully to understand your rights and responsibilities.
          </p>
        </div>

        <div className="space-y-4">
          {refundData.map((section, index) => {
            const Icon = section.icon;
            const isExpanded = expandedSections[section.id];

            return (
              <div
                key={section.id}
                className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden"
              >
                <button
                  onClick={() => toggleSection(section.id)}
                  className="w-full p-6 text-left flex items-center justify-between hover:bg-gray-50"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                      <Icon className="w-6 h-6 text-[#39b54b]" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        {index + 1}. {section.title}
                      </h3>
                      <p className="text-sm text-gray-500 mt-1">
                        Click to {isExpanded ? 'collapse' : 'expand'} details
                      </p>
                    </div>
                  </div>
                  <span className="text-gray-400">{isExpanded ? '▲' : '▼'}</span>
                </button>
                {isExpanded && (
                  <div className="px-6 pb-6 text-gray-700 space-y-3">
                    {section.content.map((point, i) => (
                      <div key={i} className="flex items-start space-x-2">
                        <CheckCircle className="w-5 h-5 text-green-500 mt-1" />
                        <p>{point}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
        <br />
      <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
          <div className="flex items-start space-x-4 mb-6">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
              <FileText className="w-6 h-6" style={{ color: '#39b54b' }} />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Refund & Return Policy Acknowledgment
              </h3>
              <p className="text-gray-600">
                By placing an order, you acknowledge that you have read and understood our Refund & Return Policy 
                and agree to the terms and conditions outlined above.
              </p>
            </div>
          </div>
          
        </div>

        {/* Footer */}
        <div className="text-center mt-12 p-6 bg-white rounded-xl shadow-md border border-gray-100">
          <div className="flex items-center justify-center space-x-2 mb-3">
            <Eye className="w-5 h-5 text-gray-400" />
            <span className="text-sm text-gray-500">Refund & Return Policy regularly updated for better service</span>
          </div>
          <p className="text-sm text-gray-600">
            For the most current shipping information, please check our website or contact customer support.
          </p>
        </div>
      </div>
    </div>
  );
};

export default RefundPolicy;