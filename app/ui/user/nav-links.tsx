'use client';

import {
  UserGroupIcon,
  HomeIcon,
  DocumentDuplicateIcon,
  ChatBubbleLeftIcon,
  ShoppingCartIcon
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

// Daftar link
const links = [
  { name: 'Home', href: '/dashboard', icon: HomeIcon },
  { name: 'About Us', href: '/user/AboutUs', icon: DocumentDuplicateIcon },
  { name: 'Our Teams', href: '/user/OurTeams', icon: UserGroupIcon },
  { name: 'Contact', href : '/user/contact', icon: ChatBubbleLeftIcon},
  { name: 'Shop', href : '/user/shop', icon: ShoppingCartIcon},
];

export default function NavLinks() {
  const pathname = usePathname();

  return (
    <nav className="flex gap-6">
      {links.map((link) => {
        const LinkIcon = link.icon;
        const isActive = pathname === link.href;

        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              'flex items-center gap-1 text-white hover:text-lime-400 transition-colors font-serif text-base',
              { 'underline underline-offset-4 text-lime-400': isActive }
            )}
          >
            <LinkIcon className="w-5 h-5" />
            <span>{link.name}</span>
          </Link>
        );
      })}
    </nav>
  );
}
