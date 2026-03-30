import { MapPin } from "lucide-react";
import Link from "next/link";

export function TopBar() {
  return (
    <div className="bg-[#111827] text-white text-xs py-2 px-4 flex justify-between items-center">
      <div className="max-w-7xl mx-auto w-full flex justify-between items-center">
        <Link
          href="/store-locations"
          className="flex items-center gap-1 hover:text-gray-300"
        >
          <MapPin size={14} className="text-yellow-500" />
          <span>STORE LOCATIONS</span>
        </Link>
        <div className="flex items-center gap-4">
          <button className="flex items-center gap-1 hover:text-gray-300">
            <span>Settings</span>
            <svg
              width="10"
              height="6"
              viewBox="0 0 10 6"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1 1L5 5L9 1"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
