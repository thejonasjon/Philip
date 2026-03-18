import React from "react";
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-white py-6">
      <div className="flex justify-center space-x-6 mb-4">
        <a
          href="https://www.facebook.com/osose.ijewere"
          className="hover:text-orange-500 transition-colors duration-300"
        >
          <FaFacebook size={20} />
        </a>
        <a
          href="https://www.instagram.com/ose_philips"
          className="hover:text-orange-500 transition-colors duration-300"
        >
          <FaInstagram size={20} />
        </a>
        <a
          href="#"
          className="hover:text-orange-500 transition-colors duration-300"
        >
          <FaTwitter size={20} />
        </a>
        <a
          href="https://www.linkedin.com/in/osose-ijewere-tefl"
          className="hover:text-orange-500 transition-colors duration-300"
        >
          <FaLinkedin size={20} />
        </a>
      </div>
      <p className="text-center text-sm text-gray-400">
        &copy; 2025{" "}
        <span className="text-orange-500 font-semibold">Osose Philips</span>.
        All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
