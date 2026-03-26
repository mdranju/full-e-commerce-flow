import Image from "next/image";
import { BackButton } from "@/components/common/BackButton";

export default function TrackOrderPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12 md:py-20">
      <BackButton />
      <div className="max-w-xl mx-auto text-center">
        <h1 className="text-3xl font-bold mb-4">Track your order</h1>
        <p className="text-gray-600 mb-8">
          To track your order please enter your Order ID in the box below and
          press the &quot;Track&quot; button. This was given to you on your
          receipt and in the confirmation email you should have received.
        </p>

        <form className="space-y-6 text-left">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Order ID
            </label>
            <input
              type="text"
              placeholder="Found in your order confirmation email."
              className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-1 focus:ring-black"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Billing email
            </label>
            <input
              type="email"
              placeholder="Email you used during checkout."
              className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-1 focus:ring-black"
            />
          </div>

          <button
            type="button"
            className="w-full bg-[#0B1221] text-white py-3 rounded-md font-bold hover:bg-gray-800 transition-colors"
          >
            Track
          </button>
        </form>
      </div>
    </div>
  );
}
