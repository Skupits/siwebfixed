"use client";

import { FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="w-full bg-gray-50 border-t border-gray-200 text-gray-700">
      <div className="max-w-7xl mx-auto py-10 px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Logo & Kontak */}
        <div>
          <Image src="/2.png" alt="Logo" width={120} height={50} className="mb-4" />
          <p className="text-sm">TolOng@kelontong.com</p>
          <p className="text-sm mt-1">(021) 12345678</p>
          <p className="text-xs mt-4 text-gray-500">
            © {new Date().getFullYear()} TolOng. Expect the unexpected.
          </p>
        </div>

        {/* Navigasi */}
        <div>
          <h3 className="font-semibold mb-2">Navigasi</h3>
          <ul className="space-y-1 text-sm text-gray-500">
            <li><a href="/dashboard" className="hover:underline">Home</a></li>
            <li><a href="/dashboard/shop" className="hover:underline">Shop</a></li>
            <li><a href="/dashboard/aboutUS" className="hover:underline">About Us</a></li>
          </ul>
        </div>

        {/* Sosial Media */}
        <div>
          <h3 className="font-semibold mb-2">Ikuti Kami</h3>
          <ul className="space-y-2 text-sm text-gray-500">
            <li className="flex items-center gap-2">
              <FaFacebookF className="text-black" /> Facebook
            </li>
            <li className="flex items-center gap-2">
              <FaInstagram className="text-black" /> Instagram
            </li>
            <li className="flex items-center gap-2">
              <FaYoutube className="text-black" /> YouTube
            </li>
          </ul>
        </div>

        {/* Form Newsletter */}
        <div>
          <h3 className="font-semibold mb-2 uppercase">Join Our Member</h3>
          <p className="text-sm text-gray-500 mb-4">Masukkan email kamu untuk update menarik!</p>
          <form className="flex items-center border-b border-gray-400">
            <input
              type="email"
              placeholder="Your email address."
              className="bg-transparent w-full py-1 px-2 text-sm outline-none"
            />
            <button type="submit" className="text-xl text-gray-400 hover:text-black">→</button>
          </form>
        </div>

      </div>
    </footer>
  );
}
