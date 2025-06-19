"use client";

import Image from "next/image";

interface BlogCardProps {
  image: string;
  category: string;
  title: string;
  description: string;
  date: string;
}
export const BlogPost = [
  {
    image: "/images/watch.jpg",
    category: "Open Source",
    title:
      "How Common Sense Machines uses Meta Segment Anything Model and AI to generate production-ready 3D assets",
    description:
      "Common Sense Machines uses Meta Segment Anything Model 2 to analyze 2D images and video and translate their components to 3D.",
    date: "May 1, 2025",
  },
  {
    image: "/images/watch.jpg",
    category: "Women Watch",
    title:
      "How Common Sense Machines uses Meta Segment Anything Model and AI to generate production-ready 3D assets",
    description:
      "Common Sense Machines uses Meta Segment Anything Model 2 to analyze 2D images and video and translate their components to 3D.",
    date: "May 1, 2025",
  },

  {
    image: "/images/watch.jpg",
    category: "Men Watch",
    title:
      "How Common Sense Machines uses Meta Segment Anything Model and AI to generate production-ready 3D assets",
    description:
      "Common Sense Machines uses Meta Segment Anything Model 2 to analyze 2D images and video and translate their components to 3D.",
    date: "May 1, 2025",
  },
  {
    image: "/images/watch.jpg",
    category: "Unisex Watch",
    title:
      "How Common Sense Machines uses Meta Segment Anything Model and AI to generate production-ready 3D assets",
    description:
      "Common Sense Machines uses Meta Segment Anything Model 2 to analyze 2D images and video and translate their components to 3D.",
    date: "May 1, 2025",
  },
];

export default function BlogCard({
  image,
  category,
  title,
  description,
  date,
}: BlogCardProps) {
  return (
    <div className="flex flex-col md:flex-row bg-[#f4f7fa] rounded-lg overflow-hidden shadow-sm hover:shadow-md transition">
      {/* Image section */}
      <div className="md:w-1/2">
        <Image
          src={image}
          alt={title}
          width={600}
          height={300}
          className="w-full h-full object-fit"
        />
      </div>

      {/* Text section */}
      <div className="md:w-1/2 p-6 flex flex-col justify-center gap-2">
        <p className="text-sm text-gray-500 font-medium">{category}</p>
        <h2 className="text-xl font-semibold text-gray-800 hover:underline cursor-pointer">
          {title}
        </h2>
        <p className="text-gray-600">{description}</p>
        <p className="text-sm text-gray-400 mt-2">{date}</p>
      </div>
    </div>
  );
}
