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
      <div className="main-container py-8">
        <div className="relative bg-gradient-to-r from-blue-600 to-blue-800 overflow-hidden rounded-2xl">
          <div className="px-4 p-16 md:py-16">
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
                <div className="relative w-full max-w-md h-34 md:h-30 sm:h-20">
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
      </div>
    );
  }

  return (
    <div className="main-container py-4">
      <div className="relative overflow-hidden rounded-2xl shadow-xl">
        <div className="relative w-full aspect-[1280/400]">
        {banners.map((banner, index) => (
          <div
            key={banner._id || banner.id || index}
            className={`absolute inset-0 transition-opacity duration-700 ${index === currentSlide ? 'opacity-100' : 'opacity-0'
              }`}
          >
            {banner.image_url ? (
              <div className="relative h-full w-full rounded-2xl overflow-hidden">
                <Image
                  src={banner.image_url}
                  alt={banner.title || 'Banner'}
                  fill
                  className="w-full h-full object-cover object-center"
                  priority={index === 0}
                  sizes=""
                />

                {banner.title && (
                  <div className="absolute inset-0  flex items-center">
                    <div className="px-6 md:px-12 lg:px-16">
                      <div className="max-w-2xl text-white">
                        <h1 className="text-sm md:text-4xl lg:text-sm font-bold mb-3 leading-tight ">
                          {banner.title}
                        </h1>
                        {banner.subtitle && (
                          <p className="text-base md:text-lg lg:text-xl opacity-90 mb-6 drop-shadow-md">
                            {banner.subtitle}
                          </p>
                        )}
                        {/* <div className="flex flex-col sm:flex-row gap-3">
                          <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2.5 rounded-lg transition-all duration-300 shadow-lg">
                            Explore Now
                          </button>
                          <button className="border-2 border-white text-white hover:bg-white hover:text-gray-900 font-semibold px-6 py-2.5 rounded-lg transition-all duration-300">
                            Learn More
                          </button>
                        </div> */}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="h-full bg-gradient-to-r from-blue-600 to-blue-800 flex items-center justify-center rounded-2xl">
                <div className="px-4 md:px-6">
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
    </div>
  );
}