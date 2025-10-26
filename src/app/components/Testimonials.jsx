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
  },
  {
    id: 2,
    text: "The detailed school comparisons and expert guidance helped us choose the right CBSE school for our son. Thank you for your excellent service!",
    name: "Mr. Kapoor",
  },
  {
    id: 3,
    text: "As an NRI family, we were confused about the Indian education system. Global Edu.Consulting guided us through every step of the admission process.",
    name: "Mr. & Mrs. Patel",
  },
  {
    id: 4,
    text: "The virtual school tours feature was amazing! We could explore campuses from home before making our decision.",
    name: "Ms. Reddy",
  },
  {
    id: 5,
    text: "We saved so much time and effort using Global Edu.Consulting. The application process was streamlined and hassle-free.",
    name: "Dr. Singh",
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
    return () => window.removeEventListener("resize", checkMobile);
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

        {/* Desktop Carousel */}
        {!isMobile && (
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
                    <blockquote className="relative p-6 rounded-2xl border-l-4 border-blue-500 bg-white shadow-lg flex flex-col justify-between h-56 transition-all duration-300 hover:shadow-xl hover:scale-105">
                      <div className="absolute top-4 left-3 text-blue-500 text-2xl">
                        ❝
                      </div>
                      <p className="text-sm text-gray-700 italic mt-2 pl-4">
                        {item.text}
                      </p>
                      <div className="mt-6 text-center pr-2">
                        <span className="text-gray-900 font-semibold text-sm">
                          - {item.name}
                        </span>
                      </div>
                    </blockquote>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        )}

        {/* Mobile Carousel */}
        {isMobile && (
          <div className="md:hidden">
            <Swiper
              modules={[Autoplay]}
              autoplay={{ delay: 3500, disableOnInteraction: false }}
              spaceBetween={20}
              slidesPerView={1}
              loop={true}
              speed={800}
            >
              {testimonials.map((item) => (
                <SwiperSlide key={item.id}>
                  <div className="px-4">
                    <blockquote className="relative p-6 rounded-2xl border-l-4 border-blue-500 bg-white shadow-lg flex flex-col justify-between h-52 mx-auto">
                      <div className="absolute top-4 left-3 text-blue-500 text-2xl">
                        ❝
                      </div>
                      <p className="text-xs text-gray-700 italic mt-2 pl-4">
                        {item.text}
                      </p>
                      <div className="mt-4 text-center">
                        <span className="text-gray-900 font-semibold text-xs">
                          - {item.name}
                        </span>
                      </div>
                    </blockquote>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        )}
      </div>
    </section>
  );
}
