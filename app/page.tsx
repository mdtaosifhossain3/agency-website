"use client";
import { useState, useEffect } from "react";
import {
  Menu,
  X,
  ArrowRight,
  Check,
  Code,
  Send,
  ChevronUp,
  MapPin,
  Mail,
  Phone,
  Linkedin,
  Link,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Smartphone, Video, Search, PenTool } from "lucide-react";
import Image from "next/image";
import emailjs from "@emailjs/browser";

// Animation variants
const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 20 },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const scaleIn = {
  initial: { opacity: 0, scale: 0.8 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.8 },
};

const slideInLeft = {
  initial: { opacity: 0, x: -20 },
  animate: { opacity: 1, x: 0 },
};

const slideInRight = {
  initial: { opacity: 0, x: 20 },
  animate: { opacity: 1, x: 0 },
};

// Main App Component for Fluttbiz IT Solutions
export default function FluttbizWebsite() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  // Form state management
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  // Handle scroll events for navbar transparency and active section tracking
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      const sections = ["home", "about", "services", "portfolio", "contact"];

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

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Toggle mobile menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Scroll to section
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      // Close menu first for better UX
      setIsMenuOpen(false);
      // Add a small delay before scrolling to allow menu animation to complete
      setTimeout(() => {
        element.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  };

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Handle form input changes
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value,
    });
  };

  // Handle contact form submission
  const handleContactSubmit = async (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();

    try {
      // Initialize EmailJS with your public key
      emailjs.init("PbVUnlBROAbnZjFDA"); // Replace with your actual public key

      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        subject: formData.subject,
        message: formData.message,
        to_email: "fluttbizitsolutions@gmail.com",
      };

      await emailjs.send(
        "service_72636pr", // Replace with your EmailJS service ID
        "template_bjtl5h9", // Replace with your EmailJS template ID
        templateParams
      );

      alert("Thank you for your message! We'll get back to you soon.");
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      console.error("Error sending email:", error);
      alert(
        "Sorry, there was an error sending your message. Please try again later."
      );
    }
  };

  // Handle newsletter subscription
  return (
    <motion.div
      initial="initial"
      animate="animate"
      className="font-sans bg-[#0C0F1A] min-h-screen text-white"
    >
      {/* Navigation */}
      <motion.nav
        variants={fadeInUp}
        className={`fixed w-full z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-[#0C0F1A]/90 backdrop-blur-md border-b border-[#3ABEFF]/10 py-2"
            : "bg-transparent py-4"
        }`}
      >
        <div className="container mx-auto px-4 md:px-6 flex justify-between items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2"
          >
            <motion.img
              src={"/logo.png"}
              alt={"Logo"}
              // className="w-full h-full object-cover transition-transform duration-300 "
              width={30}
              height={30}
            />
            {/* <Image src={"/logo.png"} alt="Fluttbiz" width={30} height={30} /> */}
            <p className="text-2xl font-bold text-[#F55A2A]">Fluttbiz</p>
          </motion.div>

          <div className="hidden md:flex space-x-8">
            {["Home", "About", "Services", "Portfolio", "Contact"].map(
              (item) => (
                <motion.button
                  key={item}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className={`font-medium transition-colors ${
                    activeSection === item.toLowerCase()
                      ? "text-[#FBB03B]"
                      : "text-gray-400 hover:text-[#3ABEFF]"
                  }`}
                >
                  {item}
                </motion.button>
              )
            )}
          </div>

          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={toggleMenu}
            className="md:hidden p-2 bg-[#0C0F1A]/80 border border-gray-800 rounded-lg hover:border-[#3ABEFF] transition-colors"
          >
            {isMenuOpen ? (
              <X size={24} className="text-[#3ABEFF]" />
            ) : (
              <Menu size={24} className="text-[#3ABEFF]" />
            )}
          </motion.button>
        </div>

        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden fixed inset-x-0 top-[72px] bg-[#0C0F1A]/95 backdrop-blur-lg border-b border-gray-800"
            >
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="container mx-auto px-4 py-6"
              >
                <div className="flex flex-col space-y-4">
                  {["Home", "About", "Services", "Portfolio", "Contact"].map(
                    (item, index) => (
                      <motion.button
                        key={item}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{
                          opacity: 1,
                          x: 0,
                          transition: { delay: index * 0.1 },
                        }}
                        exit={{ opacity: 0, x: -20 }}
                        whileHover={{ x: 10 }}
                        onClick={() => {
                          scrollToSection(item.toLowerCase());
                          setIsMenuOpen(false); // Ensure menu closes
                        }}
                        className={`flex items-center justify-between w-full p-4 rounded-lg bg-[#1a1f2d]/50 border border-gray-800 hover:border-[#3ABEFF] transition-all ${
                          activeSection === item.toLowerCase()
                            ? "text-[#3ABEFF] border-[#3ABEFF]"
                            : "text-gray-400"
                        }`}
                      >
                        <span className="font-medium">{item}</span>
                        <ArrowRight
                          size={16}
                          className="transform transition-transform group-hover:translate-x-1"
                        />
                      </motion.button>
                    )
                  )}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Hero Section */}
      <section id="home" className=" pt-20 bg-[#0C0F1A] overflow-hidden">
        <motion.div
          initial="initial"
          animate="animate"
          variants={staggerContainer}
          className="container mx-auto px-4 lg:px-6 py-16 lg:py-32 flex flex-col lg:flex-row items-center"
        >
          <motion.div
            variants={fadeInUp}
            className="lg:w-1/2 mb-10 lg:mb-0 space-y-6"
          >
            <motion.div
              variants={fadeInUp}
              className="inline-flex items-center space-x-2"
            >
              <span className="w-12 h-[2px] bg-gradient-to-r from-[#F55A2A] to-[#FBB03B]"></span>
              <span className="text-[#3ABEFF] font-semibold tracking-wider uppercase text-sm">
                Welcome
              </span>
              <span className="text-[#FBB03B] font-semibold tracking-wider uppercase text-sm">
                to Fluttbiz
              </span>
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="text-4xl  lg:text-6xl font-bold leading-tight text-white"
            >
              Turning Concepts into
              <span className="block mt-2 bg-gradient-to-r from-[#F55A2A] via-[#FBB03B] to-[#3ABEFF] text-transparent bg-clip-text">
                Powerful Solutions
              </span>
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="text-lg text-gray-400 max-w-lg"
            >
              We turn bold ideas into digital products that deliver results —
              fast, functional, and future-ready.
            </motion.p>

            <motion.div
              variants={fadeInUp}
              className="flex flex-col sm:flex-row gap-4 pt-4"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => scrollToSection("services")}
                className="bg-gradient-to-r from-[#F55A2A] to-[#FBB03B] hover:from-[#FBB03B] hover:to-[#F55A2A] text-white font-medium py-3 px-8 rounded-lg transition-all flex items-center justify-center group"
              >
                Explore Services
                <ArrowRight
                  size={18}
                  className="ml-2 group-hover:translate-x-1 transition-transform"
                />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => scrollToSection("contact")}
                className="bg-transparent hover:bg-[#3ABEFF]/10 text-[#3ABEFF] border border-[#3ABEFF] font-medium py-3 px-8 rounded-lg transition-colors"
              >
                Get in Touch
              </motion.button>
            </motion.div>
          </motion.div>

          <motion.div
            variants={fadeInUp}
            className="lg:w-1/2 flex justify-center relative"
          >
            <div className="relative w-full max-w-lg">
              {/* Animated background elements */}
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, 90, 0],
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="absolute top-0 -left-4 w-72 h-72 bg-[#F55A2A] rounded-full mix-blend-multiply filter blur-xl opacity-20"
              />

              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, -90, 0],
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="absolute -bottom-8 right-4 w-72 h-72 bg-[#3ABEFF] rounded-full mix-blend-multiply filter blur-xl opacity-20"
              />

              {/* Main illustration */}
              <motion.img
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                src="/hero-illustration.svg"
                alt="Modern web development illustration"
                className="relative z-10 w-full h-auto"
              />

              {/* Floating elements */}
              <motion.div
                animate={{
                  y: [-10, 10, -10],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute top-10 right-10 bg-[#0C0F1A]/80 backdrop-blur-sm p-4 rounded-xl shadow-lg z-20 border border-[#3ABEFF]/20"
              >
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-[#FBB03B]" />
                  <span className="text-sm font-medium text-gray-300">
                    Available for Projects
                  </span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>

        {/* Tech stack pills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="container mx-auto px-4 pb-16"
        ></motion.div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 md:py-24 bg-[#0C0F1A]">
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.3 }}
          variants={staggerContainer}
          className="container mx-auto px-4 md:px-6"
        >
          <motion.div variants={fadeInUp} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
              About Fluttbiz IT Solutions
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-[#F55A2A] to-[#3ABEFF] mx-auto mb-6"></div>
            <motion.p
              variants={fadeInUp}
              className="text-lg text-gray-400 max-w-3xl mx-auto"
            >
              We are a passionate team of digital experts who are committed to
              assisting your business grow through innovative technology
              solutions and strategic marketing techniques.
            </motion.p>
          </motion.div>

          <div className="flex flex-col lg:flex-row items-center gap-12">
            <motion.div variants={slideInLeft} className=" lg:w-1/2 relative">
              <div className="relative z-10">
                <motion.div
                  className="absolute -top-4 -left-4 w-24 h-24 bg-gradient-to-br from-[#F55A2A] to-[#FBB03B] rounded-lg opacity-20 blur-xl"
                  animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, 90, 0],
                  }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />
                <motion.div
                  className="absolute -bottom-4 -right-4 w-24 h-24 bg-gradient-to-br from-[#3ABEFF] to-[#005C99] rounded-lg opacity-20 blur-xl"
                  animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, -90, 0],
                  }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />
                <div className="relative z-10 bg-gradient-to-br from-[#0C0F1A] to-[#1a1f2d] p-1 rounded-lg shadow-xl">
                  <Image
                    src="/about-illustration.svg"
                    alt="About Fluttbiz"
                    width={600}
                    height={400}
                    className="w-full rounded-lg"
                  />
                </div>
              </div>
            </motion.div>

            <motion.div variants={slideInRight} className="">
              <motion.h3
                variants={fadeInUp}
                className="text-2xl font-bold mb-4"
              >
                Our Mission
              </motion.h3>
              <motion.p variants={fadeInUp} className="text-gray-600 mb-6">
                To empower businesses with technology solutions for growth,
                efficiency, and digital transformation in an ever-evolving
                marketplace.
              </motion.p>

              <motion.h3
                variants={fadeInUp}
                className="text-2xl font-bold mb-4"
              >
                Why Choose Us?
              </motion.h3>
              <motion.ul variants={staggerContainer} className="space-y-3">
                {[
                  "Proficiency in digital marketing and development",
                  "Custom strategies for every business",
                  "Focus on results with clearly defined metrics",
                  "Personalized assistance at every stage",
                ].map((item, index) => (
                  <motion.li
                    key={index}
                    variants={fadeInUp}
                    className="flex items-start"
                  >
                    <Check
                      className="text-green-500 mr-2 mt-1 flex-shrink-0"
                      size={18}
                    />
                    <span>{item}</span>
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-16 md:py-24 bg-[#0C0F1A]">
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.3 }}
          variants={staggerContainer}
          className="container mx-auto px-4 md:px-6"
        >
          <motion.div variants={fadeInUp} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
              Our Services
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-[#F55A2A] to-[#3ABEFF] mx-auto mb-6"></div>
            <p className="text-lg text-gray-400 max-w-3xl mx-auto">
              Comprehensive digital solutions to help your business grow and
              succeed in today&apos;s competitive landscape.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {[
              {
                icon: <Smartphone className="text-[#FBB03B]" size={40} />,
                title: "App Development",
                description:
                  "Intuitive and feature-rich mobile applications for iOS and Android platforms that engage users and drive business growth.",
              },
              {
                icon: <Phone className="text-blue-600" size={40} />,
                title: "Telco Apps",
                description:
                  "Custom telecommunications applications that integrate with SMS, USSD, and billing APIs to deliver seamless telecom-based services.",
              },
              {
                icon: <Video className="text-blue-600" size={40} />,
                title: "Video Editing",
                description:
                  "Professional video editing services to create compelling visual content that captivates your audience.",
              },
              {
                icon: <PenTool className="text-blue-600" size={40} />,
                title: "Graphic Design",
                description:
                  "Creative graphic design solutions that communicate your brand message effectively and leave a lasting impression.",
              },
              {
                icon: <Code className="text-blue-600" size={40} />,
                title: "Web Development",
                description:
                  "Custom web development services to create responsive, user-friendly websites that meet your business objectives.",
              },
              {
                icon: <Search className="text-blue-600" size={40} />,
                title: "SEO",
                description:
                  "Strategic search engine optimization to improve your online visibility and drive organic traffic to your website.",
              },
            ].map((service, index) => (
              <motion.div
                key={index}
                variants={scaleIn}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                className="bg-[#0C0F1A]/50 border border-gray-800 p-8 rounded-lg hover:border-[#3ABEFF]/50 transition-all"
              >
                <motion.div
                  initial={{ scale: 1 }}
                  whileHover={{ scale: 1.1 }}
                  className="mb-4"
                >
                  {service.icon}
                </motion.div>
                <h3 className="text-xl font-bold mb-3 text-white">
                  {service.title}
                </h3>
                <p className="text-gray-400">{service.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="py-16 md:py-24 bg-[#0C0F1A]">
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.3 }}
          variants={staggerContainer}
          className="container mx-auto px-4 md:px-6"
        >
          <motion.div variants={fadeInUp} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
              Portfolio
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-[#F55A2A] to-[#3ABEFF] mx-auto mb-6"></div>
            <p className="text-lg text-gray-400 max-w-3xl mx-auto">
              Explore our creative works and innovative solutions that showcase
              our expertise and commitment to excellence.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
          >
            {[
              {
                // title: "Mobile App Development",
                category: "App Development",
                image: "/portfolio/tic-tac-toe.png",
                // description:
                //   "A feature-rich mobile application with seamless user experience",
              },

              {
                category: "Telco Apps",
                image: "/portfolio/chatbot-ai.png",
              },
              {
                category: "Telco Apps",
                image: "/portfolio/covid-tracker.png",
              },
              {
                category: "Telco Apps",
                image: "/portfolio/finance-app.png",
              },
              {
                category: "Telco Apps",
                image: "/portfolio/ai-image-generator.png",
              },
              {
                category: "Telco Apps",
                image: "/portfolio/chat-app.png",
              },
            ].map((project, index) => (
              <motion.div
                key={index}
                // variants={scaleIn}
                // whileHover={{ scale: 0.9 }}
                className="group relative aspect-square overflow-hidden rounded-lg"
              >
                <motion.div className="absolute inset-0 bg-gradient-to-br from-[#F55A2A]/20 to-[#3ABEFF]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />
                <motion.img
                  src={project.image}
                  //  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-300 "
                />
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* Team Section */}
      <section id="team" className="py-8 md:py-16 bg-[#0C0F1A]">
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.3 }}
          variants={staggerContainer}
          className="container mx-auto px-4 md:px-6"
        >
          <motion.div variants={fadeInUp} className="text-center mb-8 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
              Our Team
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-[#F55A2A] to-[#3ABEFF] mx-auto mb-4 md:mb-6"></div>
            <p className="text-base md:text-lg text-gray-400 max-w-3xl mx-auto">
              Meet our talented team of professionals who make the magic happen.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8"
          >
            {[
              {
                name: "Mahamudur Rahman",
                title: "Founder",
                image: "/team/member1.jpg",
                bio: "5+ years of experience in business and team leadership",
                social: {
                  linkedin:
                    "https://www.linkedin.com/in/mahamudur-rahman-305542252/",
                },
              },
              {
                name: "Muhammad Taosif",
                title: "Co Founder & Lead Developer",
                image: "/team/member2.jpg",
                bio: "Full-stack developer with expertise in Flutter, React and Node.js",
                social: {
                  linkedin: "https://www.linkedin.com/in/md-taosif-hossain-th/",
                },
              },
              {
                name: "Abrarul H Noman ",
                title: "Graphic Designer & Video Editor",
                image: "/team/member3.jpg",
                bio: "Creative designer with a passion for user-centered design",
                social: {
                  linkedin:
                    "https://www.linkedin.com/in/abrarul-h-noman-3776201ba/",
                },
              },
              {
                name: "Najmus Sakib",
                title: "App Developer",
                image: "/team/member4.jpg",
                bio: "Cross Platform mobile application developer with expertise in Flutter, ML & AI ",
                social: {
                  linkedin: "#",
                },
              },
              {
                name: "Junayed Hasan",
                title: "Customer Relationship Manager",
                image: "/team/neloy.jpg",
                bio: "Establishes and maintains solid client relationships to ensure customer satisfaction and loyalty.",
                social: {
                  linkedin: "#",
                },
              },
            ].map((member, index) => (
              <motion.div
                key={index}
                variants={scaleIn}
                className="group relative"
              >
                <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-[#1a1f2d] to-[#0C0F1A] p-1">
                  <div className="absolute inset-0 bg-gradient-to-r from-[#F55A2A] to-[#3ABEFF] opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>

                  <div className="flex flex-col xl:flex-row items-center p-4">
                    {/* <Image
                      src={member.image}
                      alt={member.name}
                      width={400}
                      height={533}
                      className="object-cover w-full h-[60%]"
                    /> */}
                    <div className="w-50 h-50 md:w-60 md:h-60 lg:w-40 lg:h-40 relative rounded-lg overflow-hidden mb-4 xl:mb-0 xl:mr-4 flex-shrink-0">
                      <motion.img
                        src={member.image}
                        alt={member.name}
                        width={400}
                        height={533}
                        className="object-cover w-full h-full"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0C0F1A] to-transparent opacity-30"></div>
                    </div>

                    <div className="flex-1 text-center xl:text-left">
                      <h3 className="text-lg md:text-xl font-bold text-white mb-1">
                        {member.name}
                      </h3>
                      <p className="text-[#3ABEFF] font-medium text-sm md:text-base mb-2">
                        {member.title}
                      </p>
                      <p className="text-gray-400 text-sm mb-3">{member.bio}</p>

                      <motion.a
                        href={member.social.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="inline-flex items-center justify-center p-2 bg-[#0C0F1A]/50 rounded-lg border border-gray-800 hover:border-[#3ABEFF] transition-colors"
                      >
                        <Linkedin size={16} className="text-[#3ABEFF]" />
                      </motion.a>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 md:py-24 bg-[#0C0F1A] text-white">
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.3 }}
          variants={staggerContainer}
          className="container mx-auto px-4 md:px-6"
        >
          <motion.div variants={fadeInUp} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Get In Touch
            </h2>
            <div className="w-20 h-1 bg-white mx-auto mb-6"></div>
            <p className="text-lg max-w-3xl mx-auto">
              Have a project in mind or want to learn more about our services?
              Reach out to us today!
            </p>
          </motion.div>

          <div className="flex flex-col lg:flex-row gap-12">
            <motion.div
              variants={slideInLeft}
              className="lg:w-1/2 bg-gradient-to-br from-[#1a1f2d] to-[#0C0F1A] p-8 rounded-xl shadow-lg border border-[#3ABEFF]/10"
            >
              <h3 className="text-2xl font-bold mb-8 bg-gradient-to-r from-[#3ABEFF] to-[#FBB03B] bg-clip-text text-transparent">
                Send Us a Message
              </h3>
              <motion.div variants={staggerContainer} className="space-y-6">
                <motion.div
                  variants={fadeInUp}
                  className="grid grid-cols-1 md:grid-cols-2 gap-6"
                >
                  <div className="relative">
                    <input
                      type="text"
                      id="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-[#0C0F1A]/50 border border-gray-800 rounded-lg focus:outline-none focus:border-[#3ABEFF] transition-colors text-gray-300 peer placeholder-transparent"
                      placeholder="John Doe"
                    />
                    <label
                      htmlFor="name"
                      className="absolute left-4 -top-2.5 text-sm text-gray-400 bg-[#1a1f2d] px-2 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-3 peer-focus:-top-2.5 peer-focus:text-[#3ABEFF] peer-focus:text-sm"
                    >
                      Your Name
                    </label>
                  </div>
                  <div className="relative">
                    <input
                      type="email"
                      id="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-[#0C0F1A]/50 border border-gray-800 rounded-lg focus:outline-none focus:border-[#3ABEFF] transition-colors text-gray-300 peer placeholder-transparent"
                      placeholder="john@example.com"
                    />
                    <label
                      htmlFor="email"
                      className="absolute left-4 -top-2.5 text-sm text-gray-400 bg-[#1a1f2d] px-2 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-3 peer-focus:-top-2.5 peer-focus:text-[#3ABEFF] peer-focus:text-sm"
                    >
                      Email Address
                    </label>
                  </div>
                </motion.div>

                <motion.div variants={fadeInUp} className="relative">
                  <input
                    type="text"
                    id="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-[#0C0F1A]/50 border border-gray-800 rounded-lg focus:outline-none focus:border-[#3ABEFF] transition-colors text-gray-300 peer placeholder-transparent"
                    placeholder="Subject"
                  />
                  <label
                    htmlFor="subject"
                    className="absolute left-4 -top-2.5 text-sm text-gray-400 bg-[#1a1f2d] px-2 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-3 peer-focus:-top-2.5 peer-focus:text-[#3ABEFF] peer-focus:text-sm"
                  >
                    Subject
                  </label>
                </motion.div>

                <motion.div variants={fadeInUp} className="relative">
                  <textarea
                    id="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-[#0C0F1A]/50 border border-gray-800 rounded-lg focus:outline-none focus:border-[#3ABEFF] transition-colors text-gray-300 peer placeholder-transparent resize-none"
                    placeholder="Tell us about your project..."
                  ></textarea>
                  <label
                    htmlFor="message"
                    className="absolute left-4 -top-2.5 text-sm text-gray-400 bg-[#1a1f2d] px-2 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-3 peer-focus:-top-2.5 peer-focus:text-[#3ABEFF] peer-focus:text-sm"
                  >
                    Message
                  </label>
                </motion.div>

                <motion.button
                  variants={fadeInUp}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleContactSubmit}
                  className="w-full bg-gradient-to-r from-[#F55A2A] to-[#FBB03B] hover:from-[#FBB03B] hover:to-[#F55A2A] text-white font-medium py-3 px-6 rounded-lg transition-all flex items-center justify-center group"
                >
                  Send Message
                  <Send
                    size={16}
                    className="ml-2 group-hover:translate-x-1 transition-transform"
                  />
                </motion.button>
              </motion.div>
            </motion.div>

            <motion.div variants={slideInRight} className="lg:w-1/2">
              <div className="bg-gradient-to-br from-[#1a1f2d] to-[#0C0F1A] p-8 rounded-xl h-full border border-[#3ABEFF]/10">
                <h3 className="text-2xl font-bold mb-8 bg-gradient-to-r from-[#3ABEFF] to-[#FBB03B] bg-clip-text text-transparent">
                  Contact Information
                </h3>
                <motion.div variants={staggerContainer} className="space-y-8">
                  <motion.div
                    variants={fadeInUp}
                    className="flex items-start space-x-4"
                  >
                    <div className="p-3 bg-[#0C0F1A]/50 rounded-lg border border-gray-800">
                      <MapPin className="text-[#F55A2A]" size={24} />
                    </div>
                    <div>
                      <h4 className="text-xl font-semibold mb-2 text-white">
                        Location
                      </h4>
                      <p className="text-gray-400">Barishal, Bangladesh</p>
                    </div>
                  </motion.div>

                  <motion.div
                    variants={fadeInUp}
                    className="flex items-start space-x-4"
                  >
                    <div className="p-3 bg-[#0C0F1A]/50 rounded-lg border border-gray-800">
                      <Mail className="text-[#FBB03B]" size={24} />
                    </div>
                    <div>
                      <h4 className="text-xl font-semibold mb-2 text-white">
                        Email Us
                      </h4>
                      <p className="text-gray-400">
                        info@fluttbizitsolutions.com
                      </p>
                    </div>
                  </motion.div>

                  <motion.div
                    variants={fadeInUp}
                    className="flex items-start space-x-4"
                  >
                    <div className="p-3 bg-[#0C0F1A]/50 rounded-lg border border-gray-800">
                      <Phone className="text-[#3ABEFF]" size={24} />
                    </div>
                    <div>
                      <h4 className="text-xl font-semibold mb-2 text-white">
                        Call Us
                      </h4>
                      <p className="text-gray-400">+880 1636390124</p>
                      <p className="text-gray-400">+880 1863041468</p>
                    </div>
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Footer with shadow */}
      <footer className="bg-[#0C0F1A] text-white py-12 relative">
        <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-[#3ABEFF]/10 to-transparent pointer-events-none"></div>
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Fluttbiz IT Solutions</h3>
              <p className="text-gray-400 mb-4">
                Empowering businesses with innovative digital solutions to
                achieve sustainable growth and success.
              </p>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                {["Home", "About", "Services", "Portfolio", "Contact"].map(
                  (item) => (
                    <li key={item}>
                      <button
                        onClick={() => scrollToSection(item.toLowerCase())}
                        className="text-gray-400 hover:text-white transition-colors"
                      >
                        {item}
                      </button>
                    </li>
                  )
                )}
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Services</h4>
              <ul className="space-y-2">
                {[
                  "App Development",
                  "Telco Apps",
                  "Video Editing",
                  "Graphic Design",
                  "Web Development",
                  "SEO",
                ].map((item) => (
                  <li
                    key={item}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 mb-4 md:mb-0">
              © {new Date().getFullYear()} Fluttbiz IT Solutions. All rights
              reserved.
            </p>

            <div className="flex space-x-4">
              {[
                {
                  title: "Tik Tok",
                  url: "https://www.tiktok.com/@fluttbizitsolutions",
                },
                {
                  title: "Youtube",
                  url: "https://www.youtube.com/@FLUTTBIZITSOLUTIONS",
                },
                {
                  title: "LinkedIn",
                  url: "https://www.linkedin.com/company/fluttbiz-it-solutions/",
                },
                {
                  title: "Instagram",
                  url: "https://www.instagram.com/fluttbiz_it_solutions/",
                },
              ].map((social) => (
                <a
                  key={social.title}
                  href={social.url}
                  target="_blank"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  {social.title}
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
    </motion.div>
  );
}
