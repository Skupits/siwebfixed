import Link from 'next/link';
import NavLinks from '@/app/ui/dashboard/nav-links';
import LogoutButton from '@/app/ui/dashboard/LogoutButton';
import { UserCircleIcon } from '@heroicons/react/24/solid';

export default function SideNav() {
  return (
    <div className="flex h-full flex-col bg-green-900 border-r border-green-800">
      {/* Header */}
      <div className="flex items-center justify-center h-16 px-4 border-b border-green-800">
        <Link href="/" className="flex items-center gap-2">
          <h1 className="text-2xl font-bold text-white">TolOng</h1>
        </Link>
      </div>
      
      {/* User Profile */}
      <div className="flex items-center gap-3 px-4 py-4 border-b border-green-800">
        <div className="w-10 h-10 rounded-full bg-green-700 flex items-center justify-center">
          <UserCircleIcon className="w-8 h-8 text-white" />
        </div>
        <div>
          <p className="text-sm font-medium text-white">Admin User</p>
          <p className="text-xs text-green-300">admin@example.com</p>
        </div>
      </div>
      
      {/* Navigation */}
      <div className="flex-1 overflow-y-auto p-3">
        <p className="text-xs font-semibold text-green-300 uppercase tracking-wider mb-2 px-3">Menu</p>
        <NavLinks />
      </div>
      
      {/* Footer */}
      <div className="p-3 border-t border-green-800">
        <LogoutButton />
      </div>
    </div>
  );
}