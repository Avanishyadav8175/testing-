import { Building2, CheckCircle2, Target, Users2 } from 'lucide-react';

const stats = [
  {
    id: 'active-jobs',
    icon: Target,
    count: '5000+',
    label: 'Active Jobs',
    color: 'bg-red-50',
    iconColor: 'text-red-500',
  },
  {
    id: 'companies',
    icon: Building2,
    count: '2000+',
    label: 'Companies',
    color: 'bg-blue-50',
    iconColor: 'text-blue-500',
  },
  {
    id: 'job-seekers',
    icon: Users2,
    count: '50K+',
    label: 'Job Seekers',
    color: 'bg-purple-50',
    iconColor: 'text-purple-500',
  },
  {
    id: 'success-stories',
    icon: CheckCircle2,
    count: '10K+',
    label: 'Success Stories',
    color: 'bg-green-50',
    iconColor: 'text-green-500',
  },
];

export default function AchievementStats() {
  return (
    <div className="bg-gradient-to-br from-gray-50 to-blue-50 py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Our Achievements
          </h2>
          <p className="text-gray-600 text-lg">
            Trusted by thousands of job seekers across India
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.id}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className={`w-16 h-16 ${stat.color} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                  <Icon className={`h-8 w-8 ${stat.iconColor}`} />
                </div>
                <div className="text-center">
                  <h3 className="text-3xl md:text-4xl font-bold text-indigo-600 mb-2">
                    {stat.count}
                  </h3>
                  <p className="text-gray-600 font-medium">
                    {stat.label}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}