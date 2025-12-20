import { Award, CheckCircle, Globe, Heart, Target, Users } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us - Rozgaartap | Leading Job Portal in India',
  description: 'Learn about Rozgaartap - Your trusted partner for government jobs, private jobs, admit cards, results, and career opportunities across India.',
  keywords: 'about rozgaartap, job portal, career guidance, employment services, government jobs, private jobs',
};

export default function AboutPage() {
  const stats = [
    { number: '50K+', label: 'Job Seekers', icon: Users },
    { number: '5000+', label: 'Active Jobs', icon: Target },
    { number: '2000+', label: 'Companies', icon: Award },
    { number: '10K+', label: 'Success Stories', icon: Heart },
  ];

  const values = [
    {
      icon: CheckCircle,
      title: 'Reliability',
      description: 'We provide accurate and up-to-date information about job opportunities, ensuring our users can trust the content we deliver.',
    },
    {
      icon: Globe,
      title: 'Accessibility',
      description: 'Our platform is designed to be accessible to everyone, regardless of their background or technical expertise.',
    },
    {
      icon: Heart,
      title: 'Commitment',
      description: 'We are committed to helping job seekers find their dream careers and supporting their professional growth.',
    },
    {
      icon: Award,
      title: 'Excellence',
      description: 'We strive for excellence in everything we do, from content quality to user experience and customer service.',
    },
  ];

  const team = [
    {
      name: 'Santosh',
      role: 'Founder & CEO',
      image: '/team/ceo.jpg',
      description: 'With 15+ years in HR and recruitment, Rajesh founded Rozgaartap to bridge the gap between job seekers and opportunities.',
    },
    {
      name: 'users',
      role: 'Head of Content',
      image: '/team/content-head.jpg',
      description: 'Priya ensures all job postings and content are accurate, timely, and relevant to our users\' needs.',
    },
    {
      name: 'users',
      role: 'Technical Lead',
      image: '/team/tech-lead.jpg',
      description: 'Amit leads our technical team to ensure the platform is fast, secure, and user-friendly.',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              About Rozgaartap
            </h1>
            <p className="text-xl md:text-2xl opacity-90 mb-8">
              Empowering careers, connecting opportunities, and building futures across India
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div key={index} className="text-center">
                    <Icon className="h-8 w-8 mx-auto mb-2 opacity-80" />
                    <div className="text-3xl font-bold">{stat.number}</div>
                    <div className="text-sm opacity-80">{stat.label}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
                Our Story
              </h2>
              <p className="text-lg text-gray-600">
                Founded with a vision to democratize job opportunities across India
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">
                  Bridging the Gap
                </h3>
                <p className="text-gray-600 mb-6">
                  Rozgaartap was born from the realization that talented individuals across India
                  were missing out on opportunities simply because they didn't have access to the
                  right information at the right time.
                </p>
                <p className="text-gray-600 mb-6">
                  We started as a small team passionate about making job searching easier and more
                  transparent. Today, we've grown into India's trusted job portal, serving millions
                  of job seekers and thousands of employers.
                </p>
                <p className="text-gray-600">
                  Our platform specializes in government jobs, private sector opportunities,
                  admit cards, results, and comprehensive career guidance to help you succeed
                  in your professional journey.
                </p>
              </div>
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h4 className="text-xl font-bold text-gray-800 mb-4">Our Mission</h4>
                <p className="text-gray-600 mb-6">
                  To provide equal access to career opportunities for every individual in India,
                  regardless of their background, location, or circumstances.
                </p>
                <h4 className="text-xl font-bold text-gray-800 mb-4">Our Vision</h4>
                <p className="text-gray-600">
                  To become the most trusted and comprehensive career platform in India,
                  empowering millions to achieve their professional dreams.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
                Our Values
              </h2>
              <p className="text-lg text-gray-600">
                The principles that guide everything we do
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => {
                const Icon = value.icon;
                return (
                  <div key={index} className="text-center">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon className="h-8 w-8 text-blue-600" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-3">
                      {value.title}
                    </h3>
                    <p className="text-gray-600">
                      {value.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
                Meet Our Team
              </h2>
              <p className="text-lg text-gray-600">
                The passionate people behind Rozgaartap
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {team.map((member, index) => (
                <div key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden">
                  <div className="h-64 bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center">
                    <div className="w-24 h-24 bg-blue-200 rounded-full flex items-center justify-center">
                      <Users className="h-12 w-12 text-blue-600" />
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-2">
                      {member.name}
                    </h3>
                    <p className="text-blue-600 font-semibold mb-3">
                      {member.role}
                    </p>
                    <p className="text-gray-600">
                      {member.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
              Why Choose Rozgaartap?
            </h2>
            <p className="text-lg text-gray-600 mb-12">
              We're more than just a job portal - we're your career partner
            </p>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white rounded-xl p-8 shadow-md">
                <h3 className="text-xl font-bold text-gray-800 mb-4">
                  🎯 Comprehensive Coverage
                </h3>
                <p className="text-gray-600">
                  From government jobs to private sector opportunities, internships to scholarships -
                  we cover every aspect of your career journey.
                </p>
              </div>
              <div className="bg-white rounded-xl p-8 shadow-md">
                <h3 className="text-xl font-bold text-gray-800 mb-4">
                  ⚡ Real-time Updates
                </h3>
                <p className="text-gray-600">
                  Get instant notifications about new job postings, admit cards, results,
                  and important deadlines so you never miss an opportunity.
                </p>
              </div>
              <div className="bg-white rounded-xl p-8 shadow-md">
                <h3 className="text-xl font-bold text-gray-800 mb-4">
                  🔍 Smart Search
                </h3>
                <p className="text-gray-600">
                  Our advanced search and filtering system helps you find exactly
                  what you're looking for quickly and efficiently.
                </p>
              </div>
              <div className="bg-white rounded-xl p-8 shadow-md">
                <h3 className="text-xl font-bold text-gray-800 mb-4">
                  📱 Mobile Friendly
                </h3>
                <p className="text-gray-600">
                  Access all features on any device. Our responsive design ensures
                  a seamless experience whether you're on mobile, tablet, or desktop.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}