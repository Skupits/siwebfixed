'use client';

import Image from 'next/image';
import { useState } from 'react';

export default function ProductImage({ src, alt }: { src: string; alt: string }) {
  const [imgSrc, setImgSrc] = useState(src);
  
  return (
    <Image
      src={imgSrc}
      alt={alt}
      fill
      className="rounded-md object-cover object-center"
      onError={() => setImgSrc('/Pulpen.png')}
    />
  );
}