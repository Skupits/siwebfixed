'use client';

import {
  HomeIcon,
  DocumentDuplicateIcon,
  ShoppingBagIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

// Map of links to display in the side navigation.
const links = [
  { name: 'Dashboard', href: '/dashboard', icon: HomeIcon },
  { name: 'Transaksi', href: '/dashboard/invoices', icon: DocumentDuplicateIcon },
  { name: 'Produk', href: '/dashboard/products', icon: ShoppingBagIcon },
];

export default function NavLinks() {
  const pathname = usePathname();

  return (
    <div className="flex flex-col space-y-1 w-full">
      {links.map((link) => {
        const LinkIcon = link.icon;
        const isActive = pathname === link.href || pathname.startsWith(`${link.href}/`);
        
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              'flex h-10 items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
              {
                'bg-green-700 text-white': isActive,
                'text-white hover:bg-green-800': !isActive,
              },
            )}
          >
            <LinkIcon className="w-5 h-5 text-white" />
            <span>{link.name}</span>
          </Link>
        );
      })}
    </div>
  );
}