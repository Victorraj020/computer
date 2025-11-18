import React from 'react';
import './styles/Home.css';

// Importing images
import A01 from '../assets/A01.png';
import A02 from '../assets/A02.png';
import A03 from '../assets/A03.png';
import A04 from '../assets/A04.png';
import A05 from '../assets/A05.png';
import A06 from '../assets/A06.png';

const servicesData = [
  {
    title: 'Upgrades',
    description: 'Enhance your system performance with the latest hardware upgrades, ensuring faster speeds, higher efficiency, and seamless multitasking for gaming, productivity, and more.',
    image: A01,
  },
  {
    title: 'Repair',
    description: 'Professional diagnosis and repair services for all types of computer hardware issues, including overheating, malfunctioning components, and connectivity problems.',
    image: A02,
  },
  {
    title: 'Customization',
    description: 'Tailor your PC to match your needs—whether it’s for high-performance gaming, content creation, or business efficiency. Choose custom cooling, RGB setups, and more.',
    image: A03,
  },
  {
    title: 'Optimization',
    description: 'Fine-tune your hardware and software settings for maximum efficiency. From overclocking to resource allocation, we ensure your system runs at peak performance.',
    image: A04,
  },
  {
    title: 'Consultation',
    description: 'Expert guidance on selecting the right hardware for your needs, whether you’re building a new PC, upgrading components, or setting up a server.',
    image: A05,
  },
  {
    title: 'Installation',
    description: 'Seamless installation services for new hardware components, ensuring compatibility and proper setup for motherboards, GPUs, storage, and more.',
    image: A06,
  },
];

const Services = () => {
  return (
    // <div className='bg-[#F5F5F5] py-16'> {/* Light gray background */}
    <div className='bg-[#F5F5F5] py-16'> {/* Light gray background */}
      <div className='mx-auto max-w-[1300px]'>
        <h2 className='text-center text-gray-900 font-bold text-4xl pb-10'>Our Services</h2>

        <div className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 px-8 gap-12'>
          {servicesData.map((service, index) => (
            <div key={index} className='relative group overflow-hidden rounded-lg shadow-lg transition-transform duration-300 hover:scale-105'>
              {/* Background Image */}
              <img src={service.image} alt={service.title} className='w-full h-full object-cover transition-transform duration-500 group-hover:scale-110' />

              {/* Hover Overlay */}
              <div className='absolute inset-0 bg-[#111827] opacity-0 group-hover:opacity-90 transition-opacity duration-300 flex flex-col justify-end p-6'>
                <h3 className='text-[24px] font-bold text-[#E0F7FA] opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
                  {service.title}
                </h3>
                <p className='text-[14px] text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300 mt-2'>
                  {service.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services;
