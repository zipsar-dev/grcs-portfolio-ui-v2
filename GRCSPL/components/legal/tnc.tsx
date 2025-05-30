"use client";
import React, { useState } from 'react';
import { 
  Shield, 
  FileText, 
  Users, 
  Home, 
  CreditCard, 
  RefreshCw, 
  Copyright, 
  Lock, 
  AlertTriangle, 
  Scale, 
  Edit, 
  Mail, 
  ChevronDown, 
  ChevronUp,
  CheckCircle,
  Eye,
  Globe
} from 'lucide-react';

const TermsAndConditions = () => {
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});
  const [acceptedTerms, setAcceptedTerms] = useState(false);

interface ExpandedSections {
    [key: string]: boolean;
}

const toggleSection = (sectionId: string): void => {
    setExpandedSections((prev: ExpandedSections) => ({
        ...prev,
        [sectionId]: !prev[sectionId]
    }));
};

  const termsData = [
    {
      id: 'acceptance',
      title: 'Acceptance of Terms',
      icon: Shield,
      content: 'By accessing or using the services provided by Geeaar Consumer Solution Private Limited (hereinafter referred to as "the Company"), you agree to be bound by these Terms and Conditions. If you do not agree to these terms, please do not use our services.'
    },
    {
      id: 'definitions',
      title: 'Definitions',
      icon: FileText,
      content: [
        '"Services" refers to all daily use products direct selling-related services provided by the Company, including but not limited to product listings, buying, selling, and management.',
        '"User" or "You" refers to any individual or entity accessing or using the Company\'s services.',
        '"Products" refers to any daily use products listed, managed, or transacted through the Company.'
      ]
    },
    {
      id: 'services',
      title: 'Our Services',
      icon: Globe,
      content: 'The Company provides daily use products direct selling services as described on our website and in our marketing materials. The Company reserves the right to modify, suspend, or discontinue any part of its services at any time without prior notice.'
    },
    {
      id: 'obligations',
      title: 'User Obligations',
      icon: Users,
      content: [
        'You agree to provide accurate, current, and complete information when using our services.',
        'You are responsible for maintaining the confidentiality of your account information and password.',
        'You agree not to use the services for any illegal or unauthorized purpose.'
      ]
    },
    {
      id: 'listings',
      title: 'Product Listings',
      icon: Home,
      content: [
        'The Company strives to ensure the accuracy of all product listings but does not guarantee the availability, condition, or exact details of any product.',
        'Users are encouraged to verify all information independently before making any decisions based on product listings.'
      ]
    },
    {
      id: 'payments',
      title: 'Fees and Payments',
      icon: CreditCard,
      content: [
        'The Company\'s fee structure is as outlined in our current pricing schedule, which may be updated from time to time.',
        'All fees are due and payable as specified in individual service agreements or at the time of service provision.',
        'Late payments may incur additional charges as specified in the service agreement.'
      ]
    },
    {
      id: 'refunds',
      title: 'Refund Policy',
      icon: RefreshCw,
      content: [
        'Refunds, if applicable, will be issued in accordance with the specific service agreement and applicable laws.',
        'The Company reserves the right to refuse refunds for services already rendered or in cases of breach of these Terms and Conditions.'
      ]
    },
    {
      id: 'intellectual',
      title: 'Intellectual Property',
      icon: Copyright,
      content: [
        'All content on the Company\'s website and marketing materials, including text, graphics, logos, and images, is the property of the Company and protected by copyright laws.',
        'Users may not reproduce, distribute, or use any content without the express written permission of the Company.'
      ]
    },
    {
      id: 'privacy',
      title: 'Privacy Policy',
      icon: Lock,
      content: 'The Company collects and uses personal information as outlined in our Privacy Policy, which is incorporated by reference into these Terms and Conditions.'
    },
    {
      id: 'liability',
      title: 'Limitation of Liability',
      icon: AlertTriangle,
      content: [
        'The Company shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from the use or inability to use our services.',
        'The Company\'s total liability for any claim arising from the use of our services shall not exceed the amount paid by the user for the specific service in question.'
      ]
    },
    {
      id: 'governing',
      title: 'Governing Law',
      icon: Scale,
      content: 'These Terms and Conditions shall be governed by and construed in accordance with applicable laws. Any disputes arising from these terms shall be subject to the exclusive jurisdiction of the appropriate courts.'
    },
    {
      id: 'modifications',
      title: 'Modifications',
      icon: Edit,
      content: 'The Company reserves the right to modify these Terms and Conditions at any time. Users will be notified of any significant changes, and continued use of our services after such modifications constitutes acceptance of the updated terms.'
    }
  ];

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-400 to-green-600 rounded-full mb-6 shadow-lg">
            <FileText className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Terms & Conditions
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Please read these terms carefully before using our services. Last updated on July 20, 2024.
          </p>
        </div>

        {/* Company Info Card */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-gray-100">
          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
              <Shield className="w-6 h-6" style={{ color: '#39b54b' }} />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Geeaar Consumer Solution Private Limited
              </h3>
              <p className="text-gray-600 mb-4">
                We provide daily use products through direct selling services, committed to transparency and customer satisfaction.
              </p>
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <Mail className="w-4 h-4" />
                <span>admin@grcsolutions.in</span>
              </div>
            </div>
          </div>
        </div>

        {/* Terms Sections */}
        <div className="space-y-4 mb-8">
          {termsData.map((section, index) => {
            const Icon = section.icon;
            const isExpanded = expandedSections[section.id];
            
            return (
              <div key={section.id} className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-lg">
                <button
                  onClick={() => toggleSection(section.id)}
                  className="w-full p-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors duration-200"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#39b54b15' }}>
                      <Icon className="w-6 h-6" style={{ color: '#39b54b' }} />
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
                  {isExpanded ? (
                    <ChevronUp className="w-5 h-5 text-gray-400" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                  )}
                </button>
                
                {isExpanded && (
                  <div className="px-6 pb-6 border-t border-gray-100 bg-gray-50">
                    <div className="pt-4">
                      {Array.isArray(section.content) ? (
                        <ul className="space-y-3">
                          {section.content.map((item, idx) => (
                            <li key={idx} className="flex items-start space-x-3">
                              <div className="w-2 h-2 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: '#39b54b' }}></div>
                              <span className="text-gray-700 text-sm leading-relaxed">{item}</span>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-gray-700 text-sm leading-relaxed">{section.content}</p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Acceptance Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
          <div className="flex items-start space-x-4 mb-6">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
              <CheckCircle className="w-6 h-6" style={{ color: '#39b54b' }} />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Agreement Acknowledgment
              </h3>
              <p className="text-gray-600">
                By using our services, you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions.
              </p>
            </div>
          </div>
          
          {/* <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-xl">
            <input
              type="checkbox"
              id="acceptTerms"
              checked={acceptedTerms}
              onChange={(e) => setAcceptedTerms(e.target.checked)}
              className="w-5 h-5 rounded border-2 border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent"
              style={{ accentColor: '#39b54b' }}
            />
            <label htmlFor="acceptTerms" className="text-sm text-gray-700 cursor-pointer">
              I have read and agree to the Terms and Conditions
            </label>
          </div> */}
        </div>

        {/* Footer */}
        <div className="text-center mt-12 p-6 bg-white rounded-xl shadow-md border border-gray-100">
          <div className="flex items-center justify-center space-x-2 mb-3">
            <Eye className="w-5 h-5 text-gray-400" />
            <span className="text-sm text-gray-500">Last updated: July 20, 2024</span>
          </div>
          <p className="text-sm text-gray-600">
            For questions about these terms, contact us at{' '}
            <a href="mailto:admin@grcsolutions.in" className="font-medium hover:underline" style={{ color: '#39b54b' }}>
              admin@grcsolutions.in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;