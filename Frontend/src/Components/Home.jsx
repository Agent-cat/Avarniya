import React, { memo, useState, useRef, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll } from "framer-motion";
import { FaPlus, FaMinus } from "react-icons/fa";

import logo from '../assets/logo.png'
import partner from "../assets/partner.jpg";

const faqs = [
  {
    question: "Goal of Intelligentsia Club",
    answer: "Intelligentsia fosters collaboration for students to explore AI and ML through hands-on projects, workshops, and discussions."
  },
  {
    question: "Are any skills needed to join Intelligentsia?",
    answer: "No prior experience is required. We welcome all students interested in AI/ML, offering support for both beginners and advanced learners."
  },
  {
    question: "What AI/ML projects does Intelligentsia focus on?",
    answer: "We work on basic models, NLP, computer vision, and reinforcement learning. Members can propose their own projects."
  },
  {
    question: "How often are meetings and workshops held?",
    answer: "Weekly meetings and bi-monthly workshops cover topics like neural networks and AI tools (TensorFlow, PyTorch)."
  },
  {
    question: "Does Intelligentsia collaborate with other clubs or organizations?",
    answer: "Yes, we partner with other technical clubs and external organizations for joint projects, hackathons, and interdisciplinary events"
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
            {/* <video
              autoPlay
              loop
              muted
              className="absolute w-full h-full object-cover opacity-50"
            > */}
              {/* <source src="https://res.cloudinary.com/dhsw1nyfx/video/upload/f_auto:video,q_auto/IMG_0478_ioc1du" type="video/mp4" />
              Your browser does not support the video tag.
            </video> */}
            <div className="absolute inset-0" />
          </div>

          <div className="md:flex md:flex-row flex flex-col  gap-10  md:gap-96 items-center justify-center relative z-10">
            <div className="flex flex-col w-full items-start">
              <h1 className="text-white md:text-6xl text-4xl font-bold">
                INTELLIGENTSIA

              </h1>
              <h2 className="text-white text-center ml-16 md:ml-0 md:text-left text-xl font-bold">
Technology Club</h2>
            </div>
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

       

        <div className="max-w-6xl flex flex-col items-center justify-center mx-auto px-4 py-8 md:py-16">
          <motion.h1
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-2xl sm:text-3xl md:text-4xl font-poppins font-bold mb-6 md:mb-8 text-center text-white"
          >
            About Intelligentsia
          </motion.h1>
          <div className="grid grid-cols-1 md:grid-cols-1 gap-8 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-sm flex flex-col items-center justify-center sm:text-base md:text-lg leading-relaxed text-gray-300 "
            >
              <p className="flex items-center justify-center text-center">
              Welcome to Intelligentsia Club! Founded on March 22, 2024, we are a vibrant student community passionate about AI and ML. Our mission is to foster creativity and innovation through hands-on projects, interactive workshops, and collaboration. AI is transforming industries, and ML empowers machines to learn and make impactful predictions. At Intelligentsia, we explore these technologies to solve real-world challenges. Join us in shaping the future of AI!
              </p>
              <Link to='/about' className="px-3 text-center py-2 bg-white text-black mt-6 w-40 rounded-md">More About us</Link>
            </motion.div>
          </div>
          
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
        
      </div>

    </div>

  );
};

export default Home;
