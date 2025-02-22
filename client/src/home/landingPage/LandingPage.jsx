import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const LandingPage = () => {
  const features = [
    {
      icon: '🔧',
      title: "End-to-End Customization",
      description: "Full control over every event aspect with our modular platform",
      benefit: "Reduce setup time by 65% while maintaining brand consistency"
    },
    {
      icon: '🤖',
      title: "AI-Powered Optimization",
      description: "Machine learning-driven attendee matching and logistics",
      benefit: "Increase event ROI by an average of 40%"
    },
    {
      icon: '📊',
      title: "Executive Dashboard",
      description: "Real-time KPIs and predictive analytics",
      benefit: "Make data-driven decisions 3x faster"
    },
  ];

  const testimonials = [
    {
      feedback: "Cut our event planning costs by 30% while improving attendee satisfaction",
      author: "Sarah Johnson",
      role: "COO, TechSphere",
      logo: "🏢⚡" // Replace with actual logo component
    },
    {
      feedback: "The most robust platform we've used for global event management",
      author: "Michael Chen",
      role: "Event Director, Fortune 500",
      logo: "🌍💼" // Replace with actual logo component
    },
  ];

  const metrics = [
    { value: "500K+", label: "Events Managed" },
    { value: "99.9%", label: "Platform Uptime" },
    { value: "200+", label: "Global Enterprises" },
    { value: "24/7", label: "Support Coverage" },
  ];

  const ref = useRef();
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <div className="min-h-screen bg-gray-900 overflow-hidden">
      {/* Dynamic Background */}
      <div className="absolute inset-0 opacity-15">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/40 to-indigo-900/40" />
        <motion.div 
          className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-15"
          animate={{ backgroundPosition: ['0% 0%', '100% 100%'] }}
          transition={{ duration: 30, repeat: Infinity }}
        />
      </div>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center">
        <div className="relative z-10 text-center px-4 max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="mb-8">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ duration: 1.5, delay: 0.5 }}
                className="h-1 bg-gradient-to-r from-purple-500 to-indigo-500 mx-auto"
              />
            </div>

            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-indigo-300 bg-clip-text text-transparent leading-tight"
            >
              <span className="inline-block mr-4">🚀</span>
              Enterprise Event Management
              <span className="block md:inline-block md:ml-4">Reimagined</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
              className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto"
            >
              Secure, scalable platform for Fortune 500 companies and global institutions. 
              <span className="block mt-2 text-purple-200">GDPR & SOC2 Compliant</span>
            </motion.p>

            <div className="flex justify-center gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-8 py-4 rounded-xl text-lg font-medium shadow-2xl hover:shadow-purple-500/20 transition-all"
              >
                Request Enterprise Demo
                <span className="ml-3">→</span>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border-2 border-purple-500 text-purple-100 px-8 py-4 rounded-xl text-lg font-medium hover:bg-purple-900/20 transition-all"
              >
                View Case Studies
              </motion.button>
            </div>
          </motion.div>
        </div>

        {/* Animated Background Elements */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-48 h-48 bg-purple-500/10 rounded-full blur-3xl"
          animate={{ scale: [1, 1.2, 1], rotate: [0, 180] }}
          transition={{ duration: 12, repeat: Infinity }}
        />
      </section>

      {/* Metrics Section */}
      <section className="relative py-16 bg-gray-800/50 backdrop-blur-lg">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 max-w-6xl mx-auto text-center">
            {metrics.map((metric, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-indigo-300 bg-clip-text text-transparent">
                  {metric.value}
                </div>
                <div className="text-gray-400 mt-2">{metric.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative py-24 bg-gray-900/80 backdrop-blur-lg" ref={ref}>
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            className="text-4xl font-bold text-center text-white mb-16"
          >
            <span className="bg-gradient-to-r from-purple-400 to-indigo-300 bg-clip-text text-transparent">
              Enterprise-Grade Capabilities
            </span>
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: index * 0.2 }}
                className="bg-gray-800/50 p-8 rounded-2xl border border-gray-700 hover:border-purple-500/40 transition-all"
              >
                <div className="mb-6">
                  <div className="w-14 h-14 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl flex items-center justify-center text-2xl">
                    {feature.icon}
                  </div>
                </div>
                <h3 className="text-2xl font-semibold text-white mb-4">{feature.title}</h3>
                <p className="text-gray-300 mb-4">{feature.description}</p>
                <div className="border-t border-gray-700 pt-4">
                  <p className="text-sm text-purple-300">{feature.benefit}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-gradient-to-br from-gray-900 to-purple-900/30">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-4xl font-bold text-center text-white mb-16"
          >
            Trusted by Industry Leaders
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="bg-gray-800/50 p-8 rounded-2xl border border-gray-700"
              >
                <div className="text-purple-400 text-3xl mb-4">{testimonial.logo}</div>
                <p className="text-2xl text-gray-200 mb-6">“{testimonial.feedback}”</p>
                <div className="border-t border-gray-700 pt-6">
                  <p className="font-semibold text-white">{testimonial.author}</p>
                  <p className="text-gray-400 text-sm">{testimonial.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative py-24 bg-gray-900">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
              Ready to Transform Your Enterprise Events?
            </h2>
            <div className="flex justify-center gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-8 py-4 rounded-xl text-lg font-medium shadow-2xl hover:shadow-purple-500/20 transition-all"
              >
                Start Free Pilot
                <span className="ml-3">→</span>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border-2 border-purple-500 text-purple-100 px-8 py-4 rounded-xl text-lg font-medium hover:bg-purple-900/20 transition-all"
              >
                Contact Sales
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;