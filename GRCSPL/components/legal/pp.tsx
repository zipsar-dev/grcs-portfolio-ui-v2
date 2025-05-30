"use client";
import React, { useState } from 'react';
import { 
  Shield, 
  Lock, 
  Eye, 
  Users, 
  Database, 
  Share2, 
  UserCheck, 
  Cookie, 
  Mail, 
  ChevronDown, 
  ChevronUp,
  CheckCircle,
  Globe,
  Settings,
  AlertCircle,
  FileText,
  Phone
} from 'lucide-react';

const PrivacyPolicy = () => {
  const [expandedSections, setExpandedSections] = useState<ExpandedSections>({});
  const [acknowledgedPolicy, setAcknowledgedPolicy] = useState(false);

interface ExpandedSections {
    [key: string]: boolean;
}

const toggleSection = (sectionId: string): void => {
    setExpandedSections((prev: ExpandedSections) => ({
        ...prev,
        [sectionId]: !prev[sectionId]
    }));
};

  const privacyData = [
    {
      id: 'introduction',
      title: 'Our Commitment to Privacy',
      icon: Shield,
      content: 'At GRCS, we respect every individual\'s right to privacy. Our relationship with you is our most valuable asset and the foundation of our name and reputation. We understand the importance you place on the privacy and security of information that personally identifies you or your account information.',
      highlight: true
    },
    {
      id: 'information-collection',
      title: 'Information We Collect',
      icon: Database,
      content: [
        'We limit the collection and use of personal information to what is necessary to administer our business and deliver superior service to you.',
        'Personal information refers to data that personally identifies you or your account information.',
        'We may combine information you provide on the web or through other channels to serve you better.'
      ]
    },
    {
      id: 'information-use',
      title: 'How We Use Your Information',
      icon: Settings,
      content: [
        'We use personal information in ways compatible with the purposes for which we originally requested it.',
        'Process your requests and transactions effectively.',
        'Offer you additional information about products and services.',
        'Assess your financial needs and provide tailored solutions.',
        'Advise you about our products, services, and opportunities that may interest you.'
      ]
    },
    {
      id: 'information-sharing',
      title: 'Information Sharing & Protection',
      icon: Share2,
      content: [
        'When we share personal information with an agent or affiliate, we protect that information with a strict confidentiality agreement.',
        'Companies that we hire to provide support services must conform to our privacy standards.',
        'All employees are required to safeguard confidential customer information as specified in their confidentiality agreements.',
        'We may occasionally assist non-affiliated companies in providing services to you, always with strict confidentiality protections.'
      ]
    },
    {
      id: 'disclosure',
      title: 'When We May Disclose Information',
      icon: AlertCircle,
      content: [
        'We reserve the right to disclose personal information in limited circumstances where we believe in good faith that disclosure is required.',
        'To comply with legal requirements and cooperate with regulators or law enforcement.',
        'To protect our rights, property, or the safety of our customers.',
        'All disclosures are made only when legally required or necessary for business protection.'
      ]
    },
    {
      id: 'data-accuracy',
      title: 'Data Accuracy & Updates',
      icon: UserCheck,
      content: [
        'We continually evaluate our efforts to protect personal information.',
        'We make every effort to keep your personal information accurate and up to date.',
        'If you identify any error in your personal information, please contact us immediately.',
        'We will promptly update our records upon notification of any changes or corrections needed.'
      ]
    },
    {
      id: 'cookies',
      title: 'Cookie Policy',
      icon: Cookie,
      content: [
        'To personalize your experience, we may assign your computer browser a unique random number called a "cookie."',
        'Cookies enhance website performance by personalizing your experience and making visits more convenient.',
        'We do not use cookies to collect personal information or read data from your computer.',
        'Third-party companies we hire for web promotions may set cookies, but neither GRCS nor these companies use cookies to collect personal information.'
      ]
    },
    {
      id: 'security',
      title: 'Security Measures',
      icon: Lock,
      content: [
        'Your privacy and security are not compromised when you accept cookies from our website.',
        'We implement strict confidentiality agreements with all partners and affiliates.',
        'Corporate policies require employees to use confidential information only for business purposes.',
        'We continuously evaluate and improve our privacy protection measures.'
      ]
    }
  ];

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-400 to-green-600 rounded-full mb-6 shadow-lg">
            <Lock className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Privacy Policy
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Your privacy matters to us. Learn how we collect, use, and protect your personal information.
          </p>
        </div>

        {/* Company Values Card */}
        <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-2xl shadow-lg p-8 mb-8 border border-green-200">
          <div className="flex items-start space-x-6">
            <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center flex-shrink-0 shadow-md">
              <Shield className="w-8 h-8" style={{ color: '#39b54b' }} />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                GEEAAR Consumer Solutions Private Limited
              </h3>
              <p className="text-gray-700 mb-4 leading-relaxed">
                Under the purview of our business policy, we explicitly uphold accurate and ethical practices. 
                All associates are expected to be resolute in implementing these values and observing the laws.
              </p>
              <div className="flex items-center space-x-4 text-sm">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4" style={{ color: '#39b54b' }} />
                  <span className="text-gray-600">Ethical Practices</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4" style={{ color: '#39b54b' }} />
                  <span className="text-gray-600">Legal Compliance</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4" style={{ color: '#39b54b' }} />
                  <span className="text-gray-600">Data Protection</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Important Notice */}
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 mb-8">
          <div className="flex items-start space-x-3">
            <AlertCircle className="w-6 h-6 text-amber-600 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold text-amber-800 mb-2">Important Notice</h4>
              <p className="text-amber-700 text-sm leading-relaxed">
                We advise reading these policies carefully to avoid misinterpretations. 
                Please check our website regularly for any policy updates or changes.
              </p>
            </div>
          </div>
        </div>

        {/* Privacy Sections */}
        <div className="space-y-4 mb-8">
          {privacyData.map((section, index) => {
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
                        {section.title}
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

        {/* Contact & Rights Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8 border border-gray-100">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <Mail className="w-5 h-5" style={{ color: '#39b54b' }} />
                </div>
                <h4 className="text-lg font-semibold text-gray-900">Your Rights</h4>
              </div>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4" style={{ color: '#39b54b' }} />
                  <span>Access your personal information</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4" style={{ color: '#39b54b' }} />
                  <span>Correct inaccurate data</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4" style={{ color: '#39b54b' }} />
                  <span>Request data updates</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4" style={{ color: '#39b54b' }} />
                  <span>Understand how data is used</span>
                </li>
              </ul>
            </div>
            
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <Phone className="w-5 h-5" style={{ color: '#39b54b' }} />
                </div>
                <h4 className="text-lg font-semibold text-gray-900">Contact Us</h4>
              </div>
              <p className="text-sm text-gray-600 mb-3">
                If you have questions about this privacy policy or need to update your information:
              </p>
              <div className="space-y-2 text-sm">
                <div className="flex items-center space-x-2">
                  <Mail className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-700">Contact our privacy team</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Globe className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-700">Visit our website for updates</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Acceptance Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
          <div className="flex items-start space-x-4 mb-6">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
              <FileText className="w-6 h-6" style={{ color: '#39b54b' }} />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Policy Acknowledgment
              </h3>
              <p className="text-gray-600">
                By using our services, you acknowledge that you have read and understood this Privacy Policy 
                and agree to the collection and use of information as described herein.
              </p>
            </div>
          </div>
          
          {/* <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-xl">
            <input
              type="checkbox"
              id="acknowledgePolicy"
              checked={acknowledgedPolicy}
              onChange={(e) => setAcknowledgedPolicy(e.target.checked)}
              className="w-5 h-5 rounded border-2 border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent"
              style={{ accentColor: '#39b54b' }}
            />
            <label htmlFor="acknowledgePolicy" className="text-sm text-gray-700 cursor-pointer">
              I have read and understood the Privacy Policy
            </label>
          </div> */}
        </div>

        {/* Footer */}
        <div className="text-center mt-12 p-6 bg-white rounded-xl shadow-md border border-gray-100">
          <div className="flex items-center justify-center space-x-2 mb-3">
            <Eye className="w-5 h-5 text-gray-400" />
            <span className="text-sm text-gray-500">Policy effective and regularly updated</span>
          </div>
          <p className="text-sm text-gray-600">
            For privacy-related questions or concerns, please contact our privacy team through our official channels.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;