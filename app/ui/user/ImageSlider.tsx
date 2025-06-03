"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import Image from "next/image";
import "swiper/css";
import "swiper/css/pagination";

const images = ["/image banner.png", "/image banner.png", "/image banner.png"];

export default function ImageSlider() {
  return (
    <div className="w-full flex justify-center mt-8 px-4">
      <Swiper
        modules={[Autoplay, Pagination]}
        autoplay={{ delay: 3000 }}
        loop
        pagination={{ clickable: true }}
        className="w-full max-w-[1200px]"
      >
        {images.map((src, idx) => (
          <SwiperSlide key={idx} className="flex justify-center items-center">
            <div className="relative w-full h-[300px] sm:h-[380px]">
              <Image
                src={src}
                alt={`Slide ${idx}`}
                fill
                className="object-contain"
                priority
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

