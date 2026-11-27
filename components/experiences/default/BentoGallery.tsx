"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

interface BentoPhoto {
  id: string;
  url: string;
  alt: string;
  tag: string;
  className: string;
}

const PHOTOS: BentoPhoto[] = [
  {
    id: "photo-1",
    url: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80",
    alt: "Scenic mountain valley and serene lake",
    tag: "Outdoors · Trails",
    className: "col-span-2 row-span-2 aspect-[4/3] sm:aspect-auto",
  },
  {
    id: "photo-2",
    url: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80",
    alt: "Minimal developer workspace and code editor",
    tag: "Workspace · Systems",
    className: "col-span-1 row-span-1 aspect-square sm:aspect-auto",
  },
  {
    id: "photo-3",
    url: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=800&q=80",
    alt: "Morning espresso and reading table",
    tag: "Coffee & Notes",
    className: "col-span-1 row-span-1 aspect-square sm:aspect-auto",
  },
  {
    id: "photo-4",
    url: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1000&q=80",
    alt: "Road trip along coastal cliffs and mountains",
    tag: "Wanderlust",
    className: "col-span-2 row-span-1 aspect-[2/1] sm:aspect-auto",
  },
];

export default function BentoGallery() {
  const reduce = useReducedMotion();

  return (
    <div className="w-full mb-8 sm:mb-10">
      <div className="grid grid-cols-2 sm:grid-cols-4 grid-rows-2 gap-2.5 sm:gap-3 h-64 sm:h-72 md:h-80 w-full">
        {PHOTOS.map((photo, idx) => (
          <motion.div
            key={photo.id}
            initial={reduce ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: idx * 0.06, ease: [0.16, 1, 0.3, 1] }}
            className={`group relative overflow-hidden rounded-2xl border border-zinc-200/80 bg-zinc-100 shadow-2xs ${photo.className}`}
          >
            <Image
              src={photo.url}
              alt={photo.alt}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover object-center transition-transform duration-500 ease-out group-hover:scale-[1.04]"
              priority={idx === 0}
            />

            {/* Subtle dark gradient overlay on hover for readable tag */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

            {/* Micro tag caption */}
            <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-all duration-200 transform translate-y-1 group-hover:translate-y-0 pointer-events-none">
              <span className="px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-md text-[11px] font-mono text-white tracking-tight">
                {photo.tag}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
