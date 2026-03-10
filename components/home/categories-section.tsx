import * as Icons from 'lucide-react';
import { LucideIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function CategoriesSection({
  categories,
}: {
  categories: any[];
}) {
  const getIcon = (iconName: string): LucideIcon => {
    const Icon = (Icons as any)[
      iconName
        .split('-')
        .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
        .join('')
    ];
    return Icon || Icons.Briefcase;
  };

  return (
    <div className="main-container py-10">
      <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 md:gap-6">
        {categories.map((category) => {
          const Icon = getIcon(category.icon);

          return (
            <Link
              key={(category._id ?? category.id)?.toString?.() ?? category.slug}
              href={`/category/${category.slug}`}
              className="group flex flex-col items-center"
            >
              <div className="relative w-[75px] h-[75px] md:w-24 md:h-24 bg-white rounded-[24px] shadow-sm border border-slate-100 flex items-center justify-center p-3 mb-3 group-hover:shadow-md group-hover:-translate-y-1 transition-all duration-300 overflow-hidden">
                {category.image_url ? (
                  <div className="relative w-full h-full">
                    <Image
                      src={category.image_url}
                      alt={category.name}
                      fill
                      className="object-contain group-hover:scale-110 transition-transform duration-300"
                      sizes="(max-width: 768px) 80px, 100px"
                    />
                  </div>
                ) : (
                  <Icon className="h-1/2 w-1/2 text-slate-400 group-hover:text-primary transition-colors" />
                )}
              </div>
              <span className="text-[12px] md:text-sm font-bold text-slate-800 text-center line-clamp-2 leading-tight px-1">
                {category.name}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
