import React from "react";
import { MdEmail, MdPhone, MdLocationOn } from "react-icons/md";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaTelegram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-black text-white py-16">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* About Section */}
          <div className="space-y-6">
            <h2 className="text-4xl font-saint-carell text-white">
              Intelligentsia
            </h2>
            <p className="text-white leading-relaxed">
            Intelligentsia Club fosters innovation in AI and ML through hands-on projects, workshops, and collaboration. Join us to explore, learn, and shape the future of technology.
            </p>
            <div className="flex space-x-4">
              <a href="https://t.me/intelligentsiacommunity" className="text-white hover:text-gray-300 transition-colors">
                <FaTelegram size={24} />
              </a>
             
              <a href="https://www.instagram.com/intelligentsia_klef/" className="text-white hover:text-gray-300 transition-colors">
                <FaInstagram size={24} />
              </a>
              <a href="https://www.linkedin.com/company/intelligentsia-club/" className="text-white hover:text-gray-300 transition-colors">
                <FaLinkedin size={24} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-white">Quick Links</h3>
            <ul className="space-y-4">
              <li>
                <a href="/" className="text-white hover:text-gray-300 transition-colors flex items-center">
                  <span className="mr-2">→</span> Home
                </a>
              </li>
              <li>
                <a href="/events" className="text-white hover:text-gray-300 transition-colors flex items-center">
                  <span className="mr-2">→</span> Events
                </a>
              </li>
              <li>
                <a href="/team" className="text-white hover:text-gray-300 transition-colors flex items-center">
                  <span className="mr-2">→</span> Team
                </a>
              </li>
              <li>
                <a href="/about" className="text-white hover:text-gray-300 transition-colors flex items-center">
                  <span className="mr-2">→</span> About Us
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-white">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-center space-x-3 text-white hover:text-gray-300 transition-colors cursor-pointer"
                onClick={() => window.open("mailto:intelligentsia@kluniversity.in", "_self")}>
                <MdEmail size={20} />
                <span>intelligentsia@kluniversity.in</span>
              </li>
              <li className="flex items-center space-x-3 text-white">
                <MdPhone size={20} />
                <span>+91 7032894189</span>
              </li>
              <li className="flex items-center space-x-3 text-white">
                <MdLocationOn size={20} />
                <span>KL University, Vijayawada</span>
              </li>
            </ul>
          </div>

          {/* Map */}
          <div className="w-full h-48">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3826.6199592490187!2d80.62045731486546!3d16.441925088657878!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a35f0a2a7d81943%3A0x8ba5d78f65df94b8!2sK%20L%20University!5e0!3m2!1sen!2sin!4v1677834271951!5m2!1sen!2sin"
              className="w-full h-full rounded-lg shadow-lg"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>

        <div className="border-t border-white/30 mt-12 pt-8 text-center">
          <p className="text-white">
            &copy; {new Date().getFullYear()} Intelligentsia Club, All rights reserved.
            <br />
            Developed by{" "}
            <a href="https://www.linkedin.com/in/vijay-nandyala/" target="_blank" className="text-white hover:text-gray-300">
              Vijay Nandyala
            </a>
            {" "}&{" "}
            <a href="https://www.linkedin.com/in/vishnu-vardhan-a8a5b92a1/" target="_blank" className="text-white hover:text-gray-300">
              Vishnu Vardhan
            </a>
            {" "}&{" "}
            <a href="https://www.linkedin.com/in/anubothu_aravind/" target="_blank" className="text-white hover:text-gray-300">
              Aanubothu Aravind
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
