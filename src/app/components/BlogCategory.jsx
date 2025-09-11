"use client";
import React, { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

// Improved PlaceholderImage with animation
const PlaceholderImage = ({ className = "" }) => (
  <div
    className={`w-full h-36 sm:h-48 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center text-gray-400 animate-pulse ${className}`}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-10 w-10 opacity-50"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
      />
    </svg>
  </div>
);

// Enhanced Meta component with better styling
const Meta = ({ author, views, date }) => (
  <div className="flex items-center text-xs text-gray-500 gap-3 mt-2">
    {author && (
      <span className="flex items-center gap-1 truncate">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-4 h-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
          />
        </svg>
        {author}
      </span>
    )}
    {views != null && (
      <span className="flex items-center gap-1">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-4 h-4"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
        >
          <path
            d="M2 12s4-8 10-8 10 8 10 8-4 8-10 8S2 12 2 12z"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="12" cy="12" r="3" strokeWidth="1.5" />
        </svg>
        {views.toLocaleString()}
      </span>
    )}
    {date && (
      <span className="flex items-center gap-1">
        <svg
          xmlns="http://www.w3.org2000/svg"
          className="w-4 h-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
        {date}
      </span>
    )}
  </div>
);

// Enhanced SectionCard with better styling and hover effects
const SectionCard = ({ post, onClick }) => (
  <div
    className="bg-white rounded-xl shadow-md overflow-hidden cursor-pointer transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1 group"
    onClick={onClick}
  >
    <div className="relative overflow-hidden">
      {post?.image ? (
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
      ) : (
        <PlaceholderImage />
      )}
      <div className="absolute top-3 left-3 bg-blue-600 text-white text-xs font-semibold px-2 py-1 rounded-full">
        {post.ageGroup}
      </div>
      <div className="absolute top-3 right-3 bg-white text-gray-700 text-xs font-medium px-2 py-1 rounded-full shadow-sm">
        {post.readTime}
      </div>
    </div>
    <div className="p-4">
      <h3 className="text-sm font-semibold text-gray-800 line-clamp-2 group-hover:text-blue-600 transition-colors">
        {post.title}
      </h3>
      <p className="text-xs text-gray-600 mt-2 line-clamp-2">
        {post.description}
      </p>
      <Meta author={post.author?.name} views={post.views} date={post.date} />
    </div>
  </div>
);

export default function BlogCategory({ categoryData }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState("newest");
  const [categoryTitle, setCategoryTitle] = useState("Category");
  const [categorySlug, setCategorySlug] = useState("");
  const router = useRouter();
  const pathname = usePathname();
  const itemsPerPage = 8;

  // Extract category from URL
  useEffect(() => {
    if (pathname) {
      // Extract the category slug from the URL
      const pathParts = pathname.split("/");
      const slug = pathParts[pathParts.length - 1];
      setCategorySlug(slug);

      // Convert slug to title case for display
      if (slug && slug !== "category") {
        const formattedTitle = slug
          .split("-")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ");
        setCategoryTitle(formattedTitle);
      } else if (categoryData?.response?.category?.title) {
        // Fallback to API data if available
        setCategoryTitle(categoryData.response.category.title);
      }
    }
  }, [pathname, categoryData]);

  // Process API data for articles
  const articles =
    categoryData?.response?.blogs?.blogs?.map((blog) => {
      // Extract just the SEO URL path without the domain
      let seoUrlPath = blog.seo_url;
      if (seoUrlPath && seoUrlPath.includes("doonedu.com")) {
        // Remove the domain part and keep only the path
        const urlObj = new URL(seoUrlPath);
        seoUrlPath = urlObj.pathname;
      }

      return {
        id: blog.id,
        title: blog.title,
        description: blog.short_description.replace(/(\r\n)+/g, " ").trim(),
        image: `https://www.doonedu.com/images/blogs/${blog.id}/${blog.thumb_image}`,
        author: { name: blog.auther_name },
        views: Math.floor(Math.random() * 10000),
        date: new Date(blog.created_at),
        formattedDate: new Date(blog.created_at).toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        }),
        ageGroup: "All Ages",
        readTime: `${Math.floor(Math.random() * 10) + 5} min read`,
        seo_url: seoUrlPath,
      };
    }) || [];

  // Sort articles based on selected option
  const sortedArticles = [...articles].sort((a, b) => {
    if (sortBy === "newest") {
      return b.date - a.date;
    } else if (sortBy === "oldest") {
      return a.date - b.date;
    } else if (sortBy === "views") {
      return b.views - a.views;
    }
    return 0;
  });

  const totalPages = Math.ceil(sortedArticles.length / itemsPerPage);
  const indexOfLastPost = currentPage * itemsPerPage;
  const indexOfFirstPost = indexOfLastPost - itemsPerPage;
  const currentPosts = sortedArticles.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const pageNumbers = [];
  const maxVisiblePages = 5;
  let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
  let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

  if (endPage - startPage + 1 < maxVisiblePages) {
    startPage = Math.max(1, endPage - maxVisiblePages + 1);
  }

  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  const handlePostClick = (post) => {
    // Use the SEO URL path directly (already processed to remove domain)
    router.push(post.seo_url);
    window.scrollTo(0, 0);
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
    setCurrentPage(1); // Reset to first page when changing sort
  };

  const handleBackToBlog = () => {
    router.push("/blog");
    window.scrollTo(0, 0);
  };

  if (!categoryData) {
    return (
      <div className="container mx-auto p-4 text-center text-red-500">
        No data found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section with Background Image and Overlay */}
      <div
        className="relative text-white py-16 px-4 mt-0 sm:mt-13"
        style={{
          backgroundImage:
            "url('https://res.cloudinary.com/dnq8fbcxh/image/upload/v1757501466/Pngtree_school_season_welcome_new_students_923676_u9cuvj.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-blue-900 opacity-70"></div>

        {/* Back to Blog Button */}
        <div className="absolute top-4 left-4 z-10">
          <button
            onClick={handleBackToBlog}
            className="flex items-center text-white text-sm bg-black bg-opacity-30 hover:bg-opacity-50 rounded-full px-4 py-2 transition-all duration-200 backdrop-blur-sm"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 mr-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Back to Blog
          </button>
        </div>

        <div className="container mx-auto relative z-10">
          <h1 className="text-3xl font-bold text-center mb-2">
            {categoryTitle}
          </h1>
          <p className="text-center text-blue-100 max-w-2xl mx-auto">
            Explore our latest articles, insights, and news on{" "}
            {categoryTitle.toLowerCase()}
          </p>
        </div>
      </div>

      <div className="container mx-auto p-4 mt-6">
        {/* Results Count */}
        <div className="mb-6 flex justify-between items-center">
          <p className="text-sm text-gray-600">
            Showing {indexOfFirstPost + 1}-
            {Math.min(indexOfLastPost, sortedArticles.length)} of{" "}
            {sortedArticles.length} articles
          </p>

          {/* Sort Dropdown (Now Functional) */}
          <div className="relative">
            <select
              value={sortBy}
              onChange={handleSortChange}
              className="text-sm border border-gray-300 rounded-lg py-2 px-4 pr-8 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="views">Most Viewed</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg
                className="h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {currentPosts.length > 0 ? (
            currentPosts.map((post) => (
              <SectionCard
                key={post.id}
                post={{ ...post, date: post.formattedDate }}
                onClick={() => handlePostClick(post)}
              />
            ))
          ) : (
            <div className="text-gray-500 col-span-full text-center py-12">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-16 w-16 mx-auto text-gray-300 mb-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <p className="text-lg font-medium">
                No blogs found in this category
              </p>
              <p className="text-sm mt-2">Check back later for new content</p>
            </div>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-10">
            <nav className="flex items-center gap-1">
              <button
                onClick={() => paginate(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 rounded-md text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed text-sm flex items-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 mr-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
                Previous
              </button>

              {startPage > 1 && (
                <>
                  <button
                    onClick={() => paginate(1)}
                    className="w-10 h-10 flex items-center justify-center rounded-md text-sm text-gray-700 bg-white border border-gray-300 hover:bg-gray-50"
                  >
                    1
                  </button>
                  {startPage > 2 && (
                    <span className="px-2 text-gray-500">...</span>
                  )}
                </>
              )}

              {pageNumbers.map((number) => (
                <button
                  key={number}
                  onClick={() => paginate(number)}
                  className={`w-10 h-10 flex items-center justify-center rounded-md text-sm ${
                    currentPage === number
                      ? "bg-blue-600 text-white border-blue-600"
                      : "text-gray-700 bg-white border border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  {number}
                </button>
              ))}

              {endPage < totalPages && (
                <>
                  {endPage < totalPages - 1 && (
                    <span className="px-2 text-gray-500">...</span>
                  )}
                  <button
                    onClick={() => paginate(totalPages)}
                    className="w-10 h-10 flex items-center justify-center rounded-md text-sm text-gray-700 bg-white border border-gray-300 hover:bg-gray-50"
                  >
                    {totalPages}
                  </button>
                </>
              )}

              <button
                onClick={() => paginate(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="px-4 py-2 rounded-md text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed text-sm flex items-center"
              >
                Next
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 ml-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </nav>
          </div>
        )}
      </div>
    </div>
  );
}
