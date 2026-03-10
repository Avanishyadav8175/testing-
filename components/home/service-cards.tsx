'use client';

import {
  Bell,
  Briefcase,
  CreditCard,
  FlaskConical,
  GraduationCap,
  Headphones,
  Trophy,
  UserCheck,
  Users
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const services = [
  {
    id: 'govt-jobs',
    title: 'Govt. Job',
    icon: Briefcase,
    color: 'bg-slate-600',
    href: '/category/government-jobs'
  },
  {
    id: 'admit-card',
    title: 'Admit card',
    icon: CreditCard,
    color: 'bg-green-600',
    href: '/category/admit-cards'
  },
  {
    id: 'result',
    title: 'Result',
    icon: Trophy,
    color: 'bg-red-600',
    href: '/category/results'
  },
  {
    id: 'notification',
    title: 'Notification',
    icon: Bell,
    color: 'bg-purple-600',
    href: '/category/notifications'
  },
  {
    id: 'private-jobs',
    title: 'Private Jobs',
    icon: Users,
    color: 'bg-blue-600',
    href: '/category/private-jobs'
  },
  {
    id: 'internships',
    title: 'Internships',
    icon: UserCheck,
    color: 'bg-indigo-600',
    href: '/category/internships'
  }
];

const additionalServices = [
  {
    id: 'scholarships',
    title: 'Scholarships',
    icon: GraduationCap,
    color: 'bg-teal-600',
    href: '/category/scholarships'
  },
  {
    id: 'college-mitra',
    title: 'college Mitra',
    icon: Headphones,
    color: 'bg-gray-800',
    href: '/services/college-mitra'
  },
  {
    id: 'science-corner',
    title: 'science corner',
    icon: FlaskConical,
    color: 'bg-pink-600',
    href: '/category/science-corner'
  }
];

export default function ServiceCards({ categories = [] }: { categories?: any[] }) {
  // If we have categories from database, use them, otherwise use static services
  const displayCategories = categories.length > 0 ? categories : [...services, ...additionalServices];

  const getServiceIcon = (category: any) => {
    if (category.icon) {
      // Try to match with our predefined icons
      const iconMap: { [key: string]: any } = {
        'briefcase': Briefcase,
        'credit-card': CreditCard,
        'trophy': Trophy,
        'bell': Bell,
        'users': Users,
        'user-check': UserCheck,
        'graduation-cap': GraduationCap,
        'headphones': Headphones,
        'flask-conical': FlaskConical,
      };
      return iconMap[category.icon] || Briefcase;
    }

    // Fallback based on category name/slug
    const name = (category.name || category.slug || '').toLowerCase();
    if (name.includes('govt') || name.includes('government')) return Briefcase;
    if (name.includes('admit')) return CreditCard;
    if (name.includes('result')) return Trophy;
    if (name.includes('notification')) return Bell;
    if (name.includes('private')) return Users;
    if (name.includes('internship')) return UserCheck;
    if (name.includes('scholarship')) return GraduationCap;
    if (name.includes('college')) return Headphones;
    if (name.includes('science')) return FlaskConical;

    return Briefcase;
  };

  const getServiceColor = (category: any) => {
    if (category.color) return category.color;

    // Fallback colors based on category
    const name = (category.name || category.slug || '').toLowerCase();
    if (name.includes('govt') || name.includes('government')) return 'bg-slate-600';
    if (name.includes('admit')) return 'bg-green-600';
    if (name.includes('result')) return 'bg-red-600';
    if (name.includes('notification')) return 'bg-purple-600';
    if (name.includes('private')) return 'bg-blue-600';
    if (name.includes('internship')) return 'bg-indigo-600';
    if (name.includes('scholarship')) return 'bg-teal-600';
    if (name.includes('college')) return 'bg-gray-800';
    if (name.includes('science')) return 'bg-pink-600';

    return 'bg-gray-600';
  };

  return (
    <div className="main-container py-4">
      <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-5 gap-4 md:gap-6">
        {displayCategories.map((category) => {
          const Icon = getServiceIcon(category);
          const href = category.href || `/category/${category.slug}`;
          const color = getServiceColor(category);

          return (
            <Link
              key={category.id || category._id?.toString() || category.slug}
              href={href}
              className="group block"
            >
              <div className="flex flex-col h-full">
                <div className="relative aspect-square rounded-[24px] bg-white border border-slate-100 shadow-sm group-hover:shadow-lg group-hover:-translate-y-1 transition-all duration-300 overflow-hidden flex items-center justify-center p-3 mb-2">
                  {category.image_url ? (
                    <div className="relative w-full h-full">
                      <Image
                        src={category.image_url}
                        alt={category.name || category.title}
                        fill
                        className="object-contain group-hover:scale-110 transition-transform duration-500"
                        sizes="(max-width: 768px) 30vw, (max-width: 1024px) 20vw, 15vw"
                      />
                    </div>
                  ) : (
                    <div className={`w-full h-full rounded-xl ${color} flex items-center justify-center opacity-90 group-hover:opacity-100 transition-opacity`}>
                      <Icon className="h-1/2 w-1/2 text-white" />
                    </div>
                  )}
                </div>
                <span className="text-[14px] md:text-xl font-semibold  text-slate-900 text-center line-clamp-2 leading-tight px-1">
                  {category.name || category.title}
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}