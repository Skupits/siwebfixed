// app/components/TeamCard.tsx
'use client';

import Image from "next/image";

type TeamCardProps = {
  name: string;
  description: string;
  image: string;
  tags: string[];
};

export default function TeamCard({ name, description, image, tags }: TeamCardProps) {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white  border border-black">
      <Image
        src={image}
        alt={name}
        width={400}
        height={250}
        className="w-full object-cover"
      />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2 text-black">{name}</div>
        <p className="text-gray-700 text-base">{description}</p>
      </div>
      <div className="px-6 pt-4 pb-2">
        {tags.map((tag) => (
          <span
            key={tag}
            className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
          >
            #{tag}
          </span>
        ))}
      </div>
    </div>
  );
}
