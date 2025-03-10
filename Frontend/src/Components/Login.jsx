import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate, Link } from "react-router-dom";
import { setToken, setUser } from "../utils/auth";
import ErrorPopup from "./ErrorPopup";

const Login = () => {
  const url = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `${url}/api/users/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Login failed. Please check your credentials.");
      }

      localStorage.setItem("token", data.token);
      setToken(data.token);
      setUser(data);
      navigate("/");
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {error && <ErrorPopup message={error} onClose={() => setError(null)} />}
      <div className="min-h-screen relative flex items-center justify-center px-4 py-8 bg-black">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-gray-900/80 p-8 rounded-2xl backdrop-blur-sm w-full max-w-md relative z-20 border border-gray-400/30"
        >
          <h2 className="text-3xl font-saint-carell text-gray-200 text-center mb-8">
            Login
          </h2>
          <form onSubmit={handleLogin} className="space-y-6">
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
            <div className="flex justify-end">
              <Link
                to="/forgot-password"
                className="text-sm text-gray-400 hover:text-gray-300 transition-colors"
              >
                Forgot Password?
              </Link>
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full bg-gray-700 text-gray-200 p-3 rounded-xl transition-all duration-300 hover:bg-gray-600 ${isLoading ? "opacity-50 cursor-not-allowed" : ""
                }`}
            >
              {isLoading ? "Logging in..." : "Login"}
            </button>
          </form>
          <p className="text-gray-400 text-center mt-6">
            Don't have an account?{" "}
            <Link to="/register" className="text-gray-200 hover:text-gray-300">
              Register here
            </Link>
          </p>
        </motion.div>
      </div>
    </>
  );
};

export default Login;
