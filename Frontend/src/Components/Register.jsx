import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { setToken, setUser } from "../utils/auth";
import ErrorPopup from "./ErrorPopup";
import GenericPopup from "./GenericPopup";

const Register = () => {
  const url = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    collegeId: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      if (formData.password !== formData.confirmPassword) {
        throw new Error("Passwords do not match");
      }

      const response = await fetch(
        `${url}/api/users/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...formData,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Registration failed");
      }

      setToken(data.token);
      setUser({
        fullName: data.fullName,
        email: data.email,
        collegeId: data.collegeId,
        role: data.role,
      });
      navigate("/");
    } catch (error) {
      setError(error.message || "An error occurred during registration.");
      setShowPopup(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {error && <ErrorPopup message={error} onClose={() => setError(null)} />}
      {showPopup && <GenericPopup message={error} onClose={() => setShowPopup(false)} />}
      <div className="min-h-screen relative flex items-center justify-center px-4 py-8 bg-black">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="register-container bg-gray-900/80 p-8 rounded-2xl backdrop-blur-sm w-full max-w-md relative z-20 border border-gray-400/30"
        >
          <h2 className="text-3xl font-saint-carell text-gray-200 text-center mb-8">
            Register
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="fullName" className="block text-gray-300 mb-2">
                Full Name
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-xl bg-black border border-gray-400/30 text-gray-200 focus:outline-none focus:border-gray-300"
                required
                disabled={isLoading}
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-gray-300 mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-xl bg-black border border-gray-400/30 text-gray-200 focus:outline-none focus:border-gray-300"
                required
                disabled={isLoading}
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-gray-300 mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-xl bg-black border border-gray-400/30 text-gray-200 focus:outline-none focus:border-gray-300"
                required
                disabled={isLoading}
              />
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-gray-300 mb-2">
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-xl bg-black border border-gray-400/30 text-gray-200 focus:outline-none focus:border-gray-300"
                required
                disabled={isLoading}
              />
            </div>

            <div>
              <label htmlFor="collegeId" className="block text-gray-300 mb-2">
                College ID
              </label>
              <input
                type="text"
                id="collegeId"
                name="collegeId"
                value={formData.collegeId}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-xl bg-black border border-gray-400/30 text-gray-200 focus:outline-none focus:border-gray-300"
                required
                disabled={isLoading}
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full bg-gray-700 text-gray-200 p-3 rounded-xl transition-all duration-300 ${isLoading ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-600"}`}
            >
              {isLoading ? "Registering..." : "Register"}
            </button>
          </form>
        </motion.div>
      </div>
    </>
  );
};

export default Register;