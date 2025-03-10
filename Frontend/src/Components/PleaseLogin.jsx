import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const PleaseLogin = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gray-900/80 p-8 rounded-2xl backdrop-blur-sm border border-gray-400/30 max-w-md w-full mx-4"
      >
        <div className="flex justify-center mb-6">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-20 h-20 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
          </motion.div>
        </div>

        <motion.h1
          className="text-3xl  text-gray-200 text-center mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Authentication Required
        </motion.h1>

        <motion.p
          className="text-gray-400 text-center mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          Please log in to your account to access this content. Only authenticated users can view this area.
        </motion.p>

        <motion.div
          className="flex justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Link
            to="/login"
            className="px-8 py-3 bg-gray-700 text-gray-200 rounded-xl transition-all duration-300 hover:bg-gray-600 flex items-center gap-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M3 3a1 1 0 011 1v12a1 1 0 11-2 0V4a1 1 0 011-1zm7.707 3.293a1 1 0 010 1.414L9.414 9H17a1 1 0 110 2H9.414l1.293 1.293a1 1 0 01-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
            Login Now
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default PleaseLogin;
