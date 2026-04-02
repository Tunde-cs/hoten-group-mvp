"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

type ProjectSliderCardProps = {
  category: string;
  title: string;
  description: string;
  images: string[];
};

export function ProjectSliderCard({
  category,
  title,
  description,
  images,
}: ProjectSliderCardProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!images || images.length <= 1) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 3500);

    return () => clearInterval(timer);
  }, [images]);

  return (
    <article className="group relative min-h-[420px] overflow-hidden rounded-[2rem] border border-white/10 bg-white/5">
      <div className="absolute inset-0">
        {images.map((image, index) => (
          <div
            key={image}
            className={`absolute inset-0 transition-opacity duration-700 ${
              index === currentIndex ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image
              src={image}
              alt={title}
              fill
              className="object-cover"
              priority={index === 0}
            />
          </div>
        ))}
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/20 to-transparent" />

      <div className="relative flex min-h-[420px] flex-col justify-end p-8">
        <span className="inline-block w-fit rounded-md bg-black/35 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.25em] text-yellow-400 backdrop-blur-sm">
          {category}
        </span>

        <h3 className="mt-4 text-xl font-semibold text-white drop-shadow-lg md:text-2xl">
          {title}
        </h3>

        <p className="mt-4 max-w-md text-base leading-8 text-white/90 drop-shadow-md">
          {description}
        </p>

        {images.length > 1 && (
          <div className="mt-5 flex items-center gap-2">
            {images.map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => setCurrentIndex(index)}
                aria-label={`Go to slide ${index + 1}`}
                className={`h-2.5 w-2.5 rounded-full transition ${
                  index === currentIndex ? "bg-white" : "bg-white/50"
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </article>
  );
}