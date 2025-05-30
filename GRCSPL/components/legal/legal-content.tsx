import { ShieldCheck, Info, Lock } from "lucide-react";
interface LegalContentProps {
  type:
    | "privacy-policy"
    | "terms-of-service"
    | "return-policy"
    | "income-disclaimer";
}

export default function LegalContent({ type }: LegalContentProps) {
  // This would be replaced with actual content for each legal page
  const content = {
    "privacy-policy": (
      <div className="bg-white text-gray-800 p-6 md:p-12 max-w-5xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-[#39b54b] mb-6 flex items-center">
          <ShieldCheck className="w-8 h-8 mr-2" /> Privacy Policy
        </h1>

        <section className="space-y-4">
          <p>
            Under the purview of this business policy, it is explicitly clear
            that GEEAAR Consumer Solutions Private Limited upholds accurate and
            ethical practices. All associates are expected to implement these
            values and observe the law. Please read the policies carefully and
            revisit our website for updates.
          </p>

          <p>
            At GRCS, we respect every individual's right to privacy. Our
            relationship with you is our most valuable asset and the foundation
            of our name and reputation.
          </p>

          <p>
            We treat personal information with the highest confidentiality and
            only disclose it when required by law, to regulators, or to protect
            our rights and property.
          </p>

          <p>
            Personal information is used for processing requests, offering
            services, and improving experiences. We may share it with affiliates
            or agents under strict confidentiality agreements.
          </p>

          <p>
            We only collect and use what is necessary to provide quality service
            and opportunities. Your data may be combined from different channels
            to serve you better.
          </p>

          <p>
            Non-affiliated service providers receive only essential data and
            under agreements that protect your information. You may opt out of
            future communications in joint marketing efforts.
          </p>

          <p>
            Our internal policies mandate that employees handle customer data
            strictly for business purposes, with legal agreements in place.
          </p>

          <p>
            If any information is incorrect or outdated, please contact us for a
            prompt update.
          </p>
        </section>

        <h2 className="text-2xl md:text-3xl font-semibold text-[#39b54b] mt-10 mb-4 flex items-center">
          <Lock className="w-6 h-6 mr-2" /> Cookies
        </h2>

        <section className="space-y-4">
          <p>
            To enhance your experience, we use cookies to personalize content
            and make your visit more convenient. Cookies do not compromise your
            privacy or security.
          </p>

          <p>
            Cookies cannot read data from your hard disk or from other websites.
            External evaluators may also use cookies solely for performance
            analysis.
          </p>
        </section>

        <div className="mt-10 border-t pt-6 text-sm text-gray-600">
          <p>
            For updates or questions, please contact us via the official
            communication channels listed on our website.
          </p>
        </div>
      </div>
    ),
    "terms-of-service": (
      <div className="prose max-w-none">
        <h2>Terms of Service</h2>
        <p>Last Updated: April 1, 2023</p>

        <h3>1. Acceptance of Terms</h3>
        <p>
          By accessing or using our website and services, you agree to be bound
          by these Terms of Service and all applicable laws and regulations.
        </p>

        <h3>2. Associate Agreement</h3>
        <p>
          If you register as an associate, you also agree to be bound by our
          Associate Agreement, which contains additional terms and conditions.
        </p>

        <h3>3. Products and Services</h3>
        <p>
          We provide various products and business opportunities. All product
          descriptions, pricing, and availability are subject to change without
          notice.
        </p>

        <h3>4. User Accounts</h3>
        <p>
          You are responsible for maintaining the confidentiality of your
          account information and for all activities that occur under your
          account.
        </p>

        <h3>5. Intellectual Property</h3>
        <p>
          All content on our website, including logos, images, text, and
          software, is our property and is protected by intellectual property
          laws.
        </p>

        <h3>6. Limitation of Liability</h3>
        <p>
          We are not liable for any direct, indirect, incidental, consequential,
          or punitive damages arising from your use of our website or services.
        </p>

        <h3>7. Governing Law</h3>
        <p>
          These Terms of Service are governed by the laws of India, without
          regard to its conflict of law principles.
        </p>
      </div>
    ),
    "return-policy": (
      <div className="prose max-w-none">
        <h2>Return Policy</h2>
        <p>Last Updated: April 1, 2023</p>

        <h3>1. Satisfaction Guarantee</h3>
        <p>
          We offer a 30-day money-back guarantee on most products. If you're not
          satisfied with your purchase, you can return the unused portion for a
          full refund.
        </p>

        <h3>2. Return Process</h3>
        <p>
          To initiate a return, contact our customer service team at
          returns@businesstn.com or call our toll-free number. You will receive
          a Return Authorization Number and instructions for returning the
          product.
        </p>

        <h3>3. Refund Processing</h3>
        <p>
          Refunds will be processed within 7-10 business days after we receive
          the returned product. Refunds will be issued to the original payment
          method.
        </p>

        <h3>4. Shipping Costs</h3>
        <p>
          Shipping costs for returns are the responsibility of the customer,
          unless the return is due to our error or a defective product.
        </p>

        <h3>5. Damaged or Defective Products</h3>
        <p>
          If you receive a damaged or defective product, please contact us
          within 48 hours of receipt. We will arrange for a replacement or
          refund at our expense.
        </p>

        <h3>6. Exceptions</h3>
        <p>
          Certain products, such as personalized items or digital downloads, are
          not eligible for return unless they are defective.
        </p>
      </div>
    ),
    "income-disclaimer": (
      <div className="prose max-w-none">
        <h2>Income Disclaimer</h2>
        <p>Last Updated: April 1, 2023</p>

        <h3>1. No Guaranteed Income</h3>
        <p>
          The income examples shown on our website, in our presentations, or in
          our marketing materials are for illustrative purposes only. There is
          no guarantee that you will earn any income as an associate.
        </p>

        <h3>2. Individual Results Vary</h3>
        <p>
          Your results will vary depending on your individual capacity, business
          experience, expertise, and level of desire. There are no guarantees
          concerning the level of success you may experience.
        </p>

        <h3>3. Success Factors</h3>
        <p>
          Your success depends on many factors, including your personal effort,
          time commitment, business skills, and market conditions. Building a
          successful business takes time, dedication, and hard work.
        </p>

        <h3>4. Testimonials</h3>
        <p>
          The testimonials and examples used are exceptional results, which do
          not apply to the average associate, and are not intended to represent
          or guarantee that anyone will achieve the same or similar results.
        </p>

        <h3>5. Legal Compliance</h3>
        <p>
          We operate in compliance with all applicable laws and regulations
          governing direct selling and income claims. We do not tolerate
          misleading income claims by our associates.
        </p>

        <h3>6. Full Disclosure</h3>
        <p>
          For complete information about our compensation plan, please review
          our Associate Agreement and Compensation Plan document, which provides
          detailed information about the business opportunity.
        </p>
      </div>
    ),
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">{content[type]}</div>
  );
}
