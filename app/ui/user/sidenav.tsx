import {
    ShoppingCartIcon,
    BellIcon,
    EnvelopeIcon,
    UserIcon,
    MagnifyingGlassIcon,
   
  } from '@heroicons/react/24/outline';
  import Image from 'next/image';
  import Link from 'next/link';
  import NavLinks from '@/app/ui/user/nav-links'; // pastikan ini ada ya
  
  export default function TopNav() {
    return (
      <header className="bg-green-900 text-white">
        {/* Top bar */}
        <div className="flex items-center justify-between px-4 py-2">
          {/* Logo & Brand */}
          <div className="flex items-center gap-2">
            <Image src="/2.png" alt="Logo" width={60} height={60} />
            <span className="text-4xl font-serif font-bold text-white">TolOng</span>
          </div>
  
          {/* Search Bar */}
          <div className="flex-1 mx-6 max-w-lg hidden md:flex">
            <div className="flex items-center bg-green-700 rounded-md px-3 py-1 w-full">
              <MagnifyingGlassIcon className="h-4 w-4 text-gray-300 mr-2" />
              <input
                type="text"
                placeholder="SEARCH"
                className="bg-transparent text-white placeholder-gray-300 outline-none flex-grow"
              />
            </div>
          </div>
  
          {/* Icons */}
          <div className="flex items-center gap-5 text-lime-400">
            <ShoppingCartIcon className="h-8 w-8 cursor-pointer" />
            <BellIcon className="h-8 w-8 cursor-pointer" />
            <EnvelopeIcon className="h-8 w-8 cursor-pointer" />
            <UserIcon className="h-8 w-8 cursor-pointer" />
          </div>
        </div>
  
        {/* Bottom Menu Links */}
        <div className=" items-center bg-green-800 text-white px-4 py-2 flex gap-6 font-serif text-md font-semibold border-t border-green-700">
          <NavLinks />
        </div>
      </header>
    );
  }
  