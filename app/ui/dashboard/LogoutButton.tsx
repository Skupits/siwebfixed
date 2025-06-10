'use client';

import { useRouter } from 'next/navigation';
import { ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline';

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      // Hapus data autentikasi dari localStorage
      localStorage.removeItem('authToken');
      
      // Redirect ke halaman login
      router.push('/Auth/Login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <button
      type="button"
      onClick={handleLogout}
      className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-white hover:bg-green-800 transition-colors"
    >
      <ArrowRightOnRectangleIcon className="w-5 h-5 text-white" />
      <span>Keluar</span>
    </button>
  );
}