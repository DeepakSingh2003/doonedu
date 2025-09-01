// components/Testimonials.jsx
"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const testimonials = [
  {
    id: 1,
    text: "I was looking for International schools for Class 5 in Delhi. Ezyschooling helped me find and apply to the right schools.",
    name: "Mr. Hemant",
    img: "https://ezyschooling.com/_next/image?url=%2Fimages%2Fhomepage%2Fhemant1.webp&w=256&q=80",
  },
  {
    id: 2,
    text: "I got my child's admission done via Ezyschooling. Ezyschooling helped me with all the admission process and made applying easy.",
    name: "Ms. Isha",
    img: "https://ezyschooling.com/_next/image?url=%2Fimages%2Fhomepage%2Fisha1.webp&w=256&q=80",
  },
  {
    id: 3,
    text: "I found Ezyschooling when I was surfing the net to find schools for my child in grade 2. At Ezyschooling I found all the details and made my admission journey easy.",
    name: "Mr. Sudipta",
    img: "https://ezyschooling.com/_next/image?url=%2Fimages%2Fhomepage%2Fsudipta1.webp&w=256&q=80",
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="flex justify-center py-8 px-4">
      <div className="w-full max-w-4xl">
        <h3 className="text-center text-xl md:text-2xl font-semibold mb-10">
          What our parents have to say?
        </h3>

        {/* Desktop View - Grid */}
        <div className="hidden md:grid grid-cols-3 gap-28 justify-items-center">
          {testimonials.map((item) => (
            <div key={item.id} className="w-[300px]">
              <blockquote className="relative p-6 rounded-2xl border-l-4 border-[#3171f4] bg-white shadow-md flex flex-col justify-between w-[300px] h-[220px]">
                {/* Quote Icon Top Left */}
                <div className="absolute top-4 left-3 text-[#3171f4] text-2xl">
                  ❝
                </div>

                {/* Text */}
                <p className="text-[11px] text-gray-700 italic mt-2">
                  {item.text}
                </p>

                {/* Bottom */}
                <div className="mt-6 flex items-center gap-3">
                  <img
                    src={item.img}
                    alt={item.name}
                    className="w-12 h-12 rounded-full border border-[#3171f4] object-cover"
                  />
                  <span className="text-gray-900 font-medium text-sm">
                    - {item.name}
                  </span>
                </div>
              </blockquote>
            </div>
          ))}
        </div>

        {/* Mobile View - Swiper Carousel */}
        <div className="md:hidden">
          <Swiper
            modules={[Pagination, Autoplay]}
            pagination={{ clickable: true }}
            autoplay={{ delay: 3000 }}
            spaceBetween={20}
            slidesPerView={1}
          >
            {testimonials.map((item) => (
              <SwiperSlide key={item.id}>
                <blockquote className="relative p-6 rounded-2xl border-l-4 border-[#3171f4] bg-white shadow-md flex flex-col justify-between w-[300px] h-[220px] mx-auto">
                  {/* Quote Icon Top Left */}
                  <div className="absolute top-4 left-3 text-[#3171f4] text-2xl">
                    ❝
                  </div>

                  {/* Text */}
                  <p className="text-[11px] text-gray-700 italic mt-2">
                    {item.text}
                  </p>

                  {/* Bottom */}
                  <div className="mt-6 flex items-center gap-3">
                    <img
                      src={item.img}
                      alt={item.name}
                      className="w-12 h-12 rounded-full border border-[#3171f4] object-cover"
                    />
                    <span className="text-gray-900 font-medium text-sm">
                      - {item.name}
                    </span>
                  </div>
                </blockquote>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
