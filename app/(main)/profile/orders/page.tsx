import { ProfileSidebar } from "@/components/profile/ProfileSidebar";
import Image from "next/image";

export default function MyOrdersPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
      <div className="flex flex-col md:flex-row gap-8 items-start">
        <ProfileSidebar />

        <div className="flex-1 w-full relative">
          {/* Decorative background elements */}
          <div className="absolute -z-10 top-10 -left-10 text-orange-400 opacity-50">
            <svg
              width="40"
              height="40"
              viewBox="0 0 40 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M0 40L40 0H0V40Z" fill="currentColor" />
            </svg>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden relative z-10">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-gray-50 border-b border-gray-100">
                  <tr>
                    <th className="px-6 py-4 font-medium text-gray-900">
                      Order Id
                    </th>
                    <th className="px-6 py-4 font-medium text-gray-900">
                      Order Date
                    </th>
                    <th className="px-6 py-4 font-medium text-gray-900">
                      Address
                    </th>
                    <th className="px-6 py-4 font-medium text-gray-900 text-right">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  <tr className="hover:bg-gray-50/50">
                    <td className="px-6 py-6">
                      <a
                        href="#"
                        className="text-blue-600 hover:underline font-medium"
                      >
                        BS_NUT0_0116907
                      </a>
                    </td>
                    <td className="px-6 py-6 text-gray-600">
                      Jan 28,
                      <br />
                      2026
                    </td>
                    <td className="px-6 py-6 text-gray-600 max-w-xs">
                      Hazari Bari Jame Mosque, Bir Uttam AK Khandakar Road,
                      Mohakhali, Dhaka - 1212
                    </td>
                    <td className="px-6 py-6 text-right">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        Delivered
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Illustration on the right */}
          <div className="hidden lg:block absolute top-0 -right-20 w-64 h-64 -z-10">
            <Image
              src="https://picsum.photos/seed/illustration2/300/300"
              alt="Illustration"
              fill
              className="object-contain opacity-80"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
