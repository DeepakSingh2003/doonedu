// components/Testimonials.jsx
"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import { useState, useEffect } from "react";

const testimonials = [
  {
    id: 1,
    text: "Global Edu.Consulting made the school admission process so smooth for us. We found the perfect boarding school for our daughter in Dehradun!",
    name: "Mrs. Sharma",
    img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHByb2Zlc3Npb25hbCUyMHdvbWFufGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=80",
  },
  {
    id: 2,
    text: "The detailed school comparisons and expert guidance helped us choose the right CBSE school for our son. Thank you for your excellent service!",
    name: "Mr. Kapoor",
    img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHByb2Zlc3Npb25hbCUyMG1hbnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=80",
  },
  {
    id: 3,
    text: "As an NRI family, we were confused about the Indian education system. Global Edu.Consulting guided us through every step of the admission process.",
    name: "Mr. & Mrs. Patel",
    img: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzh8fGNvdXBsZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=80",
  },
  {
    id: 4,
    text: "The virtual school tours feature was amazing! We could explore campuses from home before making our decision.",
    name: "Ms. Reddy",
    img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTB8fHByb2Zlc3Npb25hbCUyMHdvbWFufGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=80",
  },
  {
    id: 5,
    text: "We saved so much time and effort using Global Edu.Consulting. The application process was streamlined and hassle-free.",
    name: "Dr. Singh",
    img: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8ZG9jdG9yfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=80",
  },
];

export default function Testimonials() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  return (
    <section
      id="testimonials"
      className="flex justify-center py-12 px-4 bg-gray-50"
    >
      <div className="w-full max-w-6xl">
        <h3 className="text-center text-2xl md:text-3xl font-bold mb-12 text-gray-800">
          What Parents Say About Us
        </h3>

        {/* Desktop View - Auto Carousel */}
        {!isMobile ? (
          <div className="hidden md:block relative overflow-hidden">
            <Swiper
              modules={[Autoplay]}
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }}
              spaceBetween={30}
              slidesPerView={3}
              loop={true}
              speed={1000}
            >
              {testimonials.map((item) => (
                <SwiperSlide key={item.id}>
                  <div className="w-full h-full px-3">
                    <blockquote className="relative p-6 rounded-2xl border-l-4 border-blue-500 bg-white shadow-lg flex flex-col justify-between h-64 transition-all duration-300 hover:shadow-xl hover:scale-105">
                      {/* Quote Icon Top Left */}
                      <div className="absolute top-4 left-3 text-blue-500 text-2xl">
                        ❝
                      </div>

                      {/* Text */}
                      <p className="text-sm text-gray-700 italic mt-2 pl-4">
                        {item.text}
                      </p>

                      {/* Bottom */}
                      <div className="mt-6 flex items-center gap-3">
                        <img
                          src={item.img}
                          alt={item.name}
                          className="w-12 h-12 rounded-full border-2 border-blue-500 object-cover shadow-sm"
                        />
                        <span className="text-gray-900 font-medium text-sm">
                          - {item.name}
                        </span>
                      </div>
                    </blockquote>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        ) : null}

        {/* Mobile View - Auto Carousel */}
        <div className="md:hidden">
          <Swiper
            modules={[Autoplay]}
            autoplay={{
              delay: 3500,
              disableOnInteraction: false,
            }}
            spaceBetween={20}
            slidesPerView={1}
            loop={true}
            speed={800}
          >
            {testimonials.map((item) => (
              <SwiperSlide key={item.id}>
                <div className="px-4">
                  <blockquote className="relative p-6 rounded-2xl border-l-4 border-blue-500 bg-white shadow-lg flex flex-col justify-between h-56 mx-auto">
                    {/* Quote Icon Top Left */}
                    <div className="absolute top-4 left-3 text-blue-500 text-2xl">
                      ❝
                    </div>

                    {/* Text */}
                    <p className="text-xs text-gray-700 italic mt-2 pl-4">
                      {item.text}
                    </p>

                    {/* Bottom */}
                    <div className="mt-6 flex items-center gap-3">
                      <img
                        src={item.img}
                        alt={item.name}
                        className="w-10 h-10 rounded-full border-2 border-blue-500 object-cover"
                      />
                      <span className="text-gray-900 font-medium text-xs">
                        - {item.name}
                      </span>
                    </div>
                  </blockquote>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center mt-8 space-x-2">
          {testimonials.slice(0, isMobile ? 5 : 3).map((_, index) => (
            <div
              key={index}
              className="w-2 h-2 rounded-full bg-gray-300 opacity-50 transition-all duration-300"
            ></div>
          ))}
        </div>
      </div>
    </section>
  );
}
