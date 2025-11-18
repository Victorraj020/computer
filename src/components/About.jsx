import React from 'react';
import { MdHighQuality, MdSpeed, MdSecurity, MdSupportAgent } from "react-icons/md";
import { FaMicrochip, FaCogs, FaRocket, FaServer, FaLaptopCode, FaShieldAlt } from "react-icons/fa";

const About = () => {
  return (
    <div className="bg-[#181818] text-white py-6 px-8 md:px-28" id="about">
      {/* Main Title */}
      <div className="text-left mb-16">
        {/* <p className="text-gray-500 uppercase tracking-wide text-lg">Innovating the Future of Technology</p> */}
        <h2 className="text-4xl md:text-5xl font-extrabold mt-3 text-blue-400">Premium Components for Extreme Performance</h2>
        <p className="text-gray-400 mt-6 max-w-9xl mx-left text-lg leading-relaxed">
        We are not just about PC components—we are about power, precision, and the future of computing. Our mission is to revolutionize performance by delivering the most cutting-edge, high-speed, and future-proof hardware ever created. Every component we design is crafted with unmatched durability, blazing-fast speeds, and next-level efficiency, ensuring that your system runs at peak potential, no matter the challenge.

Gamers, get ready for ultra-smooth, high-FPS gameplay that pushes the limits of realism.
Developers, experience seamless multitasking and lightning-fast processing for your most demanding projects.
Tech enthusiasts, immerse yourself in the latest innovations and harness the power of groundbreaking hardware.
        </p>
      </div>

      {/* Why Choose Us Section */}
      <div className="grid md:grid-cols-2 gap-14 items-center">
        <div>
          <h3 className="text-3xl font-semibold text-blue-400">Why Choose Us?</h3>
          <p className="text-gray-400 mt-4 text-lg leading-relaxed">
            Our components are designed with precision, integrating the latest technology to ensure the highest quality, speed, and security. Here’s why we stand out:
          </p>
          <ul className="mt-6 space-y-5 text-lg">
            <li className="flex items-center gap-4">
              <MdHighQuality size={32} className="text-blue-400" />
              <span>Premium Build & Reliability</span>
            </li>
            <li className="flex items-center gap-4">
              <MdSpeed size={32} className="text-green-400" />
              <span>Unmatched High-Speed Performance</span>
            </li>
            <li className="flex items-center gap-4">
              <MdSecurity size={32} className="text-red-400" />
              <span>Advanced Security & Stability</span>
            </li>
            <li className="flex items-center gap-4">
              <MdSupportAgent size={32} className="text-yellow-400" />
              <span>24/7 Expert Technical Support</span>
            </li>
          </ul>
        </div>

        {/* Feature Icons Section */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8 text-center">
          {[{
            icon: <FaMicrochip size={44} className="text-blue-400" />, title: "Latest Chipsets"
          }, {
            icon: <FaCogs size={44} className="text-green-400" />, title: "Advanced Cooling"
          }, {
            icon: <MdSpeed size={44} className="text-red-400" />, title: "Blazing Fast Data"
          }, {
            icon: <FaRocket size={44} className="text-yellow-400" />, title: "Overclocking Ready"
          }, {
            icon: <FaShieldAlt size={44} className="text-purple-400" />, title: "Secure Components"
          }, {
            icon: <FaLaptopCode size={44} className="text-teal-400" />, title: "Optimized for Developers"
          }, ].map((feature, index) => (//{
          //   icon: <FaServer size={44} className="text-orange-400" />, title: "Enterprise Grade Reliability"
          // }].map((feature, index) => (
            <div 
              key={index} 
              className="p-8 bg-gray-900 rounded-xl shadow-lg transform transition-all duration-300 hover:scale-110 hover:bg-gray-800"
            >
              {feature.icon}
              <p className="mt-4 font-semibold text-lg">{feature.title}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;
