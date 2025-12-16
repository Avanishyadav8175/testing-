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
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 md:gap-4">
        {categories.map((category) => {
          const Icon = getIcon(category.icon);

          return (
            <Link
              key={(category._id ?? category.id)?.toString?.() ?? category.slug}
              href={`/category/${category.slug}`}
              className="group"
            >
              <div className="flex flex-col items-center">
                <div className="relative w-full aspect-square rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 mb-2">
                  {category.image_url ? (
                    <Image
                      src={category.image_url}
                      alt={category.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200 group-hover:from-slate-200 group-hover:to-slate-300 transition-colors">
                      <Icon className="h-1/2 w-1/2 text-slate-600" />
                    </div>
                  )}
                </div>
                <span className="text-xs md:text-sm font-medium text-gray-800 text-center line-clamp-2">
                  {category.name}
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
