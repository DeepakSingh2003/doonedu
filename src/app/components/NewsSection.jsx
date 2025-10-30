"use client";

import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { useRouter } from "next/navigation";
import "swiper/css";

const NewsSection = () => {
  const [newsData, setNewsData] = useState([]);
  const router = useRouter();

  useEffect(() => {
    fetch("https://admin.doonedu.com/blog?api_call=true")
      .then((res) => {
        if (!res.ok) throw new Error("Network response was not ok");
        return res.json();
      })
      .then((data) => {
        const blogs = data.response.blogs.blogs;
        const mapped = blogs.map((blog) => ({
          id: blog.id,
          title: blog.title,
          excerpt: blog.short_description,
          date: new Date(blog.updated_at).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          }),
          source: blog.auther_name || "DoonEdu",
          pathname: blog.seo_url.replace("https://admin.doonedu.com", ""),  // Strip domain
          image: blog.thumb_image
            ? `https://admin.doonedu.com/images/blogs/${blog.id}/${blog.thumb_image}`
            : "https://via.placeholder.com/300x180/005F8D/FFFFFF?text=News+Image",
        }));
        setNewsData(mapped);
      })
      .catch((err) => {
        console.error("Failed to load news:", err);
        setNewsData([]);
      });
  }, []);

  const handleReadMore = (pathname) => {
    const safePath =
      typeof pathname === "string" && pathname.startsWith("/")
        ? pathname
        : "/";

    router.push(safePath);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section className="news-section py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <h2
          className="text-3xl font-bold text-center mb-8"
          style={{ color: "#005F8D" }}
        >
          News & Updates about Boarding Schools Across India
        </h2>

        {newsData.length === 0 ? (
          <p className="text-center text-gray-500">Loading news…</p>
        ) : (
          <Swiper
            spaceBetween={20}
            slidesPerView={1}
            breakpoints={{
              640: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            loop={true}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            modules={[Autoplay]}
            pagination={false}
            className="news-swiper"
          >
            {newsData.map((item) => (
              <SwiperSlide key={item.id}>
                <div className="news-card bg-white p-5 rounded-lg shadow-md h-full flex flex-col">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-40 object-cover rounded-md mb-3"
                  />

                  <div className="flex flex-col justify-between flex-grow">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">
                        {item.title}
                      </h3>
                      <p className="text-sm text-gray-600 mb-3 line-clamp-3">
                        {item.excerpt}
                      </p>
                    </div>

                    <div>
                      <small className="text-xs text-gray-500 block mb-2">
                        {item.date} | {item.source}
                      </small>

                      <button
                        onClick={() => handleReadMore(item.pathname)}
                        className="text-blue-600 text-sm font-medium hover:underline focus:outline-none cursor-pointer"
                      >
                        Read More
                      </button>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
    </section>
  );
};

export default NewsSection;