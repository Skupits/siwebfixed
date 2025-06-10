import Link from 'next/link';

export default function TolongLandingPage() {
  return (
    <div className="min-h-screen bg-[#164A24] flex items-center justify-center relative overflow-hidden">
      {/* SVG latar belakang */}
      <div className="absolute inset-0 z-0">
        <svg viewBox="0 0 800 400" className="w-full h-full">
          <path
            d="M0,200 C150,100 650,100 800,200 L800,400 L0,400 Z"
            fill="#6b8f71"
          />
          <path
            d="M0,280 C250,180 550,180 800,280 L800,400 L0,400 Z"
            fill="#EDE1CD"
          />
        </svg>
      </div>

      {/* Konten utama */}
      <div className="relative z-10 flex flex-col items-center text-center">
        <h1 className="text-white text-4xl font-extrabold mb-6 font-[cursive]">To1Ong</h1>

        <div className="w-48 h-48 rounded-full bg-[#EDE1CD] flex items-center justify-center mb-8 shadow-md">
          <img src="/2.png" alt="Logo" className="w-28 h-28" />
        </div>

        <div className="flex gap-6">
          <Link href="/Auth/Login">
            <button className="bg-[#164A24] text-white border border-white px-6 py-2 rounded-full hover:bg-green-900 transition">
              Sign In
            </button>
          </Link>
          <Link href="/Auth/Register">
            <button className="bg-[#164A24] text-white border border-white px-6 py-2 rounded-full hover:bg-green-900 transition">
              Sign Up
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
