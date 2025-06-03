"use client";

import Image from "next/image";
import { Heart, Star } from "lucide-react";
import { formatCurrency } from "@/app/lib/utils";
import Link from 'next/link';

interface ProductCardProps {
  title: string;
  image: string;
  rating: number;
  reviewCount: number;
  priceOriginal: number;
  priceDiscount: number;
}

export default function ProductCard({
  title,
  image,
  rating,
  reviewCount,
  priceOriginal,
  priceDiscount,
}: ProductCardProps) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white shadow-md overflow-hidden flex flex-col">
      <div className="relative w-full aspect-[4/3] bg-gray-50">
        <Image src={image} alt={title} fill className="object-contain p-4" />
        <button className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md hover:bg-red-100 transition">
          <Heart className="h-5 w-5 text-gray-600 hover:text-red-500" />
        </button>
      </div>

      <div className="p-4 flex flex-col flex-grow justify-between">
        <h3 className="text-sm font-semibold text-gray-800 line-clamp-2">
          {title}
        </h3>

        <div className="flex items-center gap-1 text-yellow-500 mt-1 text-sm">
          <Star className="w-4 h-4 fill-yellow-400" />
          <span>{rating.toFixed(1)}</span>
          <span className="text-gray-400 ml-1">({reviewCount})</span>
        </div>

        <div className="mt-2">
          <p className="text-gray-500 text-sm line-through">
           {formatCurrency(priceOriginal)}
          </p>
          <p className="text-lg font-bold text-red-600">
            {formatCurrency(priceDiscount)}
          </p>
        </div>
        <Link href="/dashboard/detail">
        <button className="mt-4 w-full bg-black text-white text-sm py-2 rounded-xl hover:bg-gray-800 transition">
          Buy Now
        </button>
        </Link>
      </div>
    </div>
  );
}
