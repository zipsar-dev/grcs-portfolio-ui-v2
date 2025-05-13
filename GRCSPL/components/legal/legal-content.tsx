interface LegalContentProps {
  type: "privacy-policy" | "terms-of-service" | "return-policy" | "income-disclaimer"
}

export default function LegalContent({ type }: LegalContentProps) {
  // This would be replaced with actual content for each legal page
  const content = {
    "privacy-policy": (
      <div className="prose max-w-none">
        <h2>Privacy Policy</h2>
        <p>Last Updated: April 1, 2023</p>

        <h3>1. Introduction</h3>
        <p>
          This Privacy Policy describes how we collect, use, and disclose your personal information when you visit our
          website, use our services, or interact with us as an associate or customer.
        </p>

        <h3>2. Information We Collect</h3>
        <p>
          We may collect personal information such as your name, address, email address, phone number, payment
          information, and other details when you register as an associate, place an order, or contact us.
        </p>

        <h3>3. How We Use Your Information</h3>
        <p>
          We use your information to process orders, manage your account, provide customer support, send promotional
          communications, and improve our products and services.
        </p>

        <h3>4. Information Sharing</h3>
        <p>
          We may share your information with service providers who help us operate our business, with your upline or
          downline associates as part of our business model, and as required by law.
        </p>

        <h3>5. Your Rights</h3>
        <p>
          You have the right to access, correct, or delete your personal information. You can also opt out of marketing
          communications at any time.
        </p>

        <h3>6. Security</h3>
        <p>
          We implement appropriate security measures to protect your personal information from unauthorized access,
          disclosure, or misuse.
        </p>

        <h3>7. Contact Us</h3>
        <p>If you have any questions about this Privacy Policy, please contact us at privacy@businesstn.com.</p>
      </div>
    ),
    "terms-of-service": (
      <div className="prose max-w-none">
        <h2>Terms of Service</h2>
        <p>Last Updated: April 1, 2023</p>

        <h3>1. Acceptance of Terms</h3>
        <p>
          By accessing or using our website and services, you agree to be bound by these Terms of Service and all
          applicable laws and regulations.
        </p>

        <h3>2. Associate Agreement</h3>
        <p>
          If you register as an associate, you also agree to be bound by our Associate Agreement, which contains
          additional terms and conditions.
        </p>

        <h3>3. Products and Services</h3>
        <p>
          We provide various products and business opportunities. All product descriptions, pricing, and availability
          are subject to change without notice.
        </p>

        <h3>4. User Accounts</h3>
        <p>
          You are responsible for maintaining the confidentiality of your account information and for all activities
          that occur under your account.
        </p>

        <h3>5. Intellectual Property</h3>
        <p>
          All content on our website, including logos, images, text, and software, is our property and is protected by
          intellectual property laws.
        </p>

        <h3>6. Limitation of Liability</h3>
        <p>
          We are not liable for any direct, indirect, incidental, consequential, or punitive damages arising from your
          use of our website or services.
        </p>

        <h3>7. Governing Law</h3>
        <p>
          These Terms of Service are governed by the laws of India, without regard to its conflict of law principles.
        </p>
      </div>
    ),
    "return-policy": (
      <div className="prose max-w-none">
        <h2>Return Policy</h2>
        <p>Last Updated: April 1, 2023</p>

        <h3>1. Satisfaction Guarantee</h3>
        <p>
          We offer a 30-day money-back guarantee on most products. If you're not satisfied with your purchase, you can
          return the unused portion for a full refund.
        </p>

        <h3>2. Return Process</h3>
        <p>
          To initiate a return, contact our customer service team at returns@businesstn.com or call our toll-free
          number. You will receive a Return Authorization Number and instructions for returning the product.
        </p>

        <h3>3. Refund Processing</h3>
        <p>
          Refunds will be processed within 7-10 business days after we receive the returned product. Refunds will be
          issued to the original payment method.
        </p>

        <h3>4. Shipping Costs</h3>
        <p>
          Shipping costs for returns are the responsibility of the customer, unless the return is due to our error or a
          defective product.
        </p>

        <h3>5. Damaged or Defective Products</h3>
        <p>
          If you receive a damaged or defective product, please contact us within 48 hours of receipt. We will arrange
          for a replacement or refund at our expense.
        </p>

        <h3>6. Exceptions</h3>
        <p>
          Certain products, such as personalized items or digital downloads, are not eligible for return unless they are
          defective.
        </p>
      </div>
    ),
    "income-disclaimer": (
      <div className="prose max-w-none">
        <h2>Income Disclaimer</h2>
        <p>Last Updated: April 1, 2023</p>

        <h3>1. No Guaranteed Income</h3>
        <p>
          The income examples shown on our website, in our presentations, or in our marketing materials are for
          illustrative purposes only. There is no guarantee that you will earn any income as an associate.
        </p>

        <h3>2. Individual Results Vary</h3>
        <p>
          Your results will vary depending on your individual capacity, business experience, expertise, and level of
          desire. There are no guarantees concerning the level of success you may experience.
        </p>

        <h3>3. Success Factors</h3>
        <p>
          Your success depends on many factors, including your personal effort, time commitment, business skills, and
          market conditions. Building a successful business takes time, dedication, and hard work.
        </p>

        <h3>4. Testimonials</h3>
        <p>
          The testimonials and examples used are exceptional results, which do not apply to the average associate, and
          are not intended to represent or guarantee that anyone will achieve the same or similar results.
        </p>

        <h3>5. Legal Compliance</h3>
        <p>
          We operate in compliance with all applicable laws and regulations governing direct selling and income claims.
          We do not tolerate misleading income claims by our associates.
        </p>

        <h3>6. Full Disclosure</h3>
        <p>
          For complete information about our compensation plan, please review our Associate Agreement and Compensation
          Plan document, which provides detailed information about the business opportunity.
        </p>
      </div>
    ),
  }

  return <div className="bg-white rounded-lg shadow-md p-6">{content[type]}</div>
}
