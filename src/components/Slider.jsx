import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/autoplay";

import Image1 from "../assets/JP1.png";
import Image2 from "../assets/JP2.png";
import Image3 from "../assets/JP3.png";
import Image4 from "../assets/JP4.png";
import Image5 from "../assets/JP1.png";
import Image6 from "../assets/JP2.png";
// navigation bar and slider height
const Slider = () => {
  return (
    <div className="w-full mt-[-50px] bg-[#121212] py-6">
      <Swiper
        effect="fade"
        modules={[Autoplay, EffectFade]}
        slidesPerView={1}
        loop={true}
        autoplay={{
          delay: 1500, // Smooth transitions
          disableOnInteraction: false,
        }}
        speed={1000} // Enhanced fade speed
        fadeEffect={{ crossFade: true }}
      >
        <SwiperSlide>
          <div className="flex justify-center">
            <img
              src={Image1}
              className="w-full h-[200px] sm:h-[300px] md:h-[400px] lg:h-[460px] object-cover transition-opacity duration-1000"
              alt="Slide 1"
            />
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="flex justify-center">
            <img
              src={Image2}
              className="w-full h-[200px] sm:h-[300px] md:h-[400px] lg:h-[460px] object-cover transition-opacity duration-1000"
              alt="Slide 2"
            />
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="flex justify-center">
            <img
              src={Image3}
              className="w-full h-[200px] sm:h-[300px] md:h-[400px] lg:h-[460px] object-cover transition-opacity duration-1000"
              alt="Slide 3"
            />
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="flex justify-center">
            <img
              src={Image4}
              className="w-full h-[200px] sm:h-[300px] md:h-[400px] lg:h-[460px] object-cover transition-opacity duration-1000"
              alt="Slide 4"
            />
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="flex justify-center">
            <img
              src={Image5}
              className="w-full h-[200px] sm:h-[300px] md:h-[400px] lg:h-[460px] object-cover transition-opacity duration-1000"
              alt="Slide 5"
            />
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="flex justify-center">
            <img
              src={Image6}
              className="w-full h-[200px] sm:h-[300px] md:h-[400px] lg:h-[460px] object-cover transition-opacity duration-1000"
              alt="Slide 6"
            />
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Slider;
