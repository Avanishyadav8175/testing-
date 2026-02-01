'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';

interface Banner {
  _id?: string;
  id?: string;
  title?: string;
  subtitle?: string;
  image_url?: string;
  link?: string;
}

export default function HeroBanner({ banners = [] }: { banners?: Banner[] }) {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    if (banners.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [banners.length]);

  if (banners.length === 0) {
    return (
      <div className="relative bg-gradient-to-r from-blue-600 to-blue-800 overflow-hidden">
        <div className="container mx-auto px-4 py-8 md:py-16">
          <div className="flex items-center justify-between">
            <div className="flex-1 text-white">
              <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-4">
                Find Your Dream Career
              </h1>
              <p className="text-lg md:text-xl opacity-90 mb-6">
                Latest Government & Private Jobs, Admit Cards, Results
              </p>
            </div>

            <div className="flex-1 flex justify-end">
              <div className="relative w-full max-w-md h-64 md:h-80">
                <Image
                  src="/hero-professionals.svg"
                  alt="Professionals - Police Officer, Doctor, Business Person"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden bg-slate-50 dark:bg-slate-900">
      <div className="relative w-full aspect-[16/9] md:aspect-[20/7] lg:aspect-[24/7]">
        {banners.map((banner, index) => (
          <div
            key={banner._id || banner.id || index}
            className={`absolute inset-0 transition-opacity duration-700 ${index === currentSlide ? 'opacity-100' : 'opacity-0'
              }`}
          >
            {banner.image_url ? (
              <div className="relative h-full w-full">
                <Image
                  src={banner.image_url}
                  alt={banner.title || 'Banner'}
                  fill
                  className="object-cover object-center"
                  priority={index === 0}
                />

                {banner.title && (
                  <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/20 to-transparent flex items-center">
                    <div className="container mx-auto px-4 md:px-6">
                      <div className="max-w-2xl text-white">
                        <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-3 leading-tight">
                          {banner.title}
                        </h1>
                        {banner.subtitle && (
                          <p className="text-base md:text-lg lg:text-xl opacity-90 mb-4">
                            {banner.subtitle}
                          </p>
                        )}
                        <div className="flex flex-col sm:flex-row gap-3">
                          <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2.5 rounded-lg transition-all duration-300">
                            Explore Now
                          </button>
                          <button className="border-2 border-white text-white hover:bg-white hover:text-gray-900 font-semibold px-6 py-2.5 rounded-lg transition-all duration-300">
                            Learn More
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="h-full bg-gradient-to-r from-blue-600 to-blue-800 flex items-center justify-center">
                <div className="container mx-auto px-4 md:px-6">
                  <div className="max-w-3xl text-center text-white">
                    <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
                      {banner.title || 'Find Your Dream Career'}
                    </h2>
                    {banner.subtitle && (
                      <p className="text-base md:text-lg lg:text-xl opacity-90 mb-6">
                        {banner.subtitle}
                      </p>
                    )}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <button className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold px-8 py-3 rounded-lg transition-all duration-300">
                        Get Started
                      </button>
                      <button className="border-2 border-white text-white hover:bg-white hover:text-blue-700 font-semibold px-8 py-3 rounded-lg transition-all duration-300">
                        Learn More
                      </button>
                    </div>
                  </div>
                </div>
              </div>
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
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg transition-all z-10"
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-5 w-5 text-gray-800" />
          </button>
          <button
            onClick={() =>
              setCurrentSlide((prev) => (prev + 1) % banners.length)
            }
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg transition-all z-10"
            aria-label="Next slide"
          >
            <ChevronRight className="h-5 w-5 text-gray-800" />
          </button>

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
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
  );
}