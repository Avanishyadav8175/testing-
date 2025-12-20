import ContactForm from '@/components/contact/contact-form';
import { Clock, Headphones, Mail, MapPin, MessageCircle, Phone } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us - Rozgaartap | Get in Touch',
  description: 'Contact Rozgaartap for any queries about jobs, career guidance, or technical support. We are here to help you succeed.',
  keywords: 'contact rozgaartap, customer support, job portal help, career guidance, technical support',
};

export default function ContactPage() {
  const contactInfo = [
    {
      icon: Mail,
      title: 'Email Us',
      details: 'info@rozgaartap.com',
      subDetails: 'support@rozgaartap.com',
      color: 'bg-blue-500'
    },
    {
      icon: Phone,
      title: 'Call Us',
      details: '+91 12345 67890',
      subDetails: 'Mon-Fri: 9 AM - 6 PM',
      color: 'bg-green-500'
    },
    {
      icon: MapPin,
      title: 'Visit Us',
      details: '123 Career Street',
      subDetails: 'Job City, India 110001',
      color: 'bg-red-500'
    },
    {
      icon: Clock,
      title: 'Working Hours',
      details: 'Monday - Friday',
      subDetails: '9:00 AM - 6:00 PM IST',
      color: 'bg-purple-500'
    }
  ];

  const supportTypes = [
    {
      icon: MessageCircle,
      title: 'General Inquiry',
      description: 'Questions about our services, partnerships, or general information.',
      color: 'bg-blue-100 text-blue-600'
    },
    {
      icon: Headphones,
      title: 'Technical Support',
      description: 'Issues with website functionality, account access, or technical problems.',
      color: 'bg-green-100 text-green-600'
    },
    {
      icon: Mail,
      title: 'Career Guidance',
      description: 'Need help with job search, resume building, or career planning.',
      color: 'bg-orange-100 text-orange-600'
    }
  ];

  const faqs = [
    {
      question: 'How do I apply for jobs posted on Rozgaartap?',
      answer: 'Click on any job listing to view details and find the "Apply Now" button which will redirect you to the official application portal.'
    },
    {
      question: 'Are all job postings on your website genuine?',
      answer: 'Yes, we verify all job postings from official sources and government websites to ensure authenticity.'
    },
    {
      question: 'How can I get notifications for new job postings?',
      answer: 'Subscribe to our newsletter or enable browser notifications to get instant updates about new opportunities.'
    },
    {
      question: 'Do you charge any fees for job applications?',
      answer: 'No, Rozgaartap is completely free for job seekers. We never charge any fees for accessing job information.'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Contact Us
            </h1>
            <p className="text-xl md:text-2xl opacity-90 mb-8">
              We're here to help you succeed in your career journey
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
              {contactInfo.map((info, index) => {
                const Icon = info.icon;
                return (
                  <div key={index} className="bg-white rounded-2xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow">
                    <div className={`w-16 h-16 ${info.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                      <Icon className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">
                      {info.title}
                    </h3>
                    <p className="text-gray-600 font-semibold">
                      {info.details}
                    </p>
                    <p className="text-gray-500 text-sm">
                      {info.subDetails}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form and Support Types */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <div>
                <h2 className="text-3xl font-bold text-gray-800 mb-6">
                  Send us a Message
                </h2>
                <p className="text-gray-600 mb-8">
                  Have a question or need assistance? Fill out the form below and we'll get back to you as soon as possible.
                </p>
                <ContactForm />
              </div>

              {/* Support Types */}
              <div>
                <h2 className="text-3xl font-bold text-gray-800 mb-6">
                  How Can We Help?
                </h2>
                <p className="text-gray-600 mb-8">
                  Choose the type of support you need, and we'll connect you with the right team.
                </p>

                <div className="space-y-6">
                  {supportTypes.map((type, index) => {
                    const Icon = type.icon;
                    return (
                      <div key={index} className="flex items-start space-x-4 p-4 rounded-xl border border-gray-200 hover:border-gray-300 transition-colors">
                        <div className={`w-12 h-12 ${type.color} rounded-lg flex items-center justify-center flex-shrink-0`}>
                          <Icon className="h-6 w-6" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-800 mb-2">
                            {type.title}
                          </h3>
                          <p className="text-gray-600">
                            {type.description}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Office Hours */}
                <div className="mt-8 p-6 bg-gray-50 rounded-xl">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">
                    📞 Need Immediate Help?
                  </h3>
                  <p className="text-gray-600 mb-2">
                    Call us during business hours for immediate assistance:
                  </p>
                  <p className="text-blue-600 font-semibold">
                    +91 12345 67890
                  </p>
                  <p className="text-gray-500 text-sm">
                    Monday - Friday: 9:00 AM - 6:00 PM IST
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
                Frequently Asked Questions
              </h2>
              <p className="text-lg text-gray-600">
                Quick answers to common questions
              </p>
            </div>

            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <div key={index} className="bg-white rounded-xl shadow-md p-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">
                    {faq.question}
                  </h3>
                  <p className="text-gray-600">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Map Section (Placeholder) */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
              Find Us Here
            </h2>
            <div className="bg-gray-200 rounded-2xl h-96 flex items-center justify-center">
              <div className="text-center">
                <MapPin className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">
                  Interactive map will be integrated here
                </p>
                <p className="text-gray-500 text-sm">
                  123 Career Street, Job City, India 110001
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}