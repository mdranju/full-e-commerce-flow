'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { User, ShoppingBag, Lock, LogOut } from 'lucide-react';

export function ProfileSidebar() {
  const pathname = usePathname();

  const navItems = [
    { name: 'Profile', href: '/profile', icon: User },
    { name: 'My Orders', href: '/profile/orders', icon: ShoppingBag },
    { name: 'Change Password', href: '/profile/password', icon: Lock },
    { name: 'Logout', href: '#', icon: LogOut },
  ];

  return (
    <div className="w-full md:w-64 shrink-0">
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
        <ul className="flex flex-col">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            
            return (
              <li key={item.name} className="border-b border-gray-50 last:border-0">
                <Link 
                  href={item.href}
                  className={`flex items-center gap-3 px-6 py-4 text-sm font-medium transition-colors ${
                    isActive 
                      ? 'text-blue-600 bg-blue-50/50 border-l-2 border-blue-600' 
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 border-l-2 border-transparent'
                  }`}
                >
                  <Icon size={18} className={isActive ? 'text-blue-600' : 'text-gray-400'} />
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
