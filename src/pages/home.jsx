import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { 
  Search, Users, Briefcase, TrendingUp, Brain, 
  Menu, X, Sun, Moon, Check, ArrowRight, Zap,
  Target, Network, Rocket, Sparkles, ChevronDown,
  Clock, Shield, DollarSign, Globe, Lightbulb, Award,
  Mail, Phone, Building, MessageSquare, Send, CheckCircle2, AlertCircle
} from 'lucide-react';
import ChatBot from './ChatBot';

// Mouse Follower Component (Desktop Only)
const MouseFollower = () => {
  const [isMobile, setIsMobile] = useState(false);
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const springConfig = { damping: 25, stiffness: 200 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (isMobile) return;
    const moveCursor = (e) => {
      cursorX.set(e.clientX - 200);
      cursorY.set(e.clientY - 200);
    };
    window.addEventListener('mousemove', moveCursor);
    return () => window.removeEventListener('mousemove', moveCursor);
  }, [isMobile]);

  if (isMobile) return null;

  return (
    <motion.div
      className="pointer-events-none fixed z-30 h-96 w-96 rounded-full bg-gradient-to-r from-amber-400/20 to-orange-500/20 blur-3xl"
      style={{ left: cursorXSpring, top: cursorYSpring }}
    />
  );
};

