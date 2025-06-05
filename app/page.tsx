"use client"
import { useState, useEffect } from 'react';
import { Menu, X, ArrowRight, Check, MessageSquare, Code, Zap, Send, ChevronUp } from 'lucide-react';
import Link from 'next/link';

// Main App Component for Fluttbiz IT Solutions
export default function FluttbizWebsite() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  
  // Form state management
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [emailSubscribe, setEmailSubscribe] = useState('');

  // Handle scroll events for navbar transparency and active section tracking
  useEffect(() => {
    const handleScroll = () => {
      // Check if page is scrolled for navbar styling
      setIsScrolled(window.scrollY > 50);
      
      // Determine active section based on scroll position
      const sections = ["home", "about", "services", "portfolio","team",  "contact",];
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (!element) continue;
        
        const rect = element.getBoundingClientRect();
        if (rect.top <= 100 && rect.bottom >= 100) {
          setActiveSection(section);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Toggle mobile menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Scroll to section
  const scrollToSection = (sectionId:any) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // Handle form input changes
  const handleInputChange = (e:any) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value
    });
  };

  // Handle contact form submission
  const handleContactSubmit = (e:any) => {
    e.preventDefault();
    console.log("Contact form submitted:", formData);
    // Here you would typically send this data to your backend API
    alert("Thank you for your message! We'll get back to you soon.");
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
  };

  // Handle newsletter subscription
  const handleSubscribe = (e:any) => {
    e.preventDefault();
    console.log("Newsletter subscription:", emailSubscribe);
    // Here you would typically send this email to your backend API
    alert("Thank you for subscribing to our newsletter!");
    setEmailSubscribe('');
  };

  return (
    <div className="font-sans text-gray-800 bg-white">
      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'}`}>
        <div className="container mx-auto px-4 md:px-6 flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center">
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">Fluttbiz</span>
            <span className="text-2xl font-medium"> IT Solutions</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            {["Home", "About", "Services", "Portfolio", "Team", "Contact"].map((item) => (
              <button 
                key={item} 
                onClick={() => scrollToSection(item.toLowerCase())}
                className={`font-medium hover:text-blue-600 transition-colors ${activeSection === item.toLowerCase() ? 'text-blue-600' : ''}`}
              >
                {item}
              </button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button onClick={toggleMenu} className="md:hidden">
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-white shadow-lg">
            <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
              {["Home", "About", "Services", "Portfolio", "Contact"].map((item) => (
                <button 
                  key={item} 
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className={`font-medium hover:text-blue-600 transition-colors py-2 ${activeSection === item.toLowerCase() ? 'text-blue-600' : ''}`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="pt-20 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="container mx-auto px-4 md:px-6 py-16 md:py-32 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Digital Marketing & Development 
<span className="bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">Agency</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-8 pl-0.5">
              Fluttbiz IT Solutions delivers high-quality Flutter apps and digital marketing to help businesses grow and scale.


            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={() => scrollToSection('services')}
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-8 rounded-lg transition-colors flex items-center justify-center"
              >
                Our Services <ArrowRight size={18} className="ml-2" />
              </button>
              <button 
                onClick={() => scrollToSection('contact')}
                className="bg-white hover:bg-gray-100 text-blue-600 border border-blue-600 font-medium py-3 px-8 rounded-lg transition-colors"
              >
                Contact Us
              </button>
            </div>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <img src="/banner.png" alt="Digital marketing illustration" className="rounded-lg shadow-lg" />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">About Fluttbiz IT Solutions</h2>
            <div className="w-20 h-1 bg-blue-600 mx-auto mb-6"></div>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            We are a passionate team of digital experts who are committed to assisting your business grow through innovative technology solutions and strategic marketing techniques.

            </p>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2">
              <img src="/our_team.png" alt="Our team" className="rounded-lg shadow-lg" />
            </div>
            <div className="md:w-1/2">
              <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
              <p className="text-gray-600 mb-6">
               To empower businesses with technology solutions for growth, efficiency, and digital transformation in an ever-evolving marketplace.

              </p>
              
              <h3 className="text-2xl font-bold mb-4">Why Choose Us?</h3>
              <ul className="space-y-3">
                {[
                  "Proficiency in digital marketing and development",
                  "Custom strategies for every business, big or small",
                  "Focus on results with clearly defined metrics",
                  "Personalized assistance at every stage of your digital journey"
                ].map((item, index) => (
                  <li key={index} className="flex items-start">
                    <Check className="text-green-500 mr-2 mt-1 flex-shrink-0" size={18} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Services</h2>
            <div className="w-20 h-1 bg-blue-600 mx-auto mb-6"></div>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Comprehensive digital solutions to help your business grow and succeed in today's competitive landscape.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <MessageSquare className="text-blue-600" size={40} />,
                title: "Digital Marketing",
                description: "Strategic marketing campaigns across social media, SEO, email, and paid advertising to increase visibility and drive qualified leads."
              },
              {
                icon: <Code className="text-blue-600" size={40} />,
                title: "Web Development",
                description: "Custom website design and development using cutting-edge technologies to create responsive, user-friendly, and high-performance websites."
              },
              {
                icon: <Zap className="text-blue-600" size={40} />,
                title: "App Development",
                description: "Native and cross-platform mobile applications built to deliver exceptional user experiences and solve real business problems."
              },
              {
                icon: <MessageSquare className="text-blue-600" size={40} />,
                title: "Brand Strategy",
                description: "Comprehensive brand development services to help establish a strong and consistent brand identity across all digital touchpoints."
              },
              {
                icon: <Code className="text-blue-600" size={40} />,
                title: "Telco Apps",
                description:  "We develop robust, user-friendly telco applications that integrate with SMS, USSD, and billing APIs to deliver seamless telecom-based services like balance check, subscriptions, offers, and more. Ideal for telcos, VAS providers, and BDApps-like platforms."
              },
              {
                icon: <Zap className="text-blue-600" size={40} />,
                title: "IT Consulting",
                description: "Expert guidance on technology stack selection, digital transformation strategies, and IT infrastructure optimization."
              }
            ].map((service, index) => (
              <div key={index} className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <div className="mb-4">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                <p className="text-gray-600">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Work</h2>
            <div className="w-20 h-1 bg-blue-600 mx-auto mb-6"></div>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Explore some of our recent projects and see how we've helped businesses achieve their digital goals.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div key={item} className="overflow-hidden rounded-lg shadow-md group">
                <div className="relative">
                  <img src={`/api/placeholder/400/300`} alt={`Project ${item}`} className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                    <div className="p-6">
                      <h3 className="text-white text-xl font-bold mb-2">Project Title {item}</h3>
                      <p className="text-gray-200 mb-3">Web Development, Digital Marketing</p>
                      <button className="text-white bg-blue-600 hover:bg-blue-700 py-2 px-4 rounded text-sm font-medium">View Details</button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


     
     {/* Our Team */}
      <section id="team" className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-slate-900 text-3xl font-bold">Meet our team</h2>
          <p className="text-slate-600 text-sm mt-4 leading-relaxed">Meet our team of professionals to serve you.</p>
        </div>

        <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-6 max-md:justify-center max-sm:max-w-xs mx-auto mt-12">
          <div className="border border-gray-200 rounded-lg overflow-hidden">
            <img src="./alfa.png" className="w-full object-cover object-top aspect-square" />

            <div className="p-4">
              <h4 className="text-slate-900 text-[15px] font-semibold">Mahamudur Rahman</h4>
              <p className="text-slate-600 text-xs mt-1">Founder</p>

              <div className="space-x-4 mt-4">

                <a  href={"https://www.facebook.com/mr.alfa.12"}  target="_blank" rel="noopener noreferrer">                <button type="button"
              
                  className="w-6 h-6 inline-flex items-center justify-center cursor-pointer rounded-full border-none outline-none bg-blue-600 hover:bg-blue-700">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14px" fill="#fff" viewBox="0 0 155.139 155.139">
                    <path
                      d="M89.584 155.139V84.378h23.742l3.562-27.585H89.584V39.184c0-7.984 2.208-13.425 13.67-13.425l14.595-.006V1.08C115.325.752 106.661 0 96.577 0 75.52 0 61.104 12.853 61.104 36.452v20.341H37.29v27.585h23.814v70.761h28.48z"
                      data-original="#010002" />
                  </svg>
                </button></a>
           

                <button type="button"
                  className="w-6 h-6 inline-flex items-center justify-center cursor-pointer rounded-full border-none outline-none bg-[#03a9f4] hover:bg-[#03a1f4]">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14px" fill="#fff" viewBox="0 0 512 512">
                    <path
                      d="M512 97.248c-19.04 8.352-39.328 13.888-60.48 16.576 21.76-12.992 38.368-33.408 46.176-58.016-20.288 12.096-42.688 20.64-66.56 25.408C411.872 60.704 384.416 48 354.464 48c-58.112 0-104.896 47.168-104.896 104.992 0 8.32.704 16.32 2.432 23.936-87.264-4.256-164.48-46.08-216.352-109.792-9.056 15.712-14.368 33.696-14.368 53.056 0 36.352 18.72 68.576 46.624 87.232-16.864-.32-33.408-5.216-47.424-12.928v1.152c0 51.008 36.384 93.376 84.096 103.136-8.544 2.336-17.856 3.456-27.52 3.456-6.72 0-13.504-.384-19.872-1.792 13.6 41.568 52.192 72.128 98.08 73.12-35.712 27.936-81.056 44.768-130.144 44.768-8.608 0-16.864-.384-25.12-1.44C46.496 446.88 101.6 464 161.024 464c193.152 0 298.752-160 298.752-298.688 0-4.64-.16-9.12-.384-13.568 20.832-14.784 38.336-33.248 52.608-54.496z"
                      data-original="#03a9f4" />
                  </svg>
                </button>
                <button type="button"
                  className="w-6 h-6 inline-flex items-center justify-center cursor-pointer rounded-full border-none outline-none bg-[#0077b5] hover:bg-[#0055b5]">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14px" fill="#fff" viewBox="0 0 24 24">
                    <path
                      d="M23.994 24v-.001H24v-8.802c0-4.306-.927-7.623-5.961-7.623-2.42 0-4.044 1.328-4.707 2.587h-.07V7.976H8.489v16.023h4.97v-7.934c0-2.089.396-4.109 2.983-4.109 2.549 0 2.587 2.384 2.587 4.243V24zM.396 7.977h4.976V24H.396zM2.882 0C1.291 0 0 1.291 0 2.882s1.291 2.909 2.882 2.909 2.882-1.318 2.882-2.909A2.884 2.884 0 0 0 2.882 0z"
                      data-original="#0077b5" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

  
          <div className="border border-gray-200 rounded-lg overflow-hidden">
            <img src="./taosif.png" className="w-full object-cover object-top aspect-square" />

            <div className="p-4">
              <h4 className="text-slate-900 text-[15px] font-semibold">Muhammad Taosif</h4>
              <p className="text-slate-600 text-xs mt-1">Founder & Developer</p>

              <div className="space-x-4 mt-4">
                <button type="button"
                  className="w-6 h-6 inline-flex items-center justify-center cursor-pointer rounded-full border-none outline-none bg-blue-600 hover:bg-blue-700">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14px" fill="#fff" viewBox="0 0 155.139 155.139">
                    <path
                      d="M89.584 155.139V84.378h23.742l3.562-27.585H89.584V39.184c0-7.984 2.208-13.425 13.67-13.425l14.595-.006V1.08C115.325.752 106.661 0 96.577 0 75.52 0 61.104 12.853 61.104 36.452v20.341H37.29v27.585h23.814v70.761h28.48z"
                      data-original="#010002" />
                  </svg>
                </button>
                <button type="button"
                  className="w-6 h-6 inline-flex items-center justify-center cursor-pointer rounded-full border-none outline-none bg-[#03a9f4] hover:bg-[#03a1f4]">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14px" fill="#fff" viewBox="0 0 512 512">
                    <path
                      d="M512 97.248c-19.04 8.352-39.328 13.888-60.48 16.576 21.76-12.992 38.368-33.408 46.176-58.016-20.288 12.096-42.688 20.64-66.56 25.408C411.872 60.704 384.416 48 354.464 48c-58.112 0-104.896 47.168-104.896 104.992 0 8.32.704 16.32 2.432 23.936-87.264-4.256-164.48-46.08-216.352-109.792-9.056 15.712-14.368 33.696-14.368 53.056 0 36.352 18.72 68.576 46.624 87.232-16.864-.32-33.408-5.216-47.424-12.928v1.152c0 51.008 36.384 93.376 84.096 103.136-8.544 2.336-17.856 3.456-27.52 3.456-6.72 0-13.504-.384-19.872-1.792 13.6 41.568 52.192 72.128 98.08 73.12-35.712 27.936-81.056 44.768-130.144 44.768-8.608 0-16.864-.384-25.12-1.44C46.496 446.88 101.6 464 161.024 464c193.152 0 298.752-160 298.752-298.688 0-4.64-.16-9.12-.384-13.568 20.832-14.784 38.336-33.248 52.608-54.496z"
                      data-original="#03a9f4" />
                  </svg>
                </button>
                <button type="button"
                  className="w-6 h-6 inline-flex items-center justify-center cursor-pointer rounded-full border-none outline-none bg-[#0077b5] hover:bg-[#0055b5]">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14px" fill="#fff" viewBox="0 0 24 24">
                    <path
                      d="M23.994 24v-.001H24v-8.802c0-4.306-.927-7.623-5.961-7.623-2.42 0-4.044 1.328-4.707 2.587h-.07V7.976H8.489v16.023h4.97v-7.934c0-2.089.396-4.109 2.983-4.109 2.549 0 2.587 2.384 2.587 4.243V24zM.396 7.977h4.976V24H.396zM2.882 0C1.291 0 0 1.291 0 2.882s1.291 2.909 2.882 2.909 2.882-1.318 2.882-2.909A2.884 2.884 0 0 0 2.882 0z"
                      data-original="#0077b5" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <div className="border border-gray-200 rounded-lg overflow-hidden">
            <img src="https://readymadeui.com/team-6.webp" className="w-full object-cover object-top aspect-square" />

            <div className="p-4">
              <h4 className="text-slate-900 text-[15px] font-semibold">Eleanor</h4>
              <p className="text-slate-600 text-xs mt-1">Software Developer</p>

              <div className="space-x-4 mt-4">
                <button type="button"
                  className="w-6 h-6 inline-flex items-center justify-center cursor-pointer rounded-full border-none outline-none bg-blue-600 hover:bg-blue-700">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14px" fill="#fff" viewBox="0 0 155.139 155.139">
                    <path
                      d="M89.584 155.139V84.378h23.742l3.562-27.585H89.584V39.184c0-7.984 2.208-13.425 13.67-13.425l14.595-.006V1.08C115.325.752 106.661 0 96.577 0 75.52 0 61.104 12.853 61.104 36.452v20.341H37.29v27.585h23.814v70.761h28.48z"
                      data-original="#010002" />
                  </svg>
                </button>
                <button type="button"
                  className="w-6 h-6 inline-flex items-center justify-center cursor-pointer rounded-full border-none outline-none bg-[#03a9f4] hover:bg-[#03a1f4]">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14px" fill="#fff" viewBox="0 0 512 512">
                    <path
                      d="M512 97.248c-19.04 8.352-39.328 13.888-60.48 16.576 21.76-12.992 38.368-33.408 46.176-58.016-20.288 12.096-42.688 20.64-66.56 25.408C411.872 60.704 384.416 48 354.464 48c-58.112 0-104.896 47.168-104.896 104.992 0 8.32.704 16.32 2.432 23.936-87.264-4.256-164.48-46.08-216.352-109.792-9.056 15.712-14.368 33.696-14.368 53.056 0 36.352 18.72 68.576 46.624 87.232-16.864-.32-33.408-5.216-47.424-12.928v1.152c0 51.008 36.384 93.376 84.096 103.136-8.544 2.336-17.856 3.456-27.52 3.456-6.72 0-13.504-.384-19.872-1.792 13.6 41.568 52.192 72.128 98.08 73.12-35.712 27.936-81.056 44.768-130.144 44.768-8.608 0-16.864-.384-25.12-1.44C46.496 446.88 101.6 464 161.024 464c193.152 0 298.752-160 298.752-298.688 0-4.64-.16-9.12-.384-13.568 20.832-14.784 38.336-33.248 52.608-54.496z"
                      data-original="#03a9f4" />
                  </svg>
                </button>
                <button type="button"
                  className="w-6 h-6 inline-flex items-center justify-center cursor-pointer rounded-full border-none outline-none bg-[#0077b5] hover:bg-[#0055b5]">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14px" fill="#fff" viewBox="0 0 24 24">
                    <path
                      d="M23.994 24v-.001H24v-8.802c0-4.306-.927-7.623-5.961-7.623-2.42 0-4.044 1.328-4.707 2.587h-.07V7.976H8.489v16.023h4.97v-7.934c0-2.089.396-4.109 2.983-4.109 2.549 0 2.587 2.384 2.587 4.243V24zM.396 7.977h4.976V24H.396zM2.882 0C1.291 0 0 1.291 0 2.882s1.291 2.909 2.882 2.909 2.882-1.318 2.882-2.909A2.884 2.884 0 0 0 2.882 0z"
                      data-original="#0077b5" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <div className="border border-gray-200 rounded-lg overflow-hidden">
            <img src="https://readymadeui.com/team-1.webp" className="w-full object-cover object-top aspect-square" />

            <div className="p-4">
              <h4 className="text-slate-900 text-[15px] font-semibold">Mark Adair</h4>
              <p className="text-slate-600 text-xs mt-1">Software Developer</p>

              <div className="space-x-4 mt-4">
                <button type="button"
                  className="w-6 h-6 inline-flex items-center justify-center cursor-pointer rounded-full border-none outline-none bg-blue-600 hover:bg-blue-700">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14px" fill="#fff" viewBox="0 0 155.139 155.139">
                    <path
                      d="M89.584 155.139V84.378h23.742l3.562-27.585H89.584V39.184c0-7.984 2.208-13.425 13.67-13.425l14.595-.006V1.08C115.325.752 106.661 0 96.577 0 75.52 0 61.104 12.853 61.104 36.452v20.341H37.29v27.585h23.814v70.761h28.48z"
                      data-original="#010002" />
                  </svg>
                </button>
                <button type="button"
                  className="w-6 h-6 inline-flex items-center justify-center cursor-pointer rounded-full border-none outline-none bg-[#03a9f4] hover:bg-[#03a1f4]">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14px" fill="#fff" viewBox="0 0 512 512">
                    <path
                      d="M512 97.248c-19.04 8.352-39.328 13.888-60.48 16.576 21.76-12.992 38.368-33.408 46.176-58.016-20.288 12.096-42.688 20.64-66.56 25.408C411.872 60.704 384.416 48 354.464 48c-58.112 0-104.896 47.168-104.896 104.992 0 8.32.704 16.32 2.432 23.936-87.264-4.256-164.48-46.08-216.352-109.792-9.056 15.712-14.368 33.696-14.368 53.056 0 36.352 18.72 68.576 46.624 87.232-16.864-.32-33.408-5.216-47.424-12.928v1.152c0 51.008 36.384 93.376 84.096 103.136-8.544 2.336-17.856 3.456-27.52 3.456-6.72 0-13.504-.384-19.872-1.792 13.6 41.568 52.192 72.128 98.08 73.12-35.712 27.936-81.056 44.768-130.144 44.768-8.608 0-16.864-.384-25.12-1.44C46.496 446.88 101.6 464 161.024 464c193.152 0 298.752-160 298.752-298.688 0-4.64-.16-9.12-.384-13.568 20.832-14.784 38.336-33.248 52.608-54.496z"
                      data-original="#03a9f4" />
                  </svg>
                </button>
                <button type="button"
                  className="w-6 h-6 inline-flex items-center justify-center cursor-pointer rounded-full border-none outline-none bg-[#0077b5] hover:bg-[#0055b5]">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14px" fill="#fff" viewBox="0 0 24 24">
                    <path
                      d="M23.994 24v-.001H24v-8.802c0-4.306-.927-7.623-5.961-7.623-2.42 0-4.044 1.328-4.707 2.587h-.07V7.976H8.489v16.023h4.97v-7.934c0-2.089.396-4.109 2.983-4.109 2.549 0 2.587 2.384 2.587 4.243V24zM.396 7.977h4.976V24H.396zM2.882 0C1.291 0 0 1.291 0 2.882s1.291 2.909 2.882 2.909 2.882-1.318 2.882-2.909A2.884 2.884 0 0 0 2.882 0z"
                      data-original="#0077b5" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <div className="border border-gray-200 rounded-lg overflow-hidden">
            <img src="https://readymadeui.com/team-2.webp" className="w-full object-cover object-top aspect-square" />

            <div className="p-4">
              <h4 className="text-slate-900 text-[15px] font-semibold">John Doe</h4>
              <p className="text-slate-600 text-xs mt-1">Software Developer</p>

              <div className="space-x-4 mt-4">
                <button type="button"
                  className="w-6 h-6 inline-flex items-center justify-center cursor-pointer rounded-full border-none outline-none bg-blue-600 hover:bg-blue-700">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14px" fill="#fff" viewBox="0 0 155.139 155.139">
                    <path
                      d="M89.584 155.139V84.378h23.742l3.562-27.585H89.584V39.184c0-7.984 2.208-13.425 13.67-13.425l14.595-.006V1.08C115.325.752 106.661 0 96.577 0 75.52 0 61.104 12.853 61.104 36.452v20.341H37.29v27.585h23.814v70.761h28.48z"
                      data-original="#010002" />
                  </svg>
                </button>
                <button type="button"
                  className="w-6 h-6 inline-flex items-center justify-center cursor-pointer rounded-full border-none outline-none bg-[#03a9f4] hover:bg-[#03a1f4]">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14px" fill="#fff" viewBox="0 0 512 512">
                    <path
                      d="M512 97.248c-19.04 8.352-39.328 13.888-60.48 16.576 21.76-12.992 38.368-33.408 46.176-58.016-20.288 12.096-42.688 20.64-66.56 25.408C411.872 60.704 384.416 48 354.464 48c-58.112 0-104.896 47.168-104.896 104.992 0 8.32.704 16.32 2.432 23.936-87.264-4.256-164.48-46.08-216.352-109.792-9.056 15.712-14.368 33.696-14.368 53.056 0 36.352 18.72 68.576 46.624 87.232-16.864-.32-33.408-5.216-47.424-12.928v1.152c0 51.008 36.384 93.376 84.096 103.136-8.544 2.336-17.856 3.456-27.52 3.456-6.72 0-13.504-.384-19.872-1.792 13.6 41.568 52.192 72.128 98.08 73.12-35.712 27.936-81.056 44.768-130.144 44.768-8.608 0-16.864-.384-25.12-1.44C46.496 446.88 101.6 464 161.024 464c193.152 0 298.752-160 298.752-298.688 0-4.64-.16-9.12-.384-13.568 20.832-14.784 38.336-33.248 52.608-54.496z"
                      data-original="#03a9f4" />
                  </svg>
                </button>
                <button type="button"
                  className="w-6 h-6 inline-flex items-center justify-center cursor-pointer rounded-full border-none outline-none bg-[#0077b5] hover:bg-[#0055b5]">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14px" fill="#fff" viewBox="0 0 24 24">
                    <path
                      d="M23.994 24v-.001H24v-8.802c0-4.306-.927-7.623-5.961-7.623-2.42 0-4.044 1.328-4.707 2.587h-.07V7.976H8.489v16.023h4.97v-7.934c0-2.089.396-4.109 2.983-4.109 2.549 0 2.587 2.384 2.587 4.243V24zM.396 7.977h4.976V24H.396zM2.882 0C1.291 0 0 1.291 0 2.882s1.291 2.909 2.882 2.909 2.882-1.318 2.882-2.909A2.884 2.884 0 0 0 2.882 0z"
                      data-original="#0077b5" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 md:py-24 bg-gradient-to-br from-blue-600 to-purple-700 text-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Get In Touch</h2>
            <div className="w-20 h-1 bg-white mx-auto mb-6"></div>
            <p className="text-lg max-w-3xl mx-auto">
              Have a project in mind or want to learn more about our services? Reach out to us today!
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-12">
            <div className="md:w-1/2 bg-white text-gray-800 p-8 rounded-lg shadow-lg">
              <h3 className="text-2xl font-bold mb-6">Send Us a Message</h3>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
                    <input 
                      type="text" 
                      id="name" 
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                    <input 
                      type="email" 
                      id="email" 
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                  <input 
                    type="text" 
                    id="subject" 
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Project Inquiry"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                  <textarea 
                    id="message" 
                    rows={4}
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Tell us about your project or inquiry..."
                  ></textarea>
                </div>
                
                <button 
                  onClick={handleContactSubmit}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-md transition-colors flex items-center justify-center"
                >
                  Send Message <Send size={16} className="ml-2" />
                </button>
              </div>
            </div>
            
            <div className="md:w-1/2">
              <div className="bg-blue-800 p-8 rounded-lg shadow-lg h-full">
                <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
                <div className="space-y-6">
                  <div>
                    <h4 className="text-xl font-semibold mb-2">Location</h4>
                    <p>Barishal,Bangladesh</p>
             
                  </div> 
                  
                  <div>
                    <h4 className="text-xl font-semibold mb-2">Email Us</h4>
                    <p>info@fluttbiz.com</p>
                    <p>support@fluttbiz.com</p>
                  </div>
                  
                  <div>
                    <h4 className="text-xl font-semibold mb-2">Call Us</h4>
                    <p>+880 1636390127</p>
                    <p>+880 1863041468</p>
                  </div>
                  
                  <div>
                    <h4 className="text-xl font-semibold mb-2">Business Hours</h4>
                    <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                    <p>Saturday: 10:00 AM - 2:00 PM</p>
                    <p>Friday: Closed</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Fluttbiz IT Solutions</h3>
              <p className="text-gray-400 mb-4">
                Empowering businesses with innovative digital solutions to achieve sustainable growth and success.
              </p>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                {["Home", "About", "Services", "Portfolio", "Contact"].map((item) => (
                  <li key={item}>
                    <button 
                      onClick={() => scrollToSection(item.toLowerCase())}
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      {item}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Services</h4>
              <ul className="space-y-2">
                {["Digital Marketing", "Web Development", "App Development", "Brand Strategy", "E-commerce", "IT Consulting"].map((item) => (
                  <li key={item} className="text-gray-400 hover:text-white transition-colors">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Newsletter</h4>
              <p className="text-gray-400 mb-4">Subscribe to our newsletter for the latest updates and insights.</p>
              <div className="flex">
                <input 
                  type="email" 
                  placeholder="Your email" 
                  value={emailSubscribe}
                  onChange={(e) => setEmailSubscribe(e.target.value)}
                  className="bg-gray-800 text-white px-4 py-2 rounded-l-md focus:outline-none w-full"
                />
                <button 
                  onClick={handleSubscribe}
                  className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-r-md transition-colors"
                >
                  <Send size={16} />
                </button>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 mb-4 md:mb-0">
              © {new Date().getFullYear()} Fluttbiz IT Solutions. All rights reserved.
            </p>
            
            <div className="flex space-x-4">
              {["Facebook", "Twitter", "LinkedIn", "Instagram"].map((social) => (
                <a key={social} href="#" className="text-gray-400 hover:text-white transition-colors">
                  {social}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>

      {/* Scroll to top button */}
      <button 
        onClick={scrollToTop}
        className="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg transition-colors"
      >
        <ChevronUp size={20} />
      </button>
    </div>
  );
}