"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import DOMPurify from "dompurify";

const PlaceholderImage = ({ className = "" }) => (
  <div
    className={`w-full h-36 sm:h-48 bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center text-gray-500 ${className}`}
  >
    Image
  </div>
);

const Meta = ({ author, views, date }) => (
  <div className="flex items-center text-[0.6rem] text-gray-500 gap-3 mt-2">
    {author && <span className="truncate">{author}</span>}
    {views != null && (
      <span className="flex items-center gap-1">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-2.5 h-2.5"
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
        </svg>
        {views}
      </span>
    )}
    {date && <span>{date}</span>}
  </div>
);

const SmallRankCard = ({ rank, title, meta, onClick }) => (
  <button
    onClick={onClick}
    className="w-full text-left bg-white p-3 rounded-lg shadow-sm hover:shadow-md transition flex gap-3 items-start cursor-pointer"
  >
    <div className="flex items-center justify-center w-8 h-8 rounded-md bg-blue-50 text-blue-600 font-semibold shrink-0 text-xs">
      #{rank}
    </div>
    <div className="flex-1 min-w-0">
      <div className="text-xs font-medium text-gray-800 truncate">{title}</div>
      <div className="text-[0.6rem] text-gray-500 mt-1 line-clamp-2">
        {meta}
      </div>
    </div>
  </button>
);

const SectionCard = ({ post, onClick }) => {
  const sanitizedDescription = DOMPurify.sanitize(post.description, {
    ALLOWED_TAGS: ["p", "br", "strong", "em", "ul", "li", "a"],
    ALLOWED_ATTR: ["href"],
  });

  return (
    <div
      className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
      onClick={onClick}
    >
      {post?.image ? (
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-36 object-cover"
          loading="lazy"
        />
      ) : (
        <PlaceholderImage />
      )}
      <div className="p-3">
        <h3 className="text-xs font-semibold text-gray-800 line-clamp-2">
          {post.title}
        </h3>
        <div
          className="text-[0.6rem] text-gray-500 mt-1 line-clamp-2 prose prose-sm max-w-none"
          dangerouslySetInnerHTML={{ __html: sanitizedDescription }}
        />
        <div className="flex items-center justify-between mt-3">
          <div className="text-[0.6rem] text-gray-500">{post.ageGroup}</div>
          <div className="text-[0.6rem] text-gray-500">{post.readTime}</div>
        </div>
        <Meta author={post.author?.name} views={post.views} date={post.date} />
      </div>
    </div>
  );
};

