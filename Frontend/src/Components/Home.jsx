import React, { memo, useState, useRef, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll } from "framer-motion";
import { FaPlus, FaMinus } from "react-icons/fa";

import logo from '../assets/Avarniya.png'
import partner from "../assets/partner.jpg";

const faqs = [
  {
    question: "What is Avarniya Festival?",
    answer: "Avarniya is KL University's premier international cultural festival celebrating student creativity through various art forms including music, dance, drama and more."
  },
  {
    question: "When and where will Avarniya 2025 be held?",
    answer: "Avarniya 2025 will be held on March 10-11, 2025 at KL University campus in Vijayawada."
  },
  {
    question: "Who can participate in Avarniya?",
    answer: "Students from any recognized educational institution can participate. Both individual and team participation is welcome for various events."
  },
  {
    question: "How do I register for events?",
    answer: "You can register through our website by selecting your desired events and completing the registration process. Early registration is recommended as spots are limited."
  },
  {
    question: "Are there any registration fees?",
    answer: "Registration fees vary by event. Please check individual event details on our website for specific fee information."
  }
];

const Home = () => {

  const [timeLeft, setTimeLeft] = useState({
    days: 28,
    hours: 0,
    minutes: 32,
    seconds: 44,
  });

  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  useEffect(() => {
    const targetDate = new Date('2025-03-21T00:00:00+05:30');

    const calculateTimeLeft = () => {
      const now = new Date();
      const difference = targetDate - now;

      if (difference > 0) {
        return {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000)
        };
      }
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    };

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const containerRef = useRef(null);

  return (
    <div className="relative w-full">
      <div className="bg-black text-white overflow-x-hidden">
        <div
          className="relative min-h-screen flex items-center justify-center bg-black p-4"
          ref={containerRef}
        >
          <div className="absolute inset-0 overflow-hidden">
            <video
              autoPlay
              loop
              muted
              className="absolute w-full h-full object-cover opacity-50"
            >
              <source src="https://res.cloudinary.com/dhsw1nyfx/video/upload/f_auto:video,q_auto/IMG_0478_ioc1du" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <div className="absolute inset-0" />
          </div>

          <div className="flex flex-col gap-11 relative z-10">
            <motion.img
              src={logo}
              alt="Avarniya"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="w-80 object-contain sm:w-64 md:w-96"
            />
          </div>
        </div>

        <div className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-8 z-50"
            >

              <div className="relative">
                <svg className="w-full h-full" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="#C0C0C0"
                    strokeWidth="4"
                    className="opacity-25"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="url(#gradient)"
                    strokeWidth="4"
                    strokeDasharray={`${(timeLeft.days / 365) * 283} 283`}
                    transform="rotate(-90 50 50)"
                    className="transition-all duration-1000"
                  >
                    <animate
                      attributeName="stroke-dasharray"
                      dur="1s"
                      repeatCount="indefinite"
                      values="0 283;283 283"
                    />
                  </circle>
                  <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#C0C0C0" />
                      <stop offset="100%" stopColor="#808080" />
                    </linearGradient>
                  </defs>
                  <text
                    x="50"
                    y="45"
                    textAnchor="middle"
                    fill="white"
                    className="text-2xl font-bold"
                  >
                    {String(timeLeft.days).padStart(2, "0")}
                  </text>
                  <text
                    x="50"
                    y="65"
                    textAnchor="middle"
                    fill="white"
                    className="text-sm"
                  >
                    Days
                  </text>
                </svg>
                <div className="absolute top-0 left-0 w-full h-full animate-pulse">
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-gray-300 rounded-full blur-sm"></div>
                </div>
              </div>

              {/* Hours Circle */}
              <div className="relative">
                <svg className="w-full h-full" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="#C0C0C0"
                    strokeWidth="4"
                    className="opacity-25"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="url(#gradient)"
                    strokeWidth="4"
                    strokeDasharray={`${(timeLeft.hours / 24) * 283} 283`}
                    transform="rotate(-90 50 50)"
                    className="transition-all duration-1000"
                  />
                  <text
                    x="50"
                    y="45"
                    textAnchor="middle"
                    fill="white"
                    className="text-2xl font-bold"
                  >
                    {String(timeLeft.hours).padStart(2, "0")}
                  </text>
                  <text
                    x="50"
                    y="65"
                    textAnchor="middle"
                    fill="white"
                    className="text-sm"
                  >
                    Hours
                  </text>
                </svg>
                <div className="absolute top-0 left-0 w-full h-full animate-pulse">
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-gray-300 rounded-full blur-sm"></div>
                </div>
              </div>

              <div className="relative">
                <svg className="w-full h-full" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="#C0C0C0"
                    strokeWidth="4"
                    className="opacity-25"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="url(#gradient)"
                    strokeWidth="4"
                    strokeDasharray={`${(timeLeft.minutes / 60) * 283} 283`}
                    transform="rotate(-90 50 50)"
                    className="transition-all duration-1000"
                  />
                  <text
                    x="50"
                    y="45"
                    textAnchor="middle"
                    fill="white"
                    className="text-2xl font-bold"
                  >
                    {String(timeLeft.minutes).padStart(2, "0")}
                  </text>
                  <text
                    x="50"
                    y="65"
                    textAnchor="middle"
                    fill="white"
                    className="text-sm"
                  >
                    Minutes
                  </text>
                </svg>
                <div className="absolute top-0 left-0 w-full h-full animate-pulse">
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-gray-300 rounded-full blur-sm"></div>
                </div>
              </div>

              {/* Seconds Circle */}
              <div className="relative">
                <svg className="w-full h-full" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="#C0C0C0"
                    strokeWidth="4"
                    className="opacity-25"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="url(#gradient)"
                    strokeWidth="4"
                    strokeDasharray={`${(timeLeft.seconds / 60) * 283} 283`}
                    transform="rotate(-90 50 50)"
                    className="transition-all duration-1000"
                  />
                  <text
                    x="50"
                    y="45"
                    textAnchor="middle"
                    fill="white"
                    className="text-2xl font-bold"
                  >
                    {String(timeLeft.seconds).padStart(2, "0")}
                  </text>
                  <text
                    x="50"
                    y="65"
                    textAnchor="middle"
                    fill="white"
                    className="text-sm"
                  >
                    Seconds
                  </text>
                </svg>
                <div className="absolute top-0 left-0 w-full h-full animate-pulse">
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-gray-300 rounded-full blur-sm"></div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        <div className="max-w-6xl flex flex-col items-center justify-center mx-auto px-4 py-8 md:py-16">
          <motion.h1
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-2xl sm:text-3xl md:text-4xl font-poppins font-bold mb-6 md:mb-8 text-center text-white"
          >
            About Avarniya
          </motion.h1>
          <div className="grid grid-cols-1 md:grid-cols-1 gap-8 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-sm sm:text-base md:text-lg leading-relaxed text-gray-300 z-50"
            >
              <p className="flex items-center justify-center text-center">
                Avarniya is a technical fest organized by the AIDS branch at KL University in Vijayawada. This event is a platform for students to showcase their technical skills, participate in various competitions, and engage in workshops and seminars. The fest aims to foster innovation, creativity, and collaboration among students.
              </p>
            </motion.div>
          </div>
          <Link to='/about' className="px-3 text-center py-2 bg-white text-black mt-6 w-40 rounded-md">More About us</Link>
        </div>


        <div className="w-full py-12 sm:py-16 px-4">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-2xl sm:text-3xl md:text-4xl font-poppins font-bold mb-8 sm:mb-12 text-center"
          >
            FAQ'S
          </motion.h2>
          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="border border-gray-700 rounded-lg overflow-hidden">
                <button
                  className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-900 transition-colors"
                  onClick={() => toggleFaq(index)}
                >
                  <span className="text-lg font-medium">{faq.question}</span>
                  {openFaq === index ? (
                    <FaMinus className="flex-shrink-0 text-silver" />
                  ) : (
                    <FaPlus className="flex-shrink-0 text-silver" />
                  )}
                </button>
                {openFaq === index && (
                  <div className="px-6 py-4 bg-gray-900 text-gray-300">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        <div className="w-full py-12 sm:py-16 px-4">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-2xl sm:text-3xl md:text-4xl font-poppins font-bold mb-8 sm:mb-12 text-center z-50"
          >
            Our Partners
          </motion.h2>
          <div className="">
            <div className="flex justify-center">
              <img src={partner} alt="" className="g1 h-64 w-60" />
            </div>
          </div>
        </div>
      </div>

    </div>

  );
};

export default Home;
