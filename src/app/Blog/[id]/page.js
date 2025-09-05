"use client";
import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import data from "../data";

export default function ArticleDetail() {
  const router = useRouter();
  const params = useParams();
  const id = params.id;
  const [article, setArticle] = useState(null);

  useEffect(() => {
    const foundArticle = data.articles.find((art) => art.id === id);
    setArticle(foundArticle || null);
  }, [id]);

  if (!article) {
    return (
      <div className="text-center text-gray-600 py-6 text-xs">
        Article not found
      </div>
    );
  }

  // PlaceholderImage component
  const PlaceholderImage = ({ className }) => (
    <div
      className={`bg-gray-200 flex items-center justify-center ${className}`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-8 w-8 text-gray-400"
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

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 px-3 md:px-4 py-3 md:py-4 bg-gray-50 mt-0 sm:mt-10">
      {/* Main Article Content */}
      <div className="lg:col-span-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-3 md:p-4">
            <button
              onClick={() => router.push("/Blog")}
              className="flex items-center text-blue-600 hover:text-blue-800 transition-colors mb-3 md:mb-4 text-sm font-medium"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 mr-1"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                  clipRule="evenodd"
                />
              </svg>
              Back to Articles
            </button>

            <h1 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">
              {article.title}
            </h1>

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mt-4">
              {/* Author Info */}
              <div className="flex items-center gap-2">
                <Link
                  href={article.author.profileUrl}
                  className="rounded-full bg-gray-200 flex items-center justify-center w-10 h-10 flex-shrink-0"
                >
                  <span className="font-medium text-gray-700 text-sm">
                    {article.author.initials}
                  </span>
                </Link>
                <div>
                  <div className="flex items-center gap-1.5">
                    <Link
                      href={article.author.profileUrl}
                      className="text-gray-900 font-medium hover:underline text-sm"
                    >
                      {article.author.name}
                    </Link>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-3 w-3 text-blue-500"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <p className="text-gray-600 text-xs">
                    Updated: {article.date}
                  </p>
                </div>
              </div>

              {/* Views and Share */}
              <div className="flex items-center gap-3">
                <span className="text-gray-600 text-xs">
                  {article.views} views
                </span>
                <span className="text-gray-300">•</span>
                <button className="text-gray-600 text-xs flex items-center gap-1 hover:text-gray-800 transition-colors">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="18" cy="5" r="3"></circle>
                    <circle cx="6" cy="12" r="3"></circle>
                    <circle cx="18" cy="19" r="3"></circle>
                    <line x1="8.59" x2="15.42" y1="13.51" y2="17.49"></line>
                    <line x1="15.41" x2="8.59" y1="6.51" y2="10.49"></line>
                  </svg>
                  Share
                </button>
                <span className="bg-gray-100 text-gray-700 px-2 py-0.5 rounded-full text-[0.6rem] font-medium">
                  {article.category}
                </span>
              </div>
            </div>
          </div>

          {/* Article Image */}
          <div className="relative aspect-video w-full mx-auto">
            {article.image ? (
              <img
                alt={article.title}
                src={article.image}
                className="object-cover w-full h-full"
              />
            ) : (
              <PlaceholderImage className="h-full" />
            )}
          </div>

          {/* Banner Ad */}
          <div className="px-3 py-3 border-y border-gray-200">
            <a
              href="/exploreschools"
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
              <img
                alt="Admissions Banner"
                src="https://res.cloudinary.com/dnq8fbcxh/image/upload/v1757067533/ChatGPT_Image_Sep_5_2025_03_46_19_PM_k5ureq.png"
                className="w-full h-auto max-h-12 object-contain mx-auto"
              />
            </a>
          </div>

          {/* Article Content */}
          <div className="p-3 md:p-6 text-gray-800 prose max-w-none text-sm">
            {article.content || (
              <p className="text-gray-600 text-xs">
                {article.description ||
                  "No content available for this article."}
              </p>
            )}
          </div>

          {/* Breadcrumb (Mobile Only) */}
          <div className="block md:hidden px-3 py-2 border-t border-gray-200">
            <nav className="flex items-center gap-1 text-[0.6rem] text-gray-600">
              <Link
                href="/"
                className="flex items-center hover:text-gray-800 transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-3 h-3 mr-0.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  />
                </svg>
                Home
              </Link>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-3 h-3 text-gray-400"
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
              <Link
                href="/Blog"
                className="hover:text-gray-800 transition-colors"
              >
                News
              </Link>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-3 h-3 text-gray-400"
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
              <span className="text-gray-900 font-medium truncate max-w-[100px]">
                {article.title}
              </span>
            </nav>
          </div>

          {/* Footer Note */}
          <div className="p-3 bg-blue-50 text-center text-blue-700 text-xs">
            This article has been reviewed by our panel. The points, views and
            suggestions put forth in this article have been expressed keeping
            the best interests of fellow parents in mind. We hope you found the
            article beneficial.
          </div>
        </div>
      </div>

      {/* Sidebar */}
      <div className="lg:col-span-4">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sticky top-20">
          <div className="flex items-center mb-4">
            <div className="w-1 h-6 bg-blue-600 rounded-full mr-2"></div>
            <h2 className="text-lg font-bold">
              <span className="text-blue-600">Trending</span> News
            </h2>
          </div>

          <div className="space-y-3 max-h-[calc(100vh-160px)] overflow-y-auto pr-1">
            {data.trendingNews.map((news) => (
              <Link
                key={news.id}
                href={`/Blog/${news.id}`}
                className="flex gap-2 p-2 rounded-lg border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all"
              >
                <div className="flex-shrink-0 relative">
                  {news.image ? (
                    <img
                      alt={news.title}
                      src={news.image}
                      className="w-16 h-16 object-cover rounded-md"
                    />
                  ) : (
                    <PlaceholderImage className="w-16 h-16 rounded-md" />
                  )}
                  <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 text-white text-[0.6rem] text-center py-0.5 rounded-b-md">
                    {news.views} views
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-gray-900 text-xs line-clamp-2 mb-1">
                    {news.title}
                  </h3>
                  <div className="flex items-center justify-between text-[0.6rem] text-gray-500">
                    <span className="truncate">By {news.author.name}</span>
                    <span>{news.date}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
