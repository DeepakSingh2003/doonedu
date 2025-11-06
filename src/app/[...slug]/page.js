"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Location from "../components/Loacation";
import School from "../components/School";
import BlogList from "../components/BlogList";
import BlogCategory from "../components/BlogCategory";
import BlogView from "../components/BlogView"; // ✅ new import
import Category from "../components/Category";

export default function Page() {
  const { slug } = useParams();
  const slugArray = Array.isArray(slug) ? slug : [slug];

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slugArray?.length) return;

    const fetchData = async () => {
      try {
        let apiUrl = `${
          process.env.NEXT_PUBLIC_MAIN_API_URL_SLUG
        }/${slugArray.join("/")}?api_call=true`;

        const res = await fetch(apiUrl, { cache: "no-store" });
        const json = await res.json();
        setData(json);
      } catch (e) {
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [slugArray]);

  if (loading) return <p>Loading...</p>;
  if (!data) return <p>No data found.</p>;

  // ✅ Location page
  if (slugArray.length === 1 && data.response?.page_type === "location") {
    return <Location locationData={data} />;
  }
    // ✅ Category page
if (slugArray.length === 1 && data.response?.page_type === "category") {
    return <Category categoryData={data} />; 
  }

  // ✅ School page
  if (slugArray.length === 2 && data.response?.page_type === "school_view") {
    return <School school={data.response.school} seo={data.response.data} />;
  }

  // ✅ Blog list page
  if (slugArray[0] === "blog" && data.response?.page_type === "blog_list") {
    return <BlogList blogs={data} />;
  }

  // ✅ Blog category page
  if (slugArray[0] === "blog" && data.response?.page_type === "blog_category") {
    return <BlogCategory categoryData={data} />;
  }

  // ✅ Blog view page
  if (slugArray[0] === "blog" && data.response?.page_type === "blog_view") {
    return <BlogView blogData={data} />;
  }

  return <p>Invalid page</p>;
}