"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import Image from "next/image";
import "swiper/css";
import "swiper/css/navigation";
import { ArrowUpRight } from "lucide-react";
import { categories as categoryData } from "@/app/lib/placeholder-data";

function chunkArray<T>(array: T[], size: number): T[][] {
  return Array.from({ length: Math.ceil(array.length / size) }, (_, i) =>
    array.slice(i * size, i * size + size)
  );
}

export default function CategoryCarousel() {
  const chunkedCategories = chunkArray(categoryData, 4);

  return (
    <div className="w-full flex justify-center mt-10 px-8 sm:px-16 lg:px-32">
      <div className="w-full max-w-[1050px] border border-black bg-white rounded-2xl p-6">
        <Swiper modules={[Navigation]} slidesPerView={1} navigation>
          {chunkedCategories.map((group, idx) => (
            <SwiperSlide key={idx}>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {group.map((cat, i) => (
                  <div
                    key={i}
                    className="rounded-2xl bg-white shadow-md overflow-hidden p-2 border border-black"
                  >
                    <div className="relative w-full aspect-[3/2] bg-white">
                      <Image
                        src={cat.image}
                        alt={cat.title}
                        fill
                        className="object-contain p-2"
                      />
                    </div>
                    <div className="pt-4 px-2">
                      <span
                        className={`text-sm px-3 py-1 rounded-full ${cat.labelColor}`}
                      >
                        {cat.title}
                      </span>
                      <div className="mt-4">
                        <ArrowUpRight className="w-5 h-5 text-gray-600 hover:text-black cursor-pointer" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
