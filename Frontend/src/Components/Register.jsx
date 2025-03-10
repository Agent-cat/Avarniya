import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { setToken, setUser } from "../utils/auth";
import ErrorPopup from "./ErrorPopup";
import GenericPopup from "./GenericPopup";

const Register = () => {
  const url = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
    college: "kluniversity",
    collegeId: "",
    otherCollegeName: "",
    state: "",
    address: "",
    country: "India",
    otherCountryName: "",
    image: null,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isEmailVerified, setIsEmailVerified] = useState(true);
  const [showOTPInput, setShowOTPInput] = useState(false);
  const [otp, setOtp] = useState('');
  const [otpError, setOtpError] = useState('');
  const [showPopup, setShowPopup] = useState(false);

  const indianStates = [
    "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
    "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
    "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram",
    "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu",
    "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal",
  ];

  const MAX_IMAGE_SIZE = 2 * 1024 * 1024; // 2MB

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCollegeChange = (e) => {
    const { value } = e.target;
    setFormData((prev) => ({
      ...prev,
      college: value,
      otherCollegeName: value === "kluniversity" ? "" : prev.otherCollegeName,
    }));
  };

  const handleCountryChange = (e) => {
    const { value } = e.target;
    setFormData((prev) => ({
      ...prev,
      country: value,
      otherCountryName: value === "Other" ? "" : prev.otherCountryName,
    }));
  };

  const handleSendOTP = async () => {
    try {
      setIsLoading(true);
      setError(null);
      setOtpError(null);

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        throw new Error('Please enter a valid email address');
      }

      const response = await fetch(`${url}/api/users/send-verification-otp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: formData.email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send OTP');
      }

      setShowOTPInput(true);
      setError(null);
    } catch (error) {
      setError(error.message || 'Failed to send OTP. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOTP = async () => {
    try {
      setIsLoading(true);
      setOtpError(null);

      const response = await fetch(`${url}/api/users/verify-otp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          otp: otp,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error);
      }

      setIsEmailVerified(true);
      setShowOTPInput(false);
    } catch (error) {
      setOtpError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > MAX_IMAGE_SIZE) {
        setError("Image size should not exceed 2MB.");
        setShowPopup(true);
        return;
      }
      setFormData({ ...formData, image: file });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isEmailVerified) {
      setError("Please verify your email first");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      if (formData.password !== formData.confirmPassword) {
        throw new Error("Passwords do not match");
      }

      if (formData.college === "kluniversity" && !formData.email.endsWith("@kluniversity.in")) {
        throw new Error("Please use your KL University email address");
      }

      if (formData.college === "kluniversity") {
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
          college: data.college,
          collegeId: data.collegeId,
          role: data.role,
        });
        navigate("/");
      } else {
        navigate("/payment", { state: { formData } });
      }
    } catch (error) {
      setError(error.message || "An error occurred during registration.");
      setShowPopup(true);
    } finally {
      setIsLoading(false);
    }
  };

  const nextStep = () => {
    if (step === 1 && (!formData.email || !isEmailVerified || !formData.password || !formData.confirmPassword)) {
      setError("Please complete all fields and verify email");
      return;
    }
    setStep(2);
  };

  const prevStep = () => {
    setStep(1);
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
            {step === 1 ? (

              <>
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
                  <p className="text-sm text-gray-400 mt-1">
                    Note: KL university students should use their official university Email
                  </p>
                </div>

                {!isEmailVerified && (
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={handleSendOTP}
                      disabled={isLoading || !formData.email}
                      className={`px-4 py-2 text-sm rounded-xl bg-gray-700 text-gray-200 hover:bg-gray-600 transition-colors ${isLoading || !formData.email ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                      {isLoading ? 'Sending...' : 'Verify Email'}
                    </button>
                    {isEmailVerified && (
                      <span className="text-green-500 text-sm">✓ Verified</span>
                    )}
                  </div>
                )}

                {showOTPInput && (
                  <div className="mt-4">
                    <label htmlFor="otp" className="block text-gray-300 mb-2">
                      Enter OTP
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        id="otp"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        className="w-full px-4 py-2 rounded-xl bg-black border border-gray-400/30 text-gray-200 focus:outline-none focus:border-gray-300"
                        placeholder="Enter 6-digit OTP"
                        maxLength="6"
                      />
                      <button
                        type="button"
                        onClick={handleVerifyOTP}
                        disabled={isLoading || otp.length !== 6}
                        className={`px-4 py-2 rounded-xl bg-gray-700 text-gray-200 hover:bg-gray-600 transition-colors ${isLoading || otp.length !== 6 ? 'opacity-50 cursor-not-allowed' : ''}`}
                      >
                        {isLoading ? 'Verifying...' : 'Verify'}
                      </button>
                    </div>
                    {otpError && (
                      <p className="text-red-500 text-sm mt-1">{otpError}</p>
                    )}
                  </div>
                )}

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

                <button
                  type="button"
                  onClick={nextStep}
                  className="w-full bg-gray-700 text-gray-200 p-3 rounded-xl transition-all duration-300 hover:bg-gray-600"
                >
                  Next
                </button>
              </>
            ) : (
              // Step 2: Additional Information
              <>
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
                  <label htmlFor="phoneNumber" className="block text-gray-300 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phoneNumber"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-xl bg-black border border-gray-400/30 text-gray-200 focus:outline-none focus:border-gray-300"
                    required
                    pattern="^\+?[\d\s-]{10,15}$"
                    placeholder="Enter your phone number"
                    disabled={isLoading}
                  />
                </div>

                <div>
                  <label htmlFor="college" className="block text-gray-300 mb-2">
                    College
                  </label>
                  <select
                    id="college"
                    name="college"
                    value={formData.college}
                    onChange={handleCollegeChange}
                    className="w-full px-4 py-2 rounded-xl bg-black border border-gray-400/30 text-gray-200 focus:outline-none focus:border-gray-300"
                    required
                    disabled={isLoading}
                  >
                    <option value="kluniversity">KL University</option>
                    <option value="other">Other College</option>
                  </select>
                  {formData.college === "other" && (
                    <>
                      <input
                        type="text"
                        id="otherCollegeName"
                        name="otherCollegeName"
                        value={formData.otherCollegeName}
                        onChange={handleChange}
                        placeholder="Enter your college name"
                        className="w-full px-4 py-2 mt-2 rounded-xl bg-black border border-gray-400/30 text-gray-200 focus:outline-none focus:border-gray-300"
                        required
                        disabled={isLoading}
                      />
                      <p className="mt-2 text-sm text-gray-400">
                        Note: Non-KL University students are required to pay ₹310 registration fee
                      </p>
                    </>
                  )}
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

                <div>
                  <label htmlFor="country" className="block text-gray-300 mb-2">
                    Country
                  </label>
                  <select
                    id="country"
                    name="country"
                    value={formData.country}
                    onChange={handleCountryChange}
                    className="w-full px-4 py-2 rounded-xl bg-black border border-gray-400/30 text-gray-200 focus:outline-none focus:border-gray-300"
                    required
                    disabled={isLoading}
                  >
                    <option value="India">India</option>
                    <option value="Other">Other</option>
                  </select>
                  {formData.country === "Other" && (
                    <input
                      type="text"
                      id="otherCountryName"
                      name="otherCountryName"
                      value={formData.otherCountryName}
                      onChange={handleChange}
                      placeholder="Enter your country name"
                      className="w-full px-4 py-2 mt-2 rounded-xl bg-black border border-gray-400/30 text-gray-200 focus:outline-none focus:border-gray-300"
                      required
                      disabled={isLoading}
                    />
                  )}
                </div>

                {formData.country === "India" && (
                  <div>
                    <label htmlFor="state" className="block text-gray-300 mb-2">
                      State
                    </label>
                    <select
                      id="state"
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      className="w-full px-4 py-2 rounded-xl bg-black border border-gray-400/30 text-gray-200 focus:outline-none focus:border-gray-300"
                      required
                      disabled={isLoading}
                    >
                      <option value="">Select State</option>
                      {indianStates.map((state) => (
                        <option key={state} value={state}>
                          {state}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                <div>
                  <label htmlFor="address" className="block text-gray-300 mb-2">
                    Address
                  </label>
                  <textarea
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-xl bg-black border border-gray-400/30 text-gray-200 focus:outline-none focus:border-gray-300"
                    required
                    disabled={isLoading}
                    rows="3"
                  />
                </div>

                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={prevStep}
                    className="w-1/2 bg-gray-700 text-gray-200 p-3 rounded-xl transition-all duration-300 hover:bg-gray-600"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className={`w-1/2 bg-gray-700 text-gray-200 p-3 rounded-xl transition-all duration-300 ${isLoading ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-600"}`}
                  >
                    {isLoading ? "Registering..." : "Register"}
                  </button>
                </div>
              </>
            )}
          </form>
        </motion.div>
      </div>
    </>
  );
};

export default Register;