import Link from "next/link";
import { Facebook, Youtube, MapPin, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-black text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <Link href="/" className="mb-4">
              <div className="w-12 h-12 bg-white rounded-sm flex items-center justify-center text-black font-bold text-3xl">
                b
              </div>
            </Link>
            <p className="text-gray-400 text-sm mb-6 max-w-xs">
              One of the largest Islamic Lifestyle brands in Bangladesh
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center hover:bg-blue-700 transition-colors"
              >
                <Facebook size={18} />
              </a>
              <a
                href="#"
                className="w-8 h-8 bg-red-600 rounded flex items-center justify-center hover:bg-red-700 transition-colors"
              >
                <Youtube size={18} />
              </a>
            </div>
          </div>

          {/* Account */}
          <div>
            <h3 className="text-lg font-bold mb-6 border-b border-gray-800 pb-2 inline-block">
              Account
            </h3>
            <ul className="space-y-3 text-sm text-gray-400">
              <li>
                <Link
                  href="/profile"
                  className="hover:text-white transition-colors"
                >
                  My Account
                </Link>
              </li>
              <li>
                <Link
                  href="/track-order"
                  className="hover:text-white transition-colors"
                >
                  Track My Order
                </Link>
              </li>
              <li>
                <Link
                  href="/affiliate"
                  className="hover:text-white transition-colors"
                >
                  Join As Affiliate
                </Link>
              </li>
              <li>
                <Link
                  href="/complain"
                  className="hover:text-white transition-colors"
                >
                  Complain Box
                </Link>
              </li>
            </ul>
          </div>

          {/* Information */}
          <div>
            <h3 className="text-lg font-bold mb-6 border-b border-gray-800 pb-2 inline-block">
              Information
            </h3>
            <ul className="space-y-3 text-sm text-gray-400">
              <li>
                <Link
                  href="/store-locations"
                  className="hover:text-white transition-colors"
                >
                  Our Showrooms
                </Link>
              </li>
              <li>
                <Link
                  href="/refund"
                  className="hover:text-white transition-colors"
                >
                  Refund & Returned
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="hover:text-white transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="hover:text-white transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="hover:text-white transition-colors"
                >
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>

          {/* Talk To Us */}
          <div>
            <h3 className="text-lg font-bold mb-6 border-b border-gray-800 pb-2 inline-block">
              Talk To Us
            </h3>
            <div className="text-sm text-gray-400 space-y-4">
              <div>
                <p className="mb-1">Got Questions? Call us</p>
                <p className="text-xl font-bold text-white">09638090000</p>
              </div>
              <div className="flex items-start gap-3">
                <Mail size={18} className="mt-0.5 shrink-0" />
                <a
                  href="mailto:cc.believerssign@gmail.com"
                  className="hover:text-white transition-colors"
                >
                  cc.believerssign@gmail.com
                </a>
              </div>
              <div className="flex items-start gap-3">
                <MapPin size={18} className="mt-0.5 shrink-0" />
                <p>
                  Shop-3/1, Eastern Plaza, Hatirpool,
                  <br />
                  Dhaka, Dhaka, Bangladesh
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-500">
          <p>&copy; 2026 Believers. All Rights Reserved</p>
        </div>
      </div>
    </footer>
  );
}