// Animated Network Background Component
const AnimatedBackground = ({ darkMode }) => {
  const nodes = Array.from({ length: 40 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 3,
    duration: Math.random() * 30 + 20,
    delay: Math.random() * 5
  }));

  const connections = [];
  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      const distance = Math.sqrt(
        Math.pow(nodes[i].x - nodes[j].x, 2) + 
        Math.pow(nodes[i].y - nodes[j].y, 2)
      );
      if (distance < 30) {
        connections.push({
          from: nodes[i],
          to: nodes[j],
          id: `${i}-${j}`,
          distance: distance
        });
      }
    }
  }

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden opacity-50 md:opacity-100">
      <svg className="absolute inset-0 w-full h-full">
        <defs>
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={darkMode ? "#fbbf24" : "#f59e0b"} stopOpacity="0.15" />
            <stop offset="50%" stopColor={darkMode ? "#f97316" : "#ea580c"} stopOpacity="0.25" />
            <stop offset="100%" stopColor={darkMode ? "#ec4899" : "#db2777"} stopOpacity="0.15" />
          </linearGradient>
        </defs>
        {connections.map((conn) => (
          <line
            key={`static-${conn.id}`}
            x1={`${conn.from.x}%`}
            y1={`${conn.from.y}%`}
            x2={`${conn.to.x}%`}
            y2={`${conn.to.y}%`}
            stroke={darkMode ? "rgba(251, 191, 36, 0.1)" : "rgba(245, 158, 11, 0.15)"}
            strokeWidth="1"
          />
        ))}
        {connections.map((conn, idx) => (
          <motion.line
            key={`pulse-${conn.id}`}
            x1={`${conn.from.x}%`}
            y1={`${conn.from.y}%`}
            x2={`${conn.to.x}%`}
            y2={`${conn.to.y}%`}
            stroke="url(#lineGradient)"
            strokeWidth="2"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ 
              pathLength: [0, 1, 0],
              opacity: [0, 0.8, 0]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: idx * 0.15,
              ease: "easeInOut"
            }}
          />
        ))}
      </svg>

      {nodes.map(node => (
        <motion.div
          key={`node-${node.id}`}
          className="absolute hidden md:block"
          style={{
            left: `${node.x}%`,
            top: `${node.y}%`,
          }}
          animate={{
            x: [0, Math.random() * 30 - 15, 0],
            y: [0, Math.random() * 30 - 15, 0],
          }}
          transition={{
            duration: node.duration,
            repeat: Infinity,
            delay: node.delay,
            ease: "easeInOut"
          }}
        >
          <motion.div
            className={`rounded-full shadow-lg ${darkMode ? 'bg-amber-400' : 'bg-orange-600'}`}
            style={{
              width: `${node.size}px`,
              height: `${node.size}px`,
              boxShadow: darkMode 
                ? '0 0 10px rgba(251, 191, 36, 0.6)' 
                : '0 0 10px rgba(245, 158, 11, 0.6)'
            }}
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.6, 1, 0.6],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: node.delay,
            }}
          />
          <motion.div
            className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 ${
              darkMode ? 'border-amber-400/40' : 'border-orange-600/40'
            }`}
            style={{
              width: `${node.size * 2.5}px`,
              height: `${node.size * 2.5}px`,
            }}
            animate={{
              scale: [1, 1.8, 1],
              opacity: [0.8, 0, 0.8],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: node.delay,
            }}
          />
        </motion.div>
      ))}

      {connections.slice(0, 15).map((conn, idx) => (
        <motion.div
          key={`packet-${conn.id}`}
          className={`absolute w-2 h-2 rounded-full shadow-lg hidden md:block ${
            darkMode ? 'bg-orange-400' : 'bg-orange-600'
          }`}
          style={{
            boxShadow: darkMode 
              ? '0 0 8px rgba(249, 115, 22, 0.8)' 
              : '0 0 8px rgba(234, 88, 12, 0.8)'
          }}
          animate={{
            left: [`${conn.from.x}%`, `${conn.to.x}%`, `${conn.from.x}%`],
            top: [`${conn.from.y}%`, `${conn.to.y}%`, `${conn.from.y}%`],
            opacity: [0, 1, 1, 0],
            scale: [0.5, 1.2, 0.5]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            delay: idx * 0.5,
            ease: "linear"
          }}
        />
      ))}

      {connections.slice(15, 20).map((conn, idx) => (
        <motion.div
          key={`burst-${conn.id}`}
          className={`absolute w-3 h-3 rounded-full hidden md:block ${
            darkMode ? 'bg-pink-400' : 'bg-pink-600'
          }`}
          style={{
            boxShadow: darkMode 
              ? '0 0 12px rgba(236, 72, 153, 0.8)' 
              : '0 0 12px rgba(219, 39, 119, 0.8)'
          }}
          animate={{
            left: [`${conn.from.x}%`, `${conn.to.x}%`],
            top: [`${conn.from.y}%`, `${conn.to.y}%`],
            opacity: [0, 1, 0],
            scale: [0.5, 1.5, 0.5]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: idx * 0.8,
            ease: "easeOut"
          }}
        />
      ))}

      <motion.div
        className={`absolute top-1/4 left-1/4 w-64 h-64 md:w-96 md:h-96 rounded-full blur-3xl ${
          darkMode ? 'bg-amber-400/5' : 'bg-amber-400/10'
        }`}
        animate={{
          scale: [1, 1.2, 1],
          x: [0, 50, 0],
          y: [0, 30, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className={`absolute bottom-1/4 right-1/4 w-64 h-64 md:w-96 md:h-96 rounded-full blur-3xl ${
          darkMode ? 'bg-orange-500/5' : 'bg-orange-400/10'
        }`}
        animate={{
          scale: [1, 1.3, 1],
          x: [0, -50, 0],
          y: [0, -30, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className={`absolute top-1/2 left-1/2 w-64 h-64 md:w-96 md:h-96 rounded-full blur-3xl ${
          darkMode ? 'bg-pink-500/5' : 'bg-pink-400/10'
        }`}
        animate={{
          scale: [1, 1.4, 1],
          x: [-30, 30, -30],
          y: [-20, 20, -20],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
};

const SuperBusinessApp = () => {
  const [darkMode, setDarkMode] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);
  const [hoveredPillar, setHoveredPillar] = useState(null);
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.8]);

  const [showContactForm, setShowContactForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    subject: '',
    message: '',
    pillarInterest: '',
    planInterest: ''
  });
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [submitMessage, setSubmitMessage] = useState('');

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  useEffect(() => {
    const timer = setTimeout(() => {
      const hasSubmitted = false;
      const hasSeenPopup = false;
      
      if (!hasSubmitted && !hasSeenPopup) {
        setShowContactForm(true);
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.name.trim() || formData.name.length < 2) {
      errors.name = 'Name must be at least 2 characters';
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email)) {
      errors.email = 'Please provide a valid email';
    }
    if (formData.phone && !/^[0-9]{10}$/.test(formData.phone.replace(/\s/g, ''))) {
      errors.phone = 'Please provide a valid 10-digit phone number';
    }
    if (!formData.subject.trim() || formData.subject.length < 5) {
      errors.subject = 'Subject must be at least 5 characters';
    }
    if (!formData.message.trim() || formData.message.length < 10) {
      errors.message = 'Message must be at least 10 characters';
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setSubmitStatus('success');
      setSubmitMessage('Thank you! Your enquiry has been submitted successfully.');
      
      setFormData({
        name: '', email: '', phone: '', company: '',
        subject: '', message: '', pillarInterest: '', planInterest: ''
      });
      setTimeout(() => {
        setShowContactForm(false);
        setSubmitStatus(null);
      }, 3000);
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus('error');
      setSubmitMessage('Network error. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const pillars = [
    {
      icon: Search,
      title: "Lead Hub",
      description: "B2B & B2C lead generation platform connecting buyers and sellers instantly",
      color: "from-amber-400 to-cyan-500",
      features: ["10M+ Businesses", "Real-time Leads", "Smart Matching"]
    },
    {
      icon: Users,
      title: "Networking Hub",
      description: "Professional networking ecosystem for entrepreneurs and business leaders",
      color: "from-rose-500 to-pink-600",
      features: ["Global Network", "Events & Meetups", "Referral System"]
    },
    {
      icon: Briefcase,
      title: "Business Suite",
      description: "Complete CRM and project management tools for business operations",
      color: "from-pink-600 to-pink-600",
      features: ["CRM & Sales", "Project Manager", "Team Collaboration"]
    },
    {
      icon: TrendingUp,
      title: "Investor Connect",
      description: "Bridge between startups and investors for funding opportunities",
      color: "from-pink-600 to-rose-600",
      features: ["Pitch Deck Builder", "Investor Database", "Funding Tracker"]
    },
    {
      icon: Brain,
      title: "AI Growth",
      description: "AI-powered business assistant for strategy, insights, and automation",
      color: "from-amber-400 to-orange-500",
      features: ["Smart Analytics", "Auto Marketing", "24/7 AI Assistant"]
    }
  ];

  const advantages = [
    {
      icon: Clock,
      title: "Save 20+ Hours Weekly",
      description: "Automate repetitive tasks and streamline your workflow",
      color: "from-amber-400 to-cyan-500"
    },
    {
      icon: DollarSign,
      title: "Reduce Costs by 60%",
      description: "One subscription replaces multiple expensive tools",
      color: "from-rose-500 to-pink-600"
    },
    {
      icon: Shield,
      title: "Enterprise-Grade Security",
      description: "Bank-level encryption and compliance standards",
      color: "from-pink-600 to-pink-600"
    },
    {
      icon: Globe,
      title: "Global Reach",
      description: "Connect with businesses across 150+ countries",
      color: "from-pink-600 to-rose-600"
    },
    {
      icon: Lightbulb,
      title: "AI-Powered Insights",
      description: "Get actionable recommendations in real-time",
      color: "from-rose-600 to-orange-600"
    },
    {
      icon: Award,
      title: "Proven Success",
      description: "Join 50,000+ businesses growing faster",
      color: "from-amber-400 to-orange-500"
    }
  ];

  const faqs = [
    {
      question: "How is B2LINK different from using separate tools?",
      answer: "B2LINK unifies five powerful platforms into one seamless ecosystem. Instead of managing separate subscriptions, logins, and data across multiple tools, everything is integrated and works together automatically. This means better data insights, faster workflows, and significant cost savings."
    },
    {
      question: "Can I integrate my existing tools?",
      answer: "Yes! B2LINK offers API access and pre-built integrations with popular tools. Our Professional and Enterprise plans include custom integration support to ensure a smooth transition from your current setup."
    },
    {
      question: "What kind of support do you offer?",
      answer: "All plans include email support. Professional plans get priority support with faster response times. Enterprise customers receive a dedicated account manager and 24/7 phone support."
    },
    {
      question: "Is my data secure?",
      answer: "Absolutely. We use bank-level encryption, comply with GDPR and SOC 2 standards, and conduct regular security audits. Your data is stored in secure, redundant data centers with automatic backups."
    },
    {
      question: "Can I switch plans later?",
      answer: "Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately, and we'll prorate any differences in your billing."
    },
    {
      question: "Do you offer a free trial?",
      answer: "Yes! We offer a 14-day free trial with full access to all features. No credit card required to start."
    }
  ];

  const plans = [
    {
      name: "Starter",
      price: "₹999",
      period: "/month",
      features: [
        "Access to Lead Hub",
        "Basic Networking Features",
        "5 AI Queries/day",
        "Email Support",
        "1 User Account"
      ],
      popular: false
    },
    {
      name: "Professional",
      price: "₹2,999",
      period: "/month",
      features: [
        "All 5 Pillars Access",
        "Unlimited Networking",
        "100 AI Queries/day",
        "Priority Support",
        "5 Team Members",
        "Advanced Analytics",
        "Custom Branding"
      ],
      popular: true
    },
    {
      name: "Enterprise",
      price: "₹9,999",
      period: "/month",
      features: [
        "Everything in Professional",
        "Unlimited AI Queries",
        "Dedicated Account Manager",
        "Unlimited Team Members",
        "API Access",
        "White Label Solution",
        "Custom Integrations"
      ],
      popular: false
    }
  ];

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      darkMode ? 'dark bg-gray-950 text-white' : 'bg-white text-gray-900'
    } relative overflow-x-hidden`}>
      <AnimatedBackground darkMode={darkMode} />
      <MouseFollower />
      
      {/* Navbar - Mobile Responsive */}
      <nav className={`fixed top-0 w-full z-50 backdrop-blur-xl border-b ${
        darkMode ? 'bg-gray-950/80 border-gray-800' : 'bg-white/80 border-gray-200'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <motion.div
              className="flex items-center"
              whileHover={{ scale: 1.05 }}
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              style={{ cursor: 'pointer' }}
            >
              <img
                src="/logo.png"
                alt="B2LINK Logo"
                className="h-32 sm:h-40 md:h-52 w-auto mx-auto"
              />
            </motion.div>


            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              {['Features', 'Pillars', 'Pricing', 'FAQs'].map((item, idx) => (
                <motion.a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className={`${
                    darkMode ? 'text-gray-300 hover:text-amber-400' : 'text-gray-700 hover:text-orange-600'
                  } transition-colors`}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  whileHover={{ y: -2 }}
                >
                  {item}
                </motion.a>
              ))}
              <motion.button
                onClick={() => setDarkMode(!darkMode)}
                className={`p-2 rounded-lg ${
                  darkMode ? 'bg-gray-800 text-gray-300 hover:text-amber-400' : 'bg-gray-100 text-gray-700 hover:text-orange-600'
                } transition-colors`}
                whileHover={{ scale: 1.1, rotate: 180 }}
                whileTap={{ scale: 0.9 }}
              >
                {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </motion.button>
              <motion.button 
                className="px-6 py-2 rounded-lg bg-gradient-to-r from-amber-400 to-orange-500 text-white font-semibold hover:shadow-lg hover:shadow-amber-400/50 transition-all"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowContactForm(true)}
              >
                Get Started
              </motion.button>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex md:hidden items-center gap-2">
              <motion.button
                onClick={() => setDarkMode(!darkMode)}
                className={`p-2 rounded-lg ${
                  darkMode ? 'bg-gray-800 text-gray-300' : 'bg-gray-100 text-gray-700'
                }`}
                whileTap={{ scale: 0.9 }}
              >
                {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </motion.button>
              <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                {mobileMenuOpen ? (
                  <X className={`w-6 h-6 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`} />
                ) : (
                  <Menu className={`w-6 h-6 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`} />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className={`md:hidden border-t ${
              darkMode ? 'bg-gray-950 border-gray-800' : 'bg-white border-gray-200'
            }`}
          >
            <div className="px-4 py-4 space-y-3">
              {['Features', 'Pillars', 'Pricing', 'FAQs'].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block py-2 px-4 rounded-lg ${
                    darkMode ? 'text-gray-300 hover:bg-gray-800' : 'text-gray-700 hover:bg-gray-100'
                  } transition-colors`}
                >
                  {item}
                </a>
              ))}
              <button 
                onClick={() => {
                  setShowContactForm(true);
                  setMobileMenuOpen(false);
                }}
                className="w-full py-3 px-4 rounded-lg bg-gradient-to-r from-amber-400 to-orange-500 text-white font-semibold"
              >
                Get Started
              </button>
            </div>
          </motion.div>
        )}
      </nav>

      {/* Hero Section - Mobile Responsive */}
      <motion.section 
        style={{ opacity, scale }}
        className="relative pt-24 sm:pt-32 pb-12 sm:pb-20 px-4 overflow-hidden"
      >
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-center">
            {/* Left Side - Text Content */}
            <div className="text-center lg:text-left space-y-6 sm:space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <motion.span 
                  className={`inline-flex items-center px-3 sm:px-4 py-2 rounded-full border text-xs sm:text-sm font-semibold ${
                    darkMode 
                      ? 'bg-amber-400/10 border-amber-400/20 text-amber-400' 
                      : 'bg-amber-50 border-amber-200 text-orange-700'
                  }`}
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                  5 Platforms. 1 Super App. Infinite Growth.
                </motion.span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className={`text-3xl sm:text-5xl lg:text-7xl font-bold leading-tight ${
                  darkMode ? 'text-gray-100' : 'text-gray-900'
                }`}
              >
                All Your Business Power
                <br />
                <span className="bg-gradient-to-r from-amber-400 via-orange-500 to-pink-600 bg-clip-text text-transparent">
                  In One Unified App
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className={`text-base sm:text-xl ${
                  darkMode ? 'text-gray-400' : 'text-gray-600'
                }`}
              >
                Stop juggling multiple platforms. Get lead generation, networking, CRM, investor connections, and AI-powered growth tools—all unified in one powerful ecosystem.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start"
              >
                <motion.button 
                  className="group px-6 sm:px-8 py-3 sm:py-4 rounded-xl bg-gradient-to-r from-amber-400 to-orange-500 text-white font-bold text-base sm:text-lg hover:shadow-2xl hover:shadow-amber-400/50 transition-all flex items-center justify-center"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowContactForm(true)}
                >
                  Start Free Trial
                  <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
                </motion.button>
                <motion.button 
                  className={`px-6 sm:px-8 py-3 sm:py-4 rounded-xl backdrop-blur-sm font-bold text-base sm:text-lg border transition-all ${
                    darkMode 
                      ? 'bg-gray-800/50 text-gray-300 border-gray-700 hover:border-amber-400' 
                      : 'bg-gray-50 text-gray-700 border-gray-300 hover:border-orange-500'
                  }`}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Watch Demo
                </motion.button>
              </motion.div>

              {/* Floating Icons - Hidden on mobile */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="hidden sm:flex gap-4 pt-4 justify-center lg:justify-start"
              >
                {pillars.slice(0, 5).map((pillar, idx) => (
                  <motion.div
                    key={idx}
                    className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br ${pillar.color} flex items-center justify-center shadow-lg`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ 
                      opacity: 1, 
                      y: [0, -10, 0],
                    }}
                    transition={{ 
                      delay: 0.8 + idx * 0.1,
                      y: {
                        repeat: Infinity,
                        repeatType: "reverse",
                        duration: 2 + idx * 0.2
                      }
                    }}
                    whileHover={{ scale: 1.2, rotate: 360 }}
                  >
                    <pillar.icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </motion.div>
                ))}
              </motion.div>
            </div>

            {/* Right Side - Laptop Mockup (Hidden on mobile, shown on tablet+) */}
            <motion.div
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="hidden lg:block relative"
            >
              <div className="relative">
                <div className={`relative rounded-t-2xl border-8 overflow-hidden ${
                  darkMode ? 'border-gray-800 bg-gray-900' : 'border-gray-300 bg-white'
                }`} style={{ paddingTop: '62.5%' }}>
                  <div className="absolute inset-0 p-2">
                    <motion.div
                      className={`w-full h-full rounded-lg overflow-hidden ${
                        darkMode ? 'bg-gray-950' : 'bg-white'
                      }`}
                      style={{ boxShadow: 'inset 0 0 20px rgba(0,0,0,0.2)' }}
                    >
                      <motion.div
                        animate={{ y: [0, -2000, 0] }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        className="space-y-6 p-6"
                      >
                        <div className={`flex justify-between items-center p-3 rounded-lg ${
                          darkMode ? 'bg-gray-800/80' : 'bg-gray-100'
                        }`}>
                          <div className="flex items-center gap-2">
                            <Zap className="w-5 h-5 text-amber-400" />
                            <span className={`text-xs font-bold ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>B2LINK</span>
                          </div>
                          <div className="flex gap-3 text-xs">
                            <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Features</span>
                            <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Pricing</span>
                          </div>
                        </div>

                        <div className="text-center space-y-3 py-6">
                          <h1 className={`text-lg font-bold ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                            All Your Business
                          </h1>
                          <p className={`text-xs ${darkMode ? 'text-amber-400' : 'text-orange-600'}`}>
                            In One Unified App
                          </p>
                          <p className={`text-xs px-4 ${darkMode ? 'text-gray-500' : 'text-gray-600'}`}>
                            5 Platforms. 1 Super App. Infinite Growth.
                          </p>
                          <div className="flex gap-2 justify-center pt-3">
                            <div className="px-4 py-2 text-xs rounded-lg bg-gradient-to-r from-amber-400 to-orange-500 text-white font-semibold">
                              Start Free
                            </div>
                            <div className={`px-4 py-2 text-xs rounded-lg border ${darkMode ? 'bg-gray-800 border-gray-700 text-gray-300' : 'bg-white border-gray-300 text-gray-700'}`}>
                              Demo
                            </div>
                          </div>
                        </div>

                        <div className="space-y-3">
                          <h2 className={`text-sm font-bold text-center ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                            Five Powerful <span className="text-amber-400">Pillars</span>
                          </h2>
                          <div className="grid grid-cols-1 gap-3">
                            {pillars.map((pillar, i) => (
                              <motion.div
                                key={i}
                                className={`p-3 rounded-xl border ${darkMode ? 'bg-gray-800/50 border-gray-700' : 'bg-white border-gray-200'}`}
                                animate={{ scale: [1, 1.02, 1] }}
                                transition={{ duration: 2, delay: i * 0.3, repeat: Infinity }}
                              >
                                <div className="flex items-start gap-3">
                                  <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${pillar.color} flex items-center justify-center flex-shrink-0`}>
                                    <pillar.icon className="w-5 h-5 text-white" />
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <h3 className={`text-xs font-bold mb-1 ${darkMode ? 'text-gray-200' : 'text-gray-900'}`}>
                                      {pillar.title}
                                    </h3>
                                    <p className={`text-xs leading-tight ${darkMode ? 'text-gray-500' : 'text-gray-600'}`}>
                                      {pillar.description}
                                    </p>
                                    <div className="flex flex-wrap gap-1 mt-2">
                                      {pillar.features.map((feature, idx) => (
                                        <span key={idx} className={`text-xs px-2 py-0.5 rounded ${darkMode ? 'bg-gray-700 text-gray-400' : 'bg-gray-100 text-gray-600'}`}>
                                          {feature}
                                        </span>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                              </motion.div>
                            ))}
                          </div>
                        </div>

                        <div className="space-y-3 mt-8">
                          <h2 className={`text-sm font-bold text-center ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                            Why Choose <span className="text-amber-400">B2LINK</span>
                          </h2>
                          <div className="grid grid-cols-2 gap-2">
                            {advantages.slice(0, 4).map((adv, i) => (
                              <div key={i} className={`p-2 rounded-lg ${darkMode ? 'bg-gray-800/50' : 'bg-gray-100'}`}>
                                <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${adv.color} flex items-center justify-center mb-2`}>
                                  <adv.icon className="w-4 h-4 text-white" />
                                </div>
                                <h4 className={`text-xs font-bold mb-1 ${darkMode ? 'text-gray-200' : 'text-gray-900'}`}>
                                  {adv.title}
                                </h4>
                                <p className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-600'}`}>
                                  {adv.description}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="space-y-3 mt-8">
                          <h2 className={`text-sm font-bold text-center ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                            Simple <span className="text-amber-400">Pricing</span>
                          </h2>
                          <div className="grid grid-cols-3 gap-2">
                            {plans.map((plan, i) => (
                              <div
                                key={i}
                                className={`p-3 rounded-xl border ${
                                  plan.popular
                                    ? 'border-amber-400 bg-amber-400/10' 
                                    : darkMode ? 'border-gray-700 bg-gray-800/50' : 'border-gray-300 bg-white'
                                }`}
                              >
                                <h4 className={`text-xs font-bold mb-1 ${darkMode ? 'text-gray-200' : 'text-gray-900'}`}>
                                  {plan.name}
                                </h4>
                                <div className="text-sm font-bold text-amber-400 mb-2">{plan.price}</div>
                                <div className="space-y-1">
                                  {plan.features.slice(0, 3).map((feature, idx) => (
                                    <div key={idx} className={`text-xs flex items-start gap-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                      <Check className="w-3 h-3 text-amber-400 flex-shrink-0 mt-0.5" />
                                      <span className="leading-tight">{feature}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className={`text-center text-xs mt-8 py-4 rounded-lg ${darkMode ? 'bg-gray-800/50 text-gray-500' : 'bg-gray-100 text-gray-600'}`}>
                          © 2025 B2LINK . All rights reserved.
                        </div>
                      </motion.div>
                    </motion.div>
                  </div>
                  
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none"
                    animate={{ opacity: [0.1, 0.3, 0.1] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  />
                </div>

                <div className={`h-4 rounded-b-2xl border-x-8 border-b-8 ${
                  darkMode ? 'border-gray-800 bg-gray-800' : 'border-gray-300 bg-gray-300'
                }`}></div>

                <div className={`h-2 rounded-b-3xl mx-auto ${
                  darkMode ? 'bg-gray-800' : 'bg-gray-300'
                }`} style={{ width: '80%' }}></div>

                <motion.div
                  className="absolute inset-0 -z-10 blur-3xl"
                  animate={{
                    background: [
                      'radial-gradient(circle at 50% 50%, rgba(251, 191, 36, 0.3) 0%, transparent 70%)',
                      'radial-gradient(circle at 50% 50%, rgba(249, 115, 22, 0.3) 0%, transparent 70%)',
                      'radial-gradient(circle at 50% 50%, rgba(251, 191, 36, 0.3) 0%, transparent 70%)',
                    ]
                  }}
                  transition={{ duration: 5, repeat: Infinity }}
                />
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Advantages Section - Mobile Responsive */}
      <section id="features" className="py-12 sm:py-20 px-4 relative">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12 sm:mb-16"
          >
            <h2 className={`text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 ${
              darkMode ? 'text-gray-100' : 'text-gray-900'
            }`}>
              Why Businesses <span className="bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">Love B2LINK</span>
            </h2>
            <p className={`text-base sm:text-xl max-w-3xl mx-auto px-4 ${
              darkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>
              Discover the powerful advantages that set us apart from traditional business tools
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {advantages.map((advantage, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, rotateY: -90 }}
                whileInView={{ opacity: 1, rotateY: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                whileHover={{ 
                  rotateY: 10,
                  rotateX: 10,
                  scale: 1.05,
                  transition: { duration: 0.3 }
                }}
                className={`p-6 sm:p-8 rounded-2xl backdrop-blur-sm border transition-all cursor-pointer perspective-1000 ${
                  darkMode 
                    ? 'bg-gray-800/30 border-gray-700 hover:border-amber-400' 
                    : 'bg-white border-gray-200 hover:border-amber-400 shadow-lg'
                }`}
                style={{ transformStyle: 'preserve-3d' }}
              >
                <motion.div 
                  className={`w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-gradient-to-br ${advantage.color} flex items-center justify-center mb-4 sm:mb-6`}
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <advantage.icon className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
                </motion.div>
                <h3 className={`text-xl sm:text-2xl font-bold mb-3 sm:mb-4 ${
                  darkMode ? 'text-gray-100' : 'text-gray-900'
                }`}>
                  {advantage.title}
                </h3>
                <p className={`text-sm sm:text-base ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  {advantage.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>



      {/* Five Pillars Section - COMPLETELY REDESIGNED FOR MOBILE */}
     
      <section id="pillars" className={`py-12 sm:py-20 lg:py-32 px-4 relative ${
        darkMode ? 'bg-gradient-to-b from-transparent to-gray-900/50' : 'bg-gradient-to-b from-white to-gray-50'
      }`}>
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12 sm:mb-20"
          >
            <motion.div
              animate={{
                scale: [1, 1.05, 1],
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <h2 className={`text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold mb-4 sm:mb-6 ${
                darkMode ? 'text-gray-100' : 'text-gray-900'
              }`}>
                Five Powerful <span className="bg-gradient-to-r from-amber-400 via-orange-500 to-pink-600 bg-clip-text text-transparent">Pillars</span>
              </h2>
            </motion.div>
            <p className={`text-base sm:text-lg lg:text-xl max-w-3xl mx-auto ${
              darkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>
              Each pillar is a complete platform. Together, they create an unstoppable business ecosystem.
            </p>
          </motion.div>
 
          {/* Desktop: Interactive Card Deck - ONLY SHOWS ON LARGE SCREENS */}
          <div className="hidden lg:flex relative h-[650px] items-center justify-center">
            {/* Navigation Arrows */}
            <motion.button
              onClick={() => setHoveredPillar(hoveredPillar === null ? 4 : (hoveredPillar - 1 + pillars.length) % pillars.length)}
              className={`absolute left-4 z-30 w-14 h-14 rounded-full backdrop-blur-xl border-2 flex items-center justify-center transition-all ${
                darkMode
                  ? 'bg-gray-800/80 border-amber-400/50 hover:border-amber-400'
                  : 'bg-white/80 border-amber-400/50 hover:border-amber-400'
              }`}
              whileHover={{ scale: 1.1, x: -5 }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronDown className={`w-6 h-6 rotate-90 ${darkMode ? 'text-amber-400' : 'text-orange-600'}`} />
            </motion.button>
 
            <motion.button
              onClick={() => setHoveredPillar(hoveredPillar === null ? 0 : (hoveredPillar + 1) % pillars.length)}
              className={`absolute right-4 z-30 w-14 h-14 rounded-full backdrop-blur-xl border-2 flex items-center justify-center transition-all ${
                darkMode
                  ? 'bg-gray-800/80 border-amber-400/50 hover:border-amber-400'
                  : 'bg-white/80 border-amber-400/50 hover:border-amber-400'
              }`}
              whileHover={{ scale: 1.1, x: 5 }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronDown className={`w-6 h-6 -rotate-90 ${darkMode ? 'text-amber-400' : 'text-orange-600'}`} />
            </motion.button>
 
            {/* Cards Stack */}
            {pillars.map((pillar, idx) => {
              const selectedIndex = hoveredPillar !== null ? hoveredPillar : 2;
              const diff = idx - selectedIndex;
              const absDiff = Math.abs(diff);
             
              let x = 0;
              let y = 0;
              let scale = 1;
              let zIndex = 5;
              let opacity = 1;
              let rotateY = 0;
 
              if (idx === selectedIndex) {
                x = 0;
                y = 0;
                scale = 1.1;
                zIndex = 20;
                opacity = 1;
                rotateY = 0;
              } else if (diff < 0) {
                x = -150 * absDiff - 100;
                y = 20 * absDiff;
                scale = 1 - (absDiff * 0.15);
                zIndex = 5 - absDiff;
                opacity = 0.6 - (absDiff * 0.2);
                rotateY = -30;
              } else {
                x = 150 * absDiff + 100;
                y = 20 * absDiff;
                scale = 1 - (absDiff * 0.15);
                zIndex = 5 - absDiff;
                opacity = 0.6 - (absDiff * 0.2);
                rotateY = 30;
              }
             
              return (
                <motion.div
                  key={idx}
                  className="absolute cursor-pointer"
                  style={{
                    zIndex,
                    perspective: '1000px'
                  }}
                  animate={{
                    x,
                    y,
                    scale,
                    opacity,
                    rotateY,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 30
                  }}
                  onClick={() => setHoveredPillar(idx)}
                  whileHover={idx !== selectedIndex ? { scale: scale * 1.05, y: y - 10 } : {}}
                >
                  <motion.div
                    className={`w-[450px] p-10 rounded-3xl backdrop-blur-xl border-2 shadow-2xl transition-all ${
                      idx === selectedIndex
                        ? darkMode
                          ? 'bg-gray-800/90 border-amber-400'
                          : 'bg-white border-amber-400'
                        : darkMode
                          ? 'bg-gray-800/60 border-gray-700'
                          : 'bg-white/80 border-gray-300'
                    }`}
                    style={{
                      transformStyle: 'preserve-3d'
                    }}
                  >
                    {/* Active Card Effects */}
                    {idx === selectedIndex && (
                      <>
                        {/* Animated Border Particles */}
                        {Array.from({ length: 20 }).map((_, i) => (
                          <motion.div
                            key={i}
                            className="absolute w-2 h-2 rounded-full bg-amber-400"
                            style={{
                              left: `${(i / 20) * 100}%`,
                              top: i % 2 === 0 ? 0 : '100%',
                            }}
                            animate={{
                              scale: [0, 1.5, 0],
                              opacity: [0, 1, 0],
                            }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              delay: i * 0.1,
                            }}
                          />
                        ))}
 
                        {/* Glowing Background */}
                        <motion.div
                          className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${pillar.color} blur-2xl -z-10`}
                          animate={{
                            scale: [1, 1.2, 1],
                            opacity: [0.2, 0.4, 0.2],
                          }}
                          transition={{ duration: 3, repeat: Infinity }}
                        />
 
                        {/* Floating Particles */}
                        {Array.from({ length: 8 }).map((_, i) => (
                          <motion.div
                            key={`particle-${i}`}
                            className={`absolute w-1 h-1 rounded-full bg-gradient-to-r ${pillar.color}`}
                            style={{
                              left: `${Math.random() * 100}%`,
                              top: `${Math.random() * 100}%`,
                            }}
                            animate={{
                              y: [0, -50, 0],
                              x: [0, Math.random() * 30 - 15, 0],
                              opacity: [0, 1, 0],
                              scale: [0, 2, 0],
                            }}
                            transition={{
                              duration: 3,
                              repeat: Infinity,
                              delay: i * 0.4,
                            }}
                          />
                        ))}
                      </>
                    )}
 
                    {/* Card Number Badge */}
                    <motion.div
                      className={`absolute -top-4 -right-4 w-12 h-12 rounded-full bg-gradient-to-br ${pillar.color} flex items-center justify-center text-white font-bold text-lg shadow-lg`}
                      animate={idx === selectedIndex ? {
                        scale: [1, 1.2, 1],
                        rotate: [0, 360]
                      } : {}}
                      transition={{
                        scale: { duration: 2, repeat: Infinity },
                        rotate: { duration: 20, repeat: Infinity, ease: "linear" }
                      }}
                    >
                      {idx + 1}
                    </motion.div>
 
                    {/* Icon */}
                    <motion.div
                      className={`${idx === selectedIndex ? 'w-24 h-24' : 'w-20 h-20'} mx-auto rounded-2xl bg-gradient-to-br ${pillar.color} flex items-center justify-center mb-6 shadow-lg relative overflow-hidden`}
                      animate={idx === selectedIndex ? {
                        rotate: [0, 360]
                      } : {}}
                      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    >
                      {idx === selectedIndex && (
                        <motion.div
                          className="absolute inset-0 border-4 border-white/30 rounded-2xl"
                          animate={{
                            scale: [1, 1.3, 1],
                            opacity: [0.5, 0, 0.5],
                          }}
                          transition={{ duration: 2, repeat: Infinity }}
                        />
                      )}
                      <pillar.icon className={`${idx === selectedIndex ? 'w-12 h-12' : 'w-10 h-10'} text-white`} />
                    </motion.div>
                   
                    <h3 className={`${idx === selectedIndex ? 'text-3xl' : 'text-2xl'} font-bold mb-3 text-center ${
                      darkMode ? 'text-gray-100' : 'text-gray-900'
                    }`}>
                      {pillar.title}
                    </h3>
                   
                    <p className={`mb-6 text-center ${idx === selectedIndex ? 'text-base' : 'text-sm'} ${
                      darkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      {pillar.description}
                    </p>
                   
                    {/* Features - Only show for selected card */}
                    {idx === selectedIndex && (
                      <>
                        <div className="space-y-3 mb-6">
                          {pillar.features.map((feature, fidx) => (
                            <motion.div
                              key={fidx}
                              className={`flex items-center text-sm ${
                                darkMode ? 'text-gray-300' : 'text-gray-700'
                              }`}
                              initial={{ opacity: 0, x: -30 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: fidx * 0.1 }}
                            >
                              <motion.div
                                className={`w-7 h-7 rounded-full bg-gradient-to-br ${pillar.color} flex items-center justify-center mr-3 flex-shrink-0`}
                                animate={{ rotate: 360 }}
                                transition={{ duration: 3, repeat: Infinity, delay: fidx * 0.2 }}
                              >
                                <Check className="w-3 h-3 text-white" />
                              </motion.div>
                              <span className="font-medium">{feature}</span>
                            </motion.div>
                          ))}
                        </div>
                       
                        {/* Read More Button */}
                        <motion.a
                          href={`/${pillar.title.toLowerCase().replace(/\s+/g, '-')}`}
                          className={`w-full py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all ${
                            darkMode
                              ? 'bg-gray-700 hover:bg-gray-600 text-gray-200'
                              : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
                          }`}
                          whileHover={{ scale: 1.05, y: -2 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          Read More
                          <ArrowRight className="w-4 h-4" />
                        </motion.a>
                      </>
                    )}
                  </motion.div>
                </motion.div>
              );
            })}
 
            {/* Center Glow Effect */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center pointer-events-none"
              animate={{
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <div className={`w-96 h-96 rounded-full bg-gradient-to-r ${pillars[hoveredPillar !== null ? hoveredPillar : 2].color} blur-3xl opacity-20`} />
            </motion.div>
          </div>
 
          {/* Navigation Dots */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 1 }}
            className="hidden lg:block text-center mt-12"
          >
            <motion.p
              className={`text-lg font-medium mb-6 ${
                darkMode ? 'text-gray-400' : 'text-gray-600'
              }`}
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              ✨ Click any card or use arrows to explore
            </motion.p>
            <div className="flex justify-center gap-4">
              {pillars.map((pillar, idx) => (
                <motion.button
                  key={idx}
                  onClick={() => setHoveredPillar(idx)}
                  className={`group flex flex-col items-center gap-2 ${
                    (hoveredPillar !== null ? hoveredPillar : 2) === idx ? '' : 'opacity-50 hover:opacity-100'
                  } transition-opacity`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${pillar.color} flex items-center justify-center shadow-lg`}>
                    <pillar.icon className="w-6 h-6 text-white" />
                  </div>
                  <motion.div
                    className={`h-1 rounded-full bg-gradient-to-r ${pillar.color}`}
                    animate={{
                      width: (hoveredPillar !== null ? hoveredPillar : 2) === idx ? '100%' : '0%',
                    }}
                    transition={{ duration: 0.3 }}
                    style={{ width: '48px' }}
                  />
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Mobile & Tablet: Clean Vertical Stack - SHOWS ON SMALL/MEDIUM SCREENS */}
          <div className="lg:hidden space-y-6">
            {pillars.map((pillar, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className={`relative p-6 sm:p-8 rounded-2xl backdrop-blur-xl border-2 shadow-xl ${
                  darkMode ? 'bg-gray-800/90 border-gray-700' : 'bg-white border-gray-200'
                }`}
              >
                <motion.div
                  className={`absolute -top-3 -right-3 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br ${pillar.color} flex items-center justify-center text-white font-bold text-sm sm:text-base shadow-lg`}
                >
                  {idx + 1}
                </motion.div>

                <motion.div 
                  className={`w-16 h-16 sm:w-20 sm:h-20 mx-auto rounded-2xl bg-gradient-to-br ${pillar.color} flex items-center justify-center mb-4 sm:mb-6 shadow-lg`}
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                >
                  <pillar.icon className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                </motion.div>
                
                <h3 className={`text-xl sm:text-2xl font-bold mb-3 text-center ${
                  darkMode ? 'text-gray-100' : 'text-gray-900'
                }`}>
                  {pillar.title}
                </h3>
                
                <p className={`mb-6 text-center text-sm sm:text-base ${
                  darkMode ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  {pillar.description}
                </p>
                
                <div className="space-y-3 mb-6">
                  {pillar.features.map((feature, fidx) => (
                    <div 
                      key={fidx} 
                      className={`flex items-center text-sm sm:text-base ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}
                    >
                      <div className={`w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-gradient-to-br ${pillar.color} flex items-center justify-center mr-3 flex-shrink-0`}>
                        <Check className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                      </div>
                      <span className="font-medium">{feature}</span>
                    </div>
                  ))}
                </div>
                
                <motion.a
                  href={`/${pillar.title.toLowerCase().replace(/\s+/g, '-')}`}
                  className={`w-full py-3 sm:py-4 rounded-xl font-bold text-sm sm:text-base flex items-center justify-center gap-2 ${
                    darkMode ? 'bg-gray-700 hover:bg-gray-600 text-gray-200' : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
                  }`}
                  whileTap={{ scale: 0.95 }}
                >
                  Read More
                  <ArrowRight className="w-4 h-4" />
                </motion.a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section - MOBILE RESPONSIVE */}
      <section id="pricing" className="py-12 sm:py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12 sm:mb-16"
          >
            <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 ${
              darkMode ? 'text-gray-100' : 'text-gray-900'
            }`}>
              Simple, <span className="bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">Transparent</span> Pricing
            </h2>
            <p className={`text-base sm:text-lg lg:text-xl max-w-3xl mx-auto ${
              darkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>
              Choose the plan that fits your business. All plans include access to our unified ecosystem.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {plans.map((plan, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.2 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className={`relative p-6 sm:p-8 rounded-2xl backdrop-blur-sm border ${
                  plan.popular
                    ? darkMode 
                      ? 'bg-gradient-to-br from-amber-400/10 to-orange-500/10 border-amber-400 shadow-xl'
                      : 'bg-gradient-to-br from-amber-50 to-orange-50 border-amber-400 shadow-xl'
                    : darkMode
                      ? 'bg-gray-800/30 border-gray-700 hover:border-amber-400'
                      : 'bg-white border-gray-200 hover:border-amber-400 shadow-lg'
                }`}
              >
                {plan.popular && (
                  <motion.div 
                    className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 text-white text-xs sm:text-sm font-bold"
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    Most Popular
                  </motion.div>
                )}

                <div className="text-center mb-6 sm:mb-8">
                  <h3 className={`text-xl sm:text-2xl font-bold mb-2 ${
                    darkMode ? 'text-gray-100' : 'text-gray-900'
                  }`}>
                    {plan.name}
                  </h3>
                  <div className="flex items-baseline justify-center">
                    <span className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
                      {plan.price}
                    </span>
                    <span className={`ml-2 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      {plan.period}
                    </span>
                  </div>
                </div>

                <ul className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
                  {plan.features.map((feature, fidx) => (
                    <motion.li 
                      key={fidx} 
                      className={`flex items-start text-sm sm:text-base ${
                        darkMode ? 'text-gray-300' : 'text-gray-700'
                      }`}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: fidx * 0.1 }}
                    >
                      <Check className="w-5 h-5 text-amber-400 mr-3 mt-0.5 flex-shrink-0" />
                      <span>{feature}</span>
                    </motion.li>
                  ))}
                </ul>

                <motion.button 
                  className={`w-full py-3 sm:py-4 rounded-xl font-bold text-sm sm:text-base ${
                    plan.popular
                      ? 'bg-gradient-to-r from-amber-400 to-orange-500 text-white hover:shadow-xl'
                      : darkMode
                        ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowContactForm(true)}
                >
                  Get Started
                </motion.button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section - MOBILE RESPONSIVE */}
      <section id="faqs" className={`py-12 sm:py-20 px-4 ${
        darkMode ? 'bg-gradient-to-b from-gray-900/50 to-transparent' : 'bg-gradient-to-b from-gray-50 to-white'
      }`}>
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12 sm:mb-16"
          >
            <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 ${
              darkMode ? 'text-gray-100' : 'text-gray-900'
            }`}>
              Frequently Asked <span className="bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">Questions</span>
            </h2>
            <p className={`text-base sm:text-lg ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Everything you need to know about B2LINK
            </p>
          </motion.div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className={`rounded-2xl overflow-hidden border ${
                  darkMode ? 'bg-gray-800/30 border-gray-700' : 'bg-white border-gray-200 shadow-md'
                }`}
              >
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className={`w-full px-4 sm:px-6 lg:px-8 py-4 sm:py-5 lg:py-6 flex justify-between items-center text-left ${
                    darkMode ? 'hover:bg-gray-800/50' : 'hover:bg-gray-50'
                  }`}
                >
                  <span className={`text-sm sm:text-base lg:text-lg font-semibold pr-4 ${
                    darkMode ? 'text-gray-100' : 'text-gray-900'
                  }`}>
                    {faq.question}
                  </span>
                  <motion.div
                    animate={{ rotate: openFaq === idx ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown className={`w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0 ${
                      darkMode ? 'text-amber-400' : 'text-orange-600'
                    }`} />
                  </motion.div>
                </button>
                
                <motion.div
                  initial={false}
                  animate={{
                    height: openFaq === idx ? 'auto' : 0,
                    opacity: openFaq === idx ? 1 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className={`px-4 sm:px-6 lg:px-8 pb-4 sm:pb-5 lg:pb-6 text-sm sm:text-base ${
                    darkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    {faq.answer}
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - MOBILE RESPONSIVE */}
      <section className="py-12 sm:py-20 px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className={`max-w-5xl mx-auto text-center p-6 sm:p-10 lg:p-12 rounded-3xl border relative overflow-hidden ${
            darkMode 
              ? 'bg-gradient-to-br from-amber-400/10 to-orange-500/10 border-amber-400/20'
              : 'bg-gradient-to-br from-amber-50 to-orange-50 border-amber-200'
          }`}
        >
          <div className="relative z-10">
            <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 ${
              darkMode ? 'text-gray-100' : 'text-gray-900'
            }`}>
              Ready to <span className="bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">Transform</span> Your Business?
            </h2>
            <p className={`text-base sm:text-lg lg:text-xl mb-6 sm:mb-8 max-w-2xl mx-auto ${
              darkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>
              Join thousands of businesses already growing faster with our unified Super App platform.
            </p>
            <motion.button 
              className="px-6 sm:px-8 lg:px-10 py-3 sm:py-4 lg:py-5 rounded-xl bg-gradient-to-r from-amber-400 to-orange-500 text-white font-bold text-base sm:text-lg inline-flex items-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowContactForm(true)}
            >
              Start Your Free Trial
              <ArrowRight className="ml-2 w-5 h-5 sm:w-6 sm:h-6" />
            </motion.button>
          </div>
        </motion.div>
      </section>

      {/* Footer - MOBILE RESPONSIVE */}
      <footer className={`relative border-t py-8 sm:py-12 px-4 overflow-hidden ${
  darkMode ? 'border-gray-800 bg-gray-950' : 'border-gray-200 bg-gray-50'
}`}>
  {/* Animated Wave Background */}
  <motion.div
    className={`absolute inset-0 ${darkMode ? 'opacity-10' : 'opacity-5'}`}
    animate={{
      backgroundPosition: ['0% 0%', '100% 100%'],
    }}
    transition={{
      duration: 20,
      repeat: Infinity,
      repeatType: 'reverse',
    }}
    style={{
      backgroundImage: 'linear-gradient(45deg, rgba(251, 191, 36, 0.3) 25%, transparent 25%, transparent 75%, rgba(251, 191, 36, 0.3) 75%, rgba(251, 191, 36, 0.3)), linear-gradient(45deg, rgba(251, 191, 36, 0.3) 25%, transparent 25%, transparent 75%, rgba(251, 191, 36, 0.3) 75%, rgba(251, 191, 36, 0.3))',
      backgroundSize: '60px 60px',
      backgroundPosition: '0 0, 30px 30px',
    }}
  />

  <div className="max-w-7xl mx-auto relative z-10">
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
      {/* Brand Section */}
<div className="text-center sm:text-left">
  <motion.div
    className="flex items-center justify-center sm:justify-start mb-4"
    whileHover={{ scale: 1.05 }}
    style={{ cursor: 'pointer' }}
    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
  >
    <img
      src="/logo.png"
      alt="B2LINK Logo"
      className="h-28 sm:h-36 md:h-44 w-auto mx-auto mb-4"
    />
  </motion.div>
  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
    All your business power in one unified ecosystem.
  </p>
</div>
      
      {/* Product Links */}
      <div className="text-center sm:text-left">
        <h4 className={`font-bold mb-4 ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
          Product
        </h4>
        <ul className={`space-y-2 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          <li><a href="#" className="hover:text-amber-400 transition-colors">Features</a></li>
          <li><a href="#" className="hover:text-amber-400 transition-colors">Pricing</a></li>
          <li><a href="#" className="hover:text-amber-400 transition-colors">Use Cases</a></li>
          <li><a href="#" className="hover:text-amber-400 transition-colors">Demo</a></li>
        </ul>
      </div>
      
      {/* Company Links */}
      <div className="text-center sm:text-left">
        <h4 className={`font-bold mb-4 ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
          Company
        </h4>
        <ul className={`space-y-2 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          <li><a href="#" className="hover:text-amber-400 transition-colors">About Us</a></li>
          <li><a href="#" className="hover:text-amber-400 transition-colors">Careers</a></li>
          <li><a href="#" className="hover:text-amber-400 transition-colors">Blog</a></li>
          <li><a href="#" className="hover:text-amber-400 transition-colors">Contact</a></li>
        </ul>
      </div>
      
      {/* Legal Links */}
      <div className="text-center sm:text-left">
        <h4 className={`font-bold mb-4 ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
          Legal
        </h4>
        <ul className={`space-y-2 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          <li><a href="#" className="hover:text-amber-400 transition-colors">Privacy Policy</a></li>
          <li><a href="#" className="hover:text-amber-400 transition-colors">Terms of Service</a></li>
          <li><a href="#" className="hover:text-amber-400 transition-colors">Cookie Policy</a></li>
        </ul>
      </div>
    </div>
    
    {/* Copyright Section */}
    <div className={`border-t pt-6 sm:pt-8 text-center text-xs sm:text-sm ${
      darkMode ? 'border-gray-800 text-gray-400' : 'border-gray-200 text-gray-600'
    }`}>
      <p>© 2025 B2LINK. All rights reserved. Built with 💙 for businesses that dream big.</p>
    </div>
  </div>
</footer>


      <ChatBot/>

      
      {/* <motion.button
        onClick={() => setShowContactForm(true)}
        className={`fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-50 w-14 h-14 sm:w-16 sm:h-16 rounded-full shadow-2xl flex items-center justify-center ${
          darkMode 
            ? 'bg-gradient-to-r from-amber-400 to-orange-500' 
            : 'bg-gradient-to-r from-amber-500 to-orange-600'
        } text-white`}
        whileHover={{ scale: 1.15, rotate: 90 }}
        whileTap={{ scale: 0.95 }}
        animate={{
          boxShadow: [
            "0 0 0 0 rgba(251, 191, 36, 0.7)",
            "0 0 0 10px rgba(251, 191, 36, 0)",
            "0 0 0 0 rgba(251, 191, 36, 0)"
          ]
        }}
        transition={{
          boxShadow: { duration: 2, repeat: Infinity }
        }}
      >
        <MessageSquare className="w-6 h-6 sm:w-7 sm:h-7" />
      </motion.button> */}
     
      {/* Contact Form Modal - FULLY MOBILE RESPONSIVE */}
      {showContactForm && (
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          exit={{ opacity: 0 }} 
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto" 
          onClick={() => !isSubmitting && setShowContactForm(false)}
        >
          <motion.div 
            initial={{ scale: 0.9, y: 50 }} 
            animate={{ scale: 1, y: 0 }} 
            exit={{ scale: 0.9, y: 50 }} 
            className={`relative w-full max-w-4xl my-8 rounded-3xl border shadow-2xl ${
              darkMode ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'
            }`} 
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              onClick={() => !isSubmitting && setShowContactForm(false)} 
              className={`absolute top-4 right-4 sm:top-6 sm:right-6 z-10 w-10 h-10 rounded-full flex items-center justify-center ${
                darkMode ? 'bg-gray-800 text-gray-300 hover:bg-gray-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`} 
              disabled={isSubmitting}
            >
              <X className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>

            <div className="p-6 sm:p-8 lg:p-12 max-h-[85vh] overflow-y-auto">
              <div className="text-center mb-6 sm:mb-8">
                <motion.div 
                  className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 mb-4" 
                  animate={{ rotate: 360 }} 
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                >
                  <Mail className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                </motion.div>
                <h2 className={`text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                  Get in <span className="bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">Touch</span>
                </h2>
                <p className={`text-sm sm:text-base lg:text-lg ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Tell us about your business needs and we'll get back to you within 24 hours
                </p>
              </div>

              {submitStatus && (
                <motion.div 
                  initial={{ opacity: 0, y: -20 }} 
                  animate={{ opacity: 1, y: 0 }} 
                  className={`mb-6 p-4 rounded-xl flex items-start gap-3 ${
                    submitStatus === 'success' 
                      ? darkMode ? 'bg-green-500/10 border border-green-500/20' : 'bg-green-50 border border-green-200' 
                      : darkMode ? 'bg-red-500/10 border border-red-500/20' : 'bg-red-50 border border-red-200'
                  }`}
                >
                  {submitStatus === 'success' ? (
                    <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6 text-green-500 flex-shrink-0 mt-0.5" />
                  ) : (
                    <AlertCircle className="w-5 h-5 sm:w-6 sm:h-6 text-red-500 flex-shrink-0 mt-0.5" />
                  )}
                  <div className="flex-1">
                    <p className={`font-semibold text-sm sm:text-base ${submitStatus === 'success' ? 'text-green-600' : 'text-red-600'}`}>
                      {submitStatus === 'success' ? 'Success!' : 'Error'}
                    </p>
                    <p className={`text-xs sm:text-sm ${
                      submitStatus === 'success' 
                        ? darkMode ? 'text-green-400' : 'text-green-700' 
                        : darkMode ? 'text-red-400' : 'text-red-700'
                    }`}>
                      {submitMessage}
                    </p>
                  </div>
                </motion.div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <label className={`block text-sm font-semibold mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <input 
                        type="text" 
                        name="name" 
                        value={formData.name} 
                        onChange={handleInputChange} 
                        placeholder="John Doe" 
                        disabled={isSubmitting} 
                        className={`w-full px-4 py-3 pl-11 rounded-xl border text-sm sm:text-base ${
                          formErrors.name 
                            ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' 
                            : darkMode 
                              ? 'bg-gray-800 border-gray-700 text-gray-100 focus:border-amber-400 focus:ring-amber-400/20' 
                              : 'bg-white border-gray-300 text-gray-900 focus:border-amber-500 focus:ring-amber-500/20'
                        } focus:ring-4 outline-none disabled:opacity-50`} 
                      />
                      <Users className={`absolute left-3 top-3.5 w-5 h-5 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                    </div>
                    {formErrors.name && <p className="text-red-500 text-xs sm:text-sm mt-1">{formErrors.name}</p>}
                  </div>

                  <div>
                    <label className={`block text-sm font-semibold mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <input 
                        type="email" 
                        name="email" 
                        value={formData.email} 
                        onChange={handleInputChange} 
                        placeholder="john@example.com" 
                        disabled={isSubmitting} 
                        className={`w-full px-4 py-3 pl-11 rounded-xl border text-sm sm:text-base ${
                          formErrors.email 
                            ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' 
                            : darkMode 
                              ? 'bg-gray-800 border-gray-700 text-gray-100 focus:border-amber-400 focus:ring-amber-400/20' 
                              : 'bg-white border-gray-300 text-gray-900 focus:border-amber-500 focus:ring-amber-500/20'
                        } focus:ring-4 outline-none disabled:opacity-50`} 
                      />
                      <Mail className={`absolute left-3 top-3.5 w-5 h-5 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                    </div>
                    {formErrors.email && <p className="text-red-500 text-xs sm:text-sm mt-1">{formErrors.email}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <label className={`block text-sm font-semibold mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Phone Number
                    </label>
                    <div className="relative">
                      <input 
                        type="tel" 
                        name="phone" 
                        value={formData.phone} 
                        onChange={handleInputChange} 
                        placeholder="1234567890" 
                        disabled={isSubmitting} 
                        className={`w-full px-4 py-3 pl-11 rounded-xl border text-sm sm:text-base ${
                          formErrors.phone 
                            ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' 
                            : darkMode 
                              ? 'bg-gray-800 border-gray-700 text-gray-100 focus:border-amber-400 focus:ring-amber-400/20' 
                              : 'bg-white border-gray-300 text-gray-900 focus:border-amber-500 focus:ring-amber-500/20'
                        } focus:ring-4 outline-none disabled:opacity-50`} 
                      />
                      <Phone className={`absolute left-3 top-3.5 w-5 h-5 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                    </div>
                    {formErrors.phone && <p className="text-red-500 text-xs sm:text-sm mt-1">{formErrors.phone}</p>}
                  </div>

                  <div>
                    <label className={`block text-sm font-semibold mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Company Name
                    </label>
                    <div className="relative">
                      <input 
                        type="text" 
                        name="company" 
                        value={formData.company} 
                        onChange={handleInputChange} 
                        placeholder="Your Company Inc." 
                        disabled={isSubmitting} 
                        className={`w-full px-4 py-3 pl-11 rounded-xl border text-sm sm:text-base ${
                          darkMode 
                            ? 'bg-gray-800 border-gray-700 text-gray-100 focus:border-amber-400 focus:ring-amber-400/20' 
                            : 'bg-white border-gray-300 text-gray-900 focus:border-amber-500 focus:ring-amber-500/20'
                        } focus:ring-4 outline-none disabled:opacity-50`} 
                      />
                      <Building className={`absolute left-3 top-3.5 w-5 h-5 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <label className={`block text-sm font-semibold mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Pillar of Interest
                    </label>
                    <select 
                      name="pillarInterest" 
                      value={formData.pillarInterest} 
                      onChange={handleInputChange} 
                      disabled={isSubmitting} 
                      className={`w-full px-4 py-3 rounded-xl border text-sm sm:text-base ${
                        darkMode 
                          ? 'bg-gray-800 border-gray-700 text-gray-100 focus:border-amber-400 focus:ring-amber-400/20' 
                          : 'bg-white border-gray-300 text-gray-900 focus:border-amber-500 focus:ring-amber-500/20'
                      } focus:ring-4 outline-none disabled:opacity-50`}
                    >
                      <option value="">Select a pillar</option>
                      <option value="Lead Hub">Lead Hub</option>
                      <option value="Networking Hub">Networking Hub</option>
                      <option value="Business Suite">Business Suite</option>
                      <option value="Investor Connect">Investor Connect</option>
                      <option value="AI Growth">AI Growth</option>
                      <option value="All Pillars">All Pillars</option>
                    </select>
                  </div>

                  <div>
                    <label className={`block text-sm font-semibold mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Plan of Interest
                    </label>
                    <select 
                      name="planInterest" 
                      value={formData.planInterest} 
                      onChange={handleInputChange} 
                      disabled={isSubmitting} 
                      className={`w-full px-4 py-3 rounded-xl border text-sm sm:text-base ${
                        darkMode 
                          ? 'bg-gray-800 border-gray-700 text-gray-100 focus:border-amber-400 focus:ring-amber-400/20' 
                          : 'bg-white border-gray-300 text-gray-900 focus:border-amber-500 focus:ring-amber-500/20'
                      } focus:ring-4 outline-none disabled:opacity-50`}
                    >
                      <option value="">Select a plan</option>
                      <option value="Starter">Starter</option>
                      <option value="Professional">Professional</option>
                      <option value="Enterprise">Enterprise</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className={`block text-sm font-semibold mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Subject <span className="text-red-500">*</span>
                  </label>
                  <input 
                    type="text" 
                    name="subject" 
                    value={formData.subject} 
                    onChange={handleInputChange} 
                    placeholder="How can we help you?" 
                    disabled={isSubmitting} 
                    className={`w-full px-4 py-3 rounded-xl border text-sm sm:text-base ${
                      formErrors.subject 
                        ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' 
                        : darkMode 
                          ? 'bg-gray-800 border-gray-700 text-gray-100 focus:border-amber-400 focus:ring-amber-400/20' 
                          : 'bg-white border-gray-300 text-gray-900 focus:border-amber-500 focus:ring-amber-500/20'
                    } focus:ring-4 outline-none disabled:opacity-50`} 
                  />
                  {formErrors.subject && <p className="text-red-500 text-xs sm:text-sm mt-1">{formErrors.subject}</p>}
                </div>

                <div>
                  <label className={`block text-sm font-semibold mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Message <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <textarea 
                      name="message" 
                      value={formData.message} 
                      onChange={handleInputChange} 
                      placeholder="Tell us more about your requirements..." 
                      rows="5" 
                      disabled={isSubmitting} 
                      className={`w-full px-4 py-3 pl-11 rounded-xl border resize-none text-sm sm:text-base ${
                        formErrors.message 
                          ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' 
                          : darkMode 
                            ? 'bg-gray-800 border-gray-700 text-gray-100 focus:border-amber-400 focus:ring-amber-400/20' 
                            : 'bg-white border-gray-300 text-gray-900 focus:border-amber-500 focus:ring-amber-500/20'
                      } focus:ring-4 outline-none disabled:opacity-50`} 
                    />
                    <MessageSquare className={`absolute left-3 top-3.5 w-5 h-5 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                  </div>
                  {formErrors.message && <p className="text-red-500 text-xs sm:text-sm mt-1">{formErrors.message}</p>}
                </div>

                <motion.button 
                  type="submit" 
                  disabled={isSubmitting} 
                  className={`w-full py-3 sm:py-4 rounded-xl font-bold text-base sm:text-lg flex items-center justify-center gap-2 ${
                    isSubmitting 
                      ? 'bg-gray-600 cursor-not-allowed' 
                      : 'bg-gradient-to-r from-amber-400 to-orange-500 hover:shadow-xl'
                  } text-white`} 
                  whileHover={!isSubmitting ? { scale: 1.02, y: -2 } : {}} 
                  whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                >
                  {isSubmitting ? (
                    <>
                      <motion.div 
                        className="w-5 h-5 border-3 border-white border-t-transparent rounded-full" 
                        animate={{ rotate: 360 }} 
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }} 
                      />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Send Message
                    </>
                  )}
                </motion.button>

                <p className={`text-xs sm:text-sm text-center ${darkMode ? 'text-gray-500' : 'text-gray-600'}`}>
                  We'll respond within 24 hours. Your information is secure and confidential.
                </p>
              </form>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default SuperBusinessApp;