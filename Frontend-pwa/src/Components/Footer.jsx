import React from "react";

const Footer = () => (
  <footer className="border-t-2 border-green-400 py-6 bg-[#D0B9FF]">
    <div className="container mx-auto px-6 text-center text-gray-500 text-sm">
      <p>Built with passion for Students, by Students.</p>
      <p>
        &copy; {new Date().getFullYear()} STEM Quest. Designed to accelerate
        your STEM journey.
      </p>
    </div>
  </footer>
);

export default Footer;
