import React, { useState, useRef, useEffect } from "react";
import { navLinks, adminNavLink } from "../Constants/Constants";
import { Link, NavLink } from "react-router-dom";
import { getUser, removeToken, removeUser } from "../utils/auth";
import { useNavigate } from "react-router-dom";
import logo from "../assets/surabhi.png";
import kl from "../assets/kl.png";
import { IoClose } from "react-icons/io5"; // Added IoClose icon

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(getUser());
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef(null);
  const navigate = useNavigate();

  const isAdmin = user?.role === "admin";
  const isAuthenticated = !!user;

  const navigationLinks = [...navLinks];
  if (isAdmin) {
    navigationLinks.push(adminNavLink);
  }

  useEffect(() => {
    const handleStorageChange = () => {
      setUser(getUser());
    };

    window.addEventListener("storage", handleStorageChange);

    const interval = setInterval(() => {
      const currentUser = getUser();
      if (JSON.stringify(currentUser) !== JSON.stringify(user)) {
        setUser(currentUser);
      }
    }, 500);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      clearInterval(interval);
    };
  }, [user]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen]);

  const handleLogout = () => {
    removeToken();
    removeUser();
    setUser(null);
    setIsProfileOpen(false);
    navigate("/login");
  };

  const ProfileDropdown = () => (
    <div className="relative" ref={profileRef}>
      <button
        onClick={() => setIsProfileOpen(!isProfileOpen)}
        className="flex items-center gap-3  px-4 py-2 rounded-lg  transition-all"
      >
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center text-sm font-medium">
          {user?.fullName?.charAt(0) || "?"}
        </div>
        <span className="text-white/90">{user?.fullName || "User"}</span>
      </button>

      {isProfileOpen && (
        <div className="absolute right-0 mt-2 w-72 bg-gradient-to-br from-gray-900 to-black rounded-xl shadow-xl border border-white/10">
          <div className="p-4 border-b border-white/10">
            <p className="text-lg font-medium text-white/90">{user?.fullName}</p>
            <p className="text-sm text-white/60">{user?.email}</p>
          </div>
          <div className="p-4 space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-white/60">College</span>
              <span className="text-white/90">{user?.college}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-white/60">ID</span>
              <span className="text-white/90">{user?.collegeId}</span>
            </div>
            {user?.college !== "kluniversity" && (
              <div className="flex justify-between text-sm">
                <span className="text-white/60">Payment Status</span>
                <span className={`text-${user?.paymentStatus === "approved" ? "green" : "yellow"}-400`}>
                  {user?.paymentStatus}
                </span>
              </div>
            )}
          </div>
          <div className="p-3">
            <button
              onClick={handleLogout}
              className="w-full bg-gradient-to-r from-red-500 to-pink-500 text-white py-2 rounded-lg font-medium hover:from-red-600 hover:to-pink-600 transition-all"
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );

  const MobileProfile = () => (
    <div className="border-t border-white/10 pt-6 mt-6">
      <div className="flex items-center gap-4 mb-6">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center text-lg font-medium">
          {user?.fullName?.charAt(0) || "?"}
        </div>
        <div>
          <p className="text-white/90 font-medium text-lg">{user?.fullName || "User"}</p>
          <p className="text-white/60 text-sm">{user?.email}</p>
        </div>
      </div>
      <button
        onClick={handleLogout}
        className="w-full bg-gradient-to-r from-red-500 to-pink-500 text-white py-3 rounded-lg font-medium hover:from-red-600 hover:to-pink-600 transition-all"
      >
        Logout
      </button>
    </div>
  );

  return (
    <nav className="fixed top-0 left-0 w-full z-50  bg-black border-white/10 border-b ">
      <div className=" mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-3">
            <img src={kl} alt="KL University" className="h-8 w-auto" />
          </Link>

          <div className="hidden lg:flex items-center space-x-8">
            {navigationLinks.map((link) => (
              <NavLink
                key={link.title}
                to={link.to}
                className={({ isActive }) =>
                  `px-3 py-2 rounded-lg  text-md font-medium transition-all ${isActive
                    ? "bg-white/10 text-white"
                    : "text-white/70 hover:text-white hover:bg-white/5"
                  }`
                }
              >
                {link.title}
              </NavLink>
            ))}
          </div>

          <div className="flex items-center space-x-4">
            <div className="hidden lg:block">
              {user ? (
                <ProfileDropdown />
              ) : (
                <div className="flex items-center space-x-3">
                  <NavLink
                    to="/login"
                    className="px-4 py-2 text-sm font-medium text-white/90 hover:text-white transition-colors"
                  >
                    Login
                  </NavLink>
                  <NavLink
                    to="/register"
                    className="px-4 py-2 text-sm font-medium bg-white/10 text-white rounded-lg hover:bg-white/20 transition-all"
                  >
                    Register
                  </NavLink>
                </div>
              )}
            </div>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
            >
              {isOpen ? (
                <IoClose className="w-6 h-6 text-white" />
              ) : (
                <div className="w-5 h-5 flex flex-col justify-between">
                  <span className="block h-0.5 bg-white" />
                  <span className="block h-0.5 bg-white" />
                  <span className="block h-0.5 bg-white" />
                </div>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`lg:hidden fixed inset-0 bg-black/95 backdrop-blur-lg transform transition-transform duration-300 ${isOpen ? "translate-x-0" : "translate-x-full"}`}>
        <div className="flex flex-col h-full">
          <div className="flex justify-end p-4">
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            >
              <IoClose className="w-6 h-6 text-white" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {navigationLinks.map((link) => (
              <NavLink
                key={link.title}
                to={link.to}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `block px-4 py-3 rounded-lg text-base font-medium transition-all ${isActive
                    ? "bg-white/10 text-white"
                    : "text-white/70 hover:text-white hover:bg-white/5"
                  }`
                }
              >
                {link.title}
              </NavLink>
            ))}

            {user ? (
              <MobileProfile />
            ) : (
              <div className="space-y-3 pt-6">
                <NavLink
                  to="/login"
                  onClick={() => setIsOpen(false)}
                  className="block w-full px-4 py-3 text-center text-white/90 bg-white/5 rounded-lg hover:bg-white/10 transition-all"
                >
                  Login
                </NavLink>
                <NavLink
                  to="/register"
                  onClick={() => setIsOpen(false)}
                  className="block w-full px-4 py-3 text-center text-white  bg-gray-500 transition-all"
                >
                  Register
                </NavLink>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
