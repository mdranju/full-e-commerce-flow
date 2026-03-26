import { BackButton } from "@/components/common/BackButton";

export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <BackButton className="mb-6" />
      <h1 className="text-3xl font-black text-gray-900 mb-8">Privacy Policy</h1>
      <div className="prose prose-lg max-w-none text-gray-700 space-y-6">
        <p>
          At Believers, we respect your privacy and are committed to protecting your personal data. This privacy policy explains how we collect, use, and safeguard your information when you visit our website.
        </p>

        <h2 className="text-xl font-bold text-gray-900 mt-8 mb-3">Information We Collect</h2>
        <p>
          We collect information you provide directly to us, such as your name, email address, phone number, shipping address, and payment information when you place an order or create an account.
        </p>

        <h2 className="text-xl font-bold text-gray-900 mt-8 mb-3">How We Use Your Information</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>To process and fulfill your orders.</li>
          <li>To communicate with you about your orders and our services.</li>
          <li>To improve our website and customer experience.</li>
          <li>To send you promotional offers (with your consent).</li>
        </ul>

        <h2 className="text-xl font-bold text-gray-900 mt-8 mb-3">Information Sharing</h2>
        <p>
          We do not sell or rent your personal information to third parties. We may share your data with trusted partners (e.g., delivery services) only as necessary to fulfill your orders.
        </p>

        <h2 className="text-xl font-bold text-gray-900 mt-8 mb-3">Data Security</h2>
        <p>
          We implement industry-standard security measures to protect your personal information. However, no data transmission over the internet can be guaranteed 100% secure.
        </p>

        <h2 className="text-xl font-bold text-gray-900 mt-8 mb-3">Your Rights</h2>
        <p>
          You have the right to access, correct, or delete your personal data. To exercise these rights, please contact us at <a href="mailto:cc.believerssign@gmail.com" className="text-blue-600 hover:underline">cc.believerssign@gmail.com</a>.
        </p>

        <h2 className="text-xl font-bold text-gray-900 mt-8 mb-3">Contact Us</h2>
        <p>
          If you have any questions about this privacy policy, please contact us at <a href="mailto:cc.believerssign@gmail.com" className="text-blue-600 hover:underline">cc.believerssign@gmail.com</a> or call us at <a href="tel:09638090000" className="text-blue-600 hover:underline">09638-090000</a>.
        </p>

        <p className="text-sm text-gray-400 mt-8">Last updated: March 2026</p>
      </div>
    </div>
  );
}