const BlogSection = ({
  title,
  posts,
  itemsPerPage = 8,
  onPostClick,
  currentPage,
  setCurrentPage,
}) => {
  const totalPages = Math.ceil(posts.length / itemsPerPage);
  const indexOfLastPost = currentPage * itemsPerPage;
  const indexOfFirstPost = indexOfLastPost - itemsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <section className="mb-8 mt-0 sm:mt-8">
      <div className="flex items-center justify-center mb-4">
        <h1 className="text-lg font-bold text-gray-800">{title}</h1>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {currentPosts.length > 0 ? (
          currentPosts.map((post) => (
            <SectionCard
              key={post.id}
              post={post}
              onClick={() => onPostClick(post)}
            />
          ))
        ) : (
          <div className="text-gray-500 col-span-full text-center py-8 text-xs">
            No posts available
          </div>
        )}
      </div>
      {totalPages > 1 && (
        <div className="flex justify-center mt-6">
          <nav className="flex items-center gap-1">
            <button
              onClick={() => paginate(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 rounded-md text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed text-xs"
            >
              Previous
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(
              (number) => (
                <button
                  key={number}
                  onClick={() => paginate(number)}
                  className={`w-8 h-8 flex items-center justify-center rounded-md text-xs ${
                    currentPage === number
                      ? "bg-blue-600 text-white"
                      : "text-gray-700 bg-white border border-gray-300 hover:bg-gray-300"
                  }`}
                >
                  {number}
                </button>
              )
            )}
            <button
              onClick={() => paginate(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="px-3 py-1 rounded-md text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed text-xs"
            >
              Next
            </button>
          </nav>
        </div>
      )}
    </section>
  );
};

const CategoryFilter = ({ categories }) => {
  let activeCategories = [];

  if (categories && categories.length > 0) {
    activeCategories = categories.filter((category) => category.status === "1");
  }

  return (
    <div className="mb-6 p-5 bg-white rounded-2xl border border-gray-100 mt-0 sm:mt-34">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Categories</h2>
      {activeCategories.length > 0 ? (
        <div className="flex flex-col gap-2">
          {activeCategories.map((category) => {
            const slug = category.seo_url?.split("/").pop();
            return (
              <Link
                key={category.id}
                href={`/blog/category/${slug}`}
                className="w-full block px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 bg-gray-50 text-gray-700 hover:bg-gray-100 hover:shadow-sm"
              >
                {category.title}
              </Link>
            );
          })}
        </div>
      ) : (
        <p className="text-gray-500 text-sm italic text-center">
          No categories available
        </p>
      )}
    </div>
  );
};

export default function Blog() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("https://www.doonedu.com/blog?api_call=true");
        if (!res.ok) throw new Error("Failed to fetch data");
        const json = await res.json();
        setData(json);
      } catch (e) {
        console.error("Error fetching:", e);
        setError(e.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const articles =
    data?.response?.blogs?.blogs?.map((blog) => ({
      id: blog.id,
      title: blog.title,
      description: blog.short_description,
      image: `https://www.doonedu.com/images/blogs/${blog.id}/${blog.thumb_image}`,
      author: { name: blog.auther_name },
      views: Math.floor(Math.random() * 10000),
      date: new Date(blog.created_at).toLocaleDateString(),
      ageGroup: "All Ages",
      readTime: `${Math.floor(Math.random() * 10) + 5} min read`,
      seo_url: blog.seo_url,
    })) || [];

  const categories = data?.response.data.categories || [];

  const featured = articles[0] || null;
  const trending = articles.slice(1, 6) || [];

  const handlePostClick = (post) => {
    const url = new URL(post.seo_url, "https://doonedu.com");
    router.push(url.pathname);
    window.scrollTo(0, 0);
  };

  if (isLoading) {
    return (
      <div className="container mx-auto p-4 bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="animate-pulse space-y-4 w-full max-w-4xl">
          <div className="h-28 bg-gray-200 rounded-lg" />
          <div className="h-6 bg-gray-200 rounded" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-4 text-center text-red-500">
        {error}
      </div>
    );
  }

  const sanitizedFeaturedDescription = featured
    ? DOMPurify.sanitize(featured.description, {
        ALLOWED_TAGS: ["p", "br", "strong", "em", "ul", "li", "a"],
        ALLOWED_ATTR: ["href"],
      })
    : "No description";

  return (
    <div className="container mx-auto p-4 min-h-screen mt-0 sm:mt-10">
      {/* Hero */}
      <section id="hero" className="pt-2 md:pt-6">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 min-h-[50vh] flex flex-col-reverse md:flex-row items-center">
          <div className="text-center md:text-left px-1 md:w-2/3 pb-5">
            <h1 className="text-xl sm:text-2xl md:text-4xl font-bold mb-3 sm:mb-6">
              Blog & News
              <br />
              <span className="text-xs sm:text-lg md:text-xl font-bold">
                Insights for Parents & Educators
              </span>
            </h1>
            <p className="text-xs sm:text-sm md:text-base text-gray-700 mb-5 md:mb-6">
              Stay tuned to stay relevant in the journey of parenting! Cut
              through the clutter of news out there & read stories that inform,
              inspire & educate you and your child!
            </p>
          </div>
          <div className="mb-2 md:mb-0 md:ml-8 flex-1">
            <img
              alt="Parenting Journey"
              width="400"
              height="300"
              className="w-3/4 sm:w-full max-w-sm mx-auto"
              src="https://res.cloudinary.com/dnq8fbcxh/image/upload/v1757069101/Screenshot_2025-09-05_161442_clccnp.png"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* Content */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3 order-1">
          {/* Trending */}
          <section className="mb-8 mt-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-gray-800">Trending News</h2>
              <div className="text-xs text-gray-500">
                Top stories & popular reads
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div
                className="md:col-span-2 bg-white rounded-lg shadow-md overflow-hidden cursor-pointer"
                onClick={() => featured && handlePostClick(featured)}
              >
                {featured?.image ? (
                  <img
                    src={featured.image}
                    alt={featured.title}
                    className="w-full h-56 object-cover"
                    loading="lazy"
                  />
                ) : (
                  <div className="w-full h-56 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center text-gray-500">
                    Featured image
                  </div>
                )}
                <div className="p-4">
                  <div className="inline-block bg-blue-50 text-blue-600 px-2 py-1 rounded-full text-[0.6rem] font-semibold">
                    #1 Trending
                  </div>
                  <h3 className="text-base font-bold text-gray-900 mt-3">
                    {featured?.title || "No Featured Post"}
                  </h3>
                  <div
                    className="text-xs text-gray-600 mt-2 line-clamp-2 prose prose-sm max-w-none"
                    dangerouslySetInnerHTML={{
                      __html: sanitizedFeaturedDescription,
                    }}
                  />
                  <div className="flex items-center justify-between mt-4">
                    <Meta
                      author={featured?.author?.name}
                      views={featured?.views}
                      date={featured?.date}
                    />
                    <span className="text-blue-500 text-xs cursor-pointer">
                      Read Full Story →
                    </span>
                  </div>
                </div>
              </div>
              <div className="space-y-3">
                {trending.length > 0 ? (
                  trending.map((t, i) => (
                    <SmallRankCard
                      key={t.id}
                      rank={i + 2}
                      title={t.title}
                      meta={`${t.views} views · ${t.date}`}
                      onClick={() => handlePostClick(t)}
                    />
                  ))
                ) : (
                  <div className="text-gray-500 text-xs">
                    No trending posts available
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* All */}
          <main>
            <BlogSection
              title="All Articles"
              posts={articles}
              itemsPerPage={8}
              onPostClick={handlePostClick}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          </main>
        </div>

        {/* Sidebar */}
        <aside className="lg:col-span-1 order-2">
          <CategoryFilter categories={categories} />
        </aside>
      </div>
    </div>
  );
}
