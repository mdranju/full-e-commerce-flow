import { ProfileSidebar } from "@/components/profile/ProfileSidebar";
import Image from "next/image";

export default function ProfilePage() {
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
          <div className="absolute -z-10 top-20 -left-20 text-gray-400 opacity-50">
            <svg
              width="60"
              height="20"
              viewBox="0 0 60 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0 10C10 10 10 0 20 0C30 0 30 20 40 20C50 20 50 10 60 10"
                stroke="currentColor"
                strokeWidth="2"
              />
            </svg>
          </div>

          <div className="bg-white rounded-lg  shadow-sm border border-gray-100 p-6 md:p-8 relative z-10">
            <h2 className="text-xl font-bold text-gray-800 mb-6">
              Personal Details
            </h2>

            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                      <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                  </div>
                  <input
                    type="text"
                    defaultValue="Md. Ranju"
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-black focus:border-black text-sm"
                  />
                </div>

                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect
                        x="5"
                        y="2"
                        width="14"
                        height="20"
                        rx="2"
                        ry="2"
                      ></rect>
                      <line x1="12" y1="18" x2="12.01" y2="18"></line>
                    </svg>
                  </div>
                  <input
                    type="tel"
                    defaultValue="01799301290"
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-black focus:border-black text-sm"
                  />
                </div>
              </div>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                    <polyline points="22,6 12,13 2,6"></polyline>
                  </svg>
                </div>
                <input
                  type="email"
                  defaultValue="mdranju.dev@gmail.com"
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-black focus:border-black text-sm"
                />
              </div>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="Enter your address"
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-black focus:border-black text-sm"
                />
              </div>

              <button
                type="button"
                className="bg-[#0B1221] text-white px-8 py-3 rounded-md font-medium text-sm hover:bg-gray-800 transition-colors"
              >
                Update Profile
              </button>
            </form>
          </div>

          {/* Illustration on the right */}
          <div className="hidden lg:block absolute top-0 -right-20 w-64 h-64 -z-10">
            <Image
              src="https://picsum.photos/seed/illustration1/300/300"
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
