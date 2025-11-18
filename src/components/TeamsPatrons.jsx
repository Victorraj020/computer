import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";
import "swiper/css/scrollbar";
import "swiper/css/pagination";
import { FaTimes } from "react-icons/fa";
import Image6 from "../assets/CPP.png";
import Image3 from "../assets/GPU.png";
import Image4 from "../assets/RAM.png";
import Image5 from "../assets/AC.png";
import Image8 from "../assets/FAN.png";

const productData = [
  {
    image: Image3,
    title: "GPUs",
    subtitle: "Extreme Performance GPUs – Power Beyond Limits",
    description: "Unleash next-level graphics performance with our cutting-edge GPUs, designed for high-speed rendering, seamless multitasking, and ultimate efficiency. Built with advanced architecture, high-speed memory, and powerful cooling solutions, our GPUs deliver stunning visuals, lightning-fast frame rates, and AI-powered enhancements for an unparalleled computing experience. Whether youre a gamer seeking ultra-smooth gameplay, a content creator working with high-resolution media, or a professional handling intensive workloads, our GPUs provide unmatched performance, real-time ray tracing, and AI acceleration to handle any challenge.",
  },
  {
    image: Image5,
    title: "PC Accessories",
    subtitle: "Premium PC Accessories – Enhance Your Setup",
    description: "Elevate your computing experience with our premium PC accessories, designed to complement your system with functionality, style, and precision. From ergonomic keyboards and responsive mice to sleek gaming headsets and cable management solutions, our accessories are crafted to offer maximum comfort, performance, and aesthetic appeal.",
  },
  {
    image: Image6,
    title: "CPUs",
    subtitle: "High-Performance CPUs – Unmatched Power and Speed",
    description: "Unlock the full potential of your system with our cutting-edge CPUs, engineered for extreme performance, speed, and efficiency. Designed with multi-core architecture, advanced processing technology, and intelligent power management, our processors are built to handle even the most demanding tasks with ease.",
  },
  {
    image: Image4,
    title: "RAM & Storage",
    subtitle: "High-Performance Speed, Capacity, and Reliability",
    description: "Upgrade your system’s multitasking capabilities with our high-performance RAM modules, designed to deliver faster speeds, smoother performance, and enhanced stability. Built with advanced technology and high-density chips, our RAM allows for seamless multitasking, lag-free gaming, and improved overall system responsiveness.",
  },
  {
    image: Image8,
    title: "Cooling Fans",
    subtitle: "Ultra-Efficient Cooling Fans – Power, Performance, Precision",
    description: "Our high-performance cooling fans are designed to maximize airflow, minimize noise, and enhance system longevity. Engineered with advanced blade technology, precision bearings, and optimized RPM control, these fans ensure superior heat dissipation, keeping your system cool even under extreme workloads."


  },
];

const TeamsPatrons = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);

  return (
    // <div className="max-w-[1350px] mx-auto pb-20 pt-10 relative">
       <div className="max-w-[1700px] mx-auto pb-20 pt-10 relative bg-[#181818]">
      <div className="py-4">
        <p className="text-3xl text-blue-400 text-center">SET UP YOUR OWN SETUP</p>
      </div>

      <Swiper
        style={{
          "--swiper-pagination-color": "#FFBA08",
          "--swiper-pagination-bullet-inactive-color": "#999999",
        }}
        spaceBetween={50}
        modules={[Pagination, Navigation, Autoplay]}
        slidesPerView={3}
        centeredSlides={true}
        grabCursor={true}
        pagination={{ clickable: true }}
        navigation
        loop={true}
        breakpoints={{
          320: { slidesPerView: 1, spaceBetween: 30 },
          640: { slidesPerView: 2, spaceBetween: 40 },
          1024: { slidesPerView: 3, spaceBetween: 50 },
        }}
        className="px-10 pb-10 pt-10"
      >
        {productData.map((product, index) => (
          <SwiperSlide key={index} className="cursor-pointer">
            <div
              className="relative flex justify-center hover:scale-105 transition-transform duration-300"
              onClick={() => setSelectedProduct(product)}
            >
              <img
                src={product.image}
                className="w-full h-[300px] object-cover rounded-xl shadow-lg"
                alt={product.title}
              />
              <div className="bg-black bg-opacity-30 mx-8 mb-0 absolute bottom-0  py-3 w-full h-auto">
                <p className="text-center text-[20px] text-white-800">{product.title}</p>
                <p className="text-center text-[13px] text-white-800">{product.subtitle}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      {/* Runner.prototype.gameOver = function() {};  */}

      {selectedProduct && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-md z-50 p-4">
          <div className="bg-white p-6 rounded-2xl shadow-xl max-w-lg relative">
            <button
              className="absolute top-3 right-3 text-gray-600 hover:text-red-500"
              onClick={() => setSelectedProduct(null)}
            >
              <FaTimes size={20} />
            </button>
            <img src={selectedProduct.image} className="w-full h-60 object-cover rounded-xl mb-4" />
            <h2 className="text-2xl font-semibold text-gray-900 text-center">
              {selectedProduct.title}
            </h2>
            <p className="text-gray-700 text-center text-lg mb-2">{selectedProduct.subtitle}</p>
            <p className="text-gray-600 text-center">{selectedProduct.description}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeamsPatrons;
