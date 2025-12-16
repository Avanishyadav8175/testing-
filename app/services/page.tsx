import {
  Bell,
  Briefcase,
  CheckCircle,
  Clock,
  CreditCard,
  FileText,
  GraduationCap,
  Headphones,
  Search,
  Shield,
  Trophy,
  UserCheck,
  Users
} from 'lucide-react';
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Our Services - RozgaarTrap | Complete Career Solutions',
  description: 'Explore our comprehensive services including government jobs, private jobs, admit cards, results, internships, scholarships and career guidance.',
  keywords: 'job services, government jobs, private jobs, admit cards, results, career services, employment solutions',
};

export default function ServicesPage() {
  const mainServices = [
    {
      icon: Briefcase,
      title: 'Government Jobs',
      description: 'Latest government job notifications from central and state governments, PSUs, and public sector organizations.',
      features: ['Central Government Jobs', 'State Government Jobs', 'PSU Recruitments', 'Banking Jobs', 'Railway Jobs', 'Defense Jobs'],
      color: 'bg-blue-500',
      link: '/jobs?type=government'
    },
    {
      icon: Users,
      title: 'Private Jobs',
      description: 'Opportunities in private sector companies, startups, and multinational corporations across various industries.',
      features: ['IT & Software Jobs', 'Sales & Marketing', 'Finance & Banking', 'Healthcare Jobs', 'Engineering Jobs', 'Management Roles'],
      color: 'bg-green-500',
      link: '/jobs?type=private'
    },
    {
      icon: CreditCard,
      title: 'Admit Cards',
      description: 'Download admit cards for various competitive exams, interviews, and recruitment processes.',
      features: ['Exam Admit Cards', 'Interview Call Letters', 'Hall Tickets', 'Download Links', 'Exam Centers Info', 'Important Instructions'],
      color: 'bg-orange-500',
      link: '/admit-cards'
    },
    {
      icon: Trophy,
      title: 'Results',
      description: 'Check exam results, merit lists, cut-off marks, and selection lists for various recruitments.',
      features: ['Exam Results', 'Merit Lists', 'Cut-off Marks', 'Selection Lists', 'Scorecard Download', 'Result Analysis'],
      color: 'bg-red-500',
      link: '/results'
    },
    {
      icon: UserCheck,
      title: 'Internships',
      description: 'Find internship opportunities to gain practical experience and kickstart your career.',
      features: ['Paid Internships', 'Remote Internships', 'Summer Internships', 'Corporate Programs', 'Skill Development', 'Certificate Programs'],
      color: 'bg-purple-500',
      link: '/internships'
    },
    {
      icon: GraduationCap,
      title: 'Scholarships',
      description: 'Discover scholarship programs for students at various educational levels.',
      features: ['Merit Scholarships', 'Need-based Aid', 'Government Schemes', 'Private Scholarships', 'International Programs', 'Application Guidance'],
      color: 'bg-indigo-500',
      link: '/scholarships'
    }
  ];

  const additionalServices = [
    {
      icon: Bell,
      title: 'Notifications',
      description: 'Stay updated with important announcements, policy changes, and recruitment updates.',
      color: 'bg-yellow-500'
    },
    {
      icon: Search,
      title: 'Job Search',
      description: 'Advanced search functionality to find jobs based on location, qualification, and preferences.',
      color: 'bg-teal-500'
    },
    {
      icon: FileText,
      title: 'Career Guidance',
      description: 'Expert advice on resume building, interview preparation, and career planning.',
      color: 'bg-pink-500'
    },
    {
      icon: Headphones,
      title: 'Support Services',
      description: '24/7 customer support to help you with any queries or technical issues.',
      color: 'bg-gray-500'
    }
  ];

  const features = [
    {
      icon: CheckCircle,
      title: 'Verified Information',
      description: 'All job postings and information are verified from official sources to ensure accuracy.'
    },
    {
      icon: Clock,
      title: 'Real-time Updates',
      description: 'Get instant notifications about new opportunities and important deadlines.'
    },
    {
      icon: Shield,
      title: 'Secure Platform',
      description: 'Your personal information is protected with industry-standard security measures.'
    },
    {
      icon: Search,
      title: 'Smart Filtering',
      description: 'Advanced search and filtering options to find exactly what you\'re looking for.'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Our Services
            </h1>
            <p className="text-xl md:text-2xl opacity-90 mb-8">
              Comprehensive career solutions to help you achieve your professional goals
            </p>
          </div>
        </div>
      </section>

      {/* Main Services */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
                Core Services
              </h2>
              <p className="text-lg text-gray-600">
                Everything you need for your career journey in one place
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {mainServices.map((service, index) => {
                const Icon = service.icon;
                return (
                  <div key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                    <div className={`${service.color} p-6`}>
                      <Icon className="h-12 w-12 text-white mb-4" />
                      <h3 className="text-2xl font-bold text-white mb-2">
                        {service.title}
                      </h3>
                    </div>
                    <div className="p-6">
                      <p className="text-gray-600 mb-6">
                        {service.description}
                      </p>
                      <ul className="space-y-2 mb-6">
                        {service.features.map((feature, idx) => (
                          <li key={idx} className="flex items-center text-sm text-gray-600">
                            <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                      {service.link && (
                        <Link
                          href={service.link}
                          className={`inline-flex items-center justify-center w-full ${service.color} hover:opacity-90 text-white px-6 py-3 rounded-lg font-semibold transition-opacity`}
                        >
                          Explore {service.title}
                        </Link>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Additional Services */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
                Additional Services
              </h2>
              <p className="text-lg text-gray-600">
                Extra features to enhance your job search experience
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {additionalServices.map((service, index) => {
                const Icon = service.icon;
                return (
                  <div key={index} className="text-center">
                    <div className={`w-20 h-20 ${service.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                      <Icon className="h-10 w-10 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-3">
                      {service.title}
                    </h3>
                    <p className="text-gray-600">
                      {service.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
                Why Choose Our Services?
              </h2>
              <p className="text-lg text-gray-600">
                Features that make us the preferred choice for job seekers
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div key={index} className="bg-white rounded-xl p-6 shadow-md text-center">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon className="h-8 w-8 text-blue-600" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-800 mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600">
                      {feature.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Start Your Career Journey?
            </h2>
            <p className="text-xl opacity-90 mb-8">
              Join thousands of successful job seekers who found their dream careers with RozgaarTrap
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/jobs"
                className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 rounded-lg font-semibold transition-colors"
              >
                Browse Jobs
              </Link>
              <Link
                href="/contact"
                className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 rounded-lg font-semibold transition-colors"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}