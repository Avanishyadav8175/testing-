'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function HeroSection({ banners }: { banners: any[] }) {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    if (banners.length === 0) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [banners.length]);

  if (banners.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-pink-200 via-orange-100 to-yellow-200 h-64 md:h-80">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center px-4">
              <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
                Find Your Dream Job
              </h1>
              <p className="text-lg md:text-xl text-gray-700">
                Latest Government & Private Jobs, Admit Cards, Results
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="relative rounded-3xl overflow-hidden shadow-lg">
        <div className="relative h-64 md:h-80 lg:h-96">
          {banners.map((banner, index) => (
            <div
              key={(banner._id ?? banner.id)?.toString?.() ?? index}
              className={`absolute inset-0 transition-opacity duration-700 ${index === currentSlide ? 'opacity-100' : 'opacity-0'
                }`}
            >
              {banner.image_url ? (
                <Link href={banner.link || '#'} className="block h-full">
                  <Image
                    src={banner.image_url}
                    alt={banner.title}
                    fill
                    className="object-cover"
                    priority={index === 0}
                  />
                </Link>
              ) : (
                <Link href={banner.link || '#'} className="block h-full">
                  <div className="h-full bg-gradient-to-r from-pink-200 via-orange-100 to-yellow-200 flex items-center justify-center px-8">
                    <div className="max-w-2xl">
                      <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
                        {banner.title}
                      </h2>
                      {banner.subtitle && (
                        <p className="text-lg md:text-xl text-gray-700">
                          {banner.subtitle}
                        </p>
                      )}
                    </div>
                  </div>
                </Link>
              )}
            </div>
          ))}
        </div>

        {banners.length > 1 && (
          <>
            <button
              onClick={() =>
                setCurrentSlide(
                  (prev) => (prev - 1 + banners.length) % banners.length
                )
              }
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg transition-all"
              aria-label="Previous slide"
            >
              <ChevronLeft className="h-5 w-5 text-gray-800" />
            </button>
            <button
              onClick={() =>
                setCurrentSlide((prev) => (prev + 1) % banners.length)
              }
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg transition-all"
              aria-label="Next slide"
            >
              <ChevronRight className="h-5 w-5 text-gray-800" />
            </button>

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              {banners.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`h-2 rounded-full transition-all ${index === currentSlide
                      ? 'bg-white w-8'
                      : 'bg-white/60 hover:bg-white/80 w-2'
                    }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
