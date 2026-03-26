'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { User, ShoppingBag, Lock, LogOut, Settings, MapPin } from 'lucide-react';

export function ProfileSidebar() {
  const pathname = usePathname();

  const navItems = [
    { name: 'Profile', href: '/profile', icon: User },
    { name: 'My Orders', href: '/profile/orders', icon: ShoppingBag },
    { name: 'Addresses', href: '/profile/addresses', icon: MapPin },
    { name: 'Change Password', href: '/profile/password', icon: Lock },
    { name: 'Settings', href: '/profile/settings', icon: Settings, mobileOnly: true },
    { name: 'Logout', href: '#', icon: LogOut, isDanger: true },
  ];

  return (
    <div className="w-full md:w-64 shrink-0 hidden md:block">
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden sticky top-24">
        <ul className="flex flex-col p-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            
            return (
              <li key={item.name} className={item.mobileOnly ? 'lg:hidden' : ''}>
                <Link 
                  href={item.href}
                  className={`flex items-center gap-3 px-5 py-4 text-sm font-bold rounded-2xl transition-all mb-1 last:mb-0 ${
                    isActive 
                      ? 'text-blue-600 bg-blue-50' 
                      : item.isDanger 
                        ? 'text-red-500 hover:bg-red-50'
                        : 'hover:bg-gray-50 hover:text-gray-900 text-gray-400'
                  }`}
                >
                  <Icon size={18} className={isActive ? 'text-blue-600' : ''} />
                  {item.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
