'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { href: '/admin', label: 'Dashboard', icon: '📊' },
  { href: '/admin/projekti', label: 'Projekti', icon: '🏠' },
  { href: '/admin/kategorije', label: 'Kategorije', icon: '🗂️' },
  { href: '/admin/upiti', label: 'Upiti', icon: '📩' },
  { href: '/admin/chat', label: 'Chat', icon: '💬' },
  { href: '/admin/slike', label: 'Slike', icon: '🖼️' },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-56 min-h-screen bg-gray-900 text-white flex flex-col">
      <div className="px-6 py-5 border-b border-gray-700">
        <span className="font-bold text-lg tracking-tight">modekto <span className="text-amber-400">admin</span></span>
      </div>
      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems.map((item) => {
          const active = item.href === '/admin'
            ? pathname === '/admin'
            : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                active
                  ? 'bg-amber-500 text-white'
                  : 'text-gray-300 hover:bg-gray-800 hover:text-white'
              }`}
            >
              <span>{item.icon}</span>
              {item.label}
            </Link>
          );
        })}
      </nav>
      <div className="px-4 py-3 border-t border-gray-700">
        <Link href="/" className="text-xs text-gray-500 hover:text-gray-300 transition-colors">
          ← Nazad na sajt
        </Link>
      </div>
    </aside>
  );
}
