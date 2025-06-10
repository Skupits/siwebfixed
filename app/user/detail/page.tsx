"use client";

import Image from "next/image";
import { formatCurrency } from "@/app/lib/utils"; // pastikan kamu punya fungsi ini
import { useParams } from "next/navigation";

export default function ProductDetail() {
  const { slug } = useParams(); // jika ingin ambil slug produk dari URL

  const product = {
    title: "Zataru Fragrance World Midori Unisex EDP - 100 ML",
    price: 233000,
    condition: "Baru",
    minOrder: 1,
    image: "/image5.jpeg", // ganti dengan path lokal atau URL public
    size: "100 ML",
    gender: "Unisex",
    type: "EDP",
    topNote: "Sicilian bergamot, mandarin, green apple, cashmere.",
    middleNote: "Cedar, freesia, pomarose.",
    baseNote: "Oakmoss, musk, amber.",
    bpom: "NA52240600416",
  };

  return (
    <div className="p-6 max-w-5xl mx-auto flex flex-col md:flex-row gap-8">
      {/* Left image section */}
      <div className="flex-1">
        <Image
          src={product.image}
          alt={product.title}
          width={400}
          height={400}
          className="rounded-xl shadow-md w-full h-auto object-contain"
        />
      </div>

      {/* Right content section */}
      <div className="flex-1">
        <h1 className="text-2xl font-semibold mb-2">{product.title}</h1>
        <p className="text-3xl font-bold text-red-600 mb-4">
          {formatCurrency(product.price)}
        </p>

        <div className="mb-4">
          <h2 className="text-lg font-bold border-b border-green-500 mb-2">
            Detail
          </h2>
          <ul className="text-sm space-y-1">
            <li><strong>Kondisi:</strong> {product.condition}</li>
            <li><strong>Min. Pemesanan:</strong> {product.minOrder} Buah</li>
            <li><strong>Etalase:</strong> <span className="text-green-600">Semua Etalase</span></li>
            <li><strong>Untuk:</strong> {product.gender}</li>
            <li><strong>Jenis:</strong> {product.type}</li>
            <li><strong>Ukuran:</strong> {product.size}</li>
            <li><strong>Top Note:</strong> {product.topNote}</li>
            <li><strong>Middle Note:</strong> {product.middleNote}</li>
            <li><strong>Base Note:</strong> {product.baseNote}</li>
            <li><strong>No BPOM:</strong> {product.bpom}</li>
          </ul>
        </div>

        <button className="w-full mt-4 bg-black text-white text-lg py-3 rounded-xl hover:bg-gray-800 transition">
          Beli Sekarang
        </button>
      </div>
    </div>
  );
}
