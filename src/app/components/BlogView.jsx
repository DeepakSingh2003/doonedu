"use client";
import React from "react";
import Link from "next/link";
import DOMPurify from "dompurify";

export default function BlogView({ blogData }) {
  const { data } = blogData.response || {};

  if (!data) {
    return (
      <div className="text-center text-gray-600 py-8 text-sm">
        Blog not found
      </div>
    );
  }

  // Base URL for images
  const baseUrl = "https://www.doonedu.com";

  // Sanitize content with error handling
  const sanitizeHtml = (html) => {
    if (!html) {
      console.warn("No HTML content provided for post:", data.id);
      return "";
    }
    try {
      // Check if html is URL-encoded (contains % characters)
      const isUrlEncoded = /%[0-9A-Fa-f]{2}/.test(html);

      let decodedHtml = html;
      if (isUrlEncoded) {
        // Decode in parts to avoid URI malformed errors
        try {
          // First, try to decode the entire string
          decodedHtml = decodeURIComponent(html);
        } catch (decodeError) {
          console.warn(
            "Full decode failed, trying partial decode for post",
            data.id,
            ":",
            decodeError
          );
          // If full decode fails, try to replace problematic sequences
          decodedHtml = html.replace(/%([0-9A-Fa-f]{2})/g, (match, p1) => {
            try {
              return decodeURIComponent("%" + p1);
            } catch (e) {
              // If individual decode fails, keep the original
              return match;
            }
          });
        }
      }

      // Replace relative image URLs with absolute URLs
      const fixedHtml = decodedHtml
        .replace(/src="\/media\//g, `src="${baseUrl}/media/`)
        .replace(/src="\//g, `src="${baseUrl}/`);

      // Sanitize the fixed HTML
      const sanitized = DOMPurify.sanitize(fixedHtml, {
        ALLOWED_TAGS: [
          "p",
          "br",
          "strong",
          "em",
          "b",
          "i",
          "u",
          "ul",
          "ol",
          "li",
          "a",
          "h1",
          "h2",
          "h3",
          "h4",
          "h5",
          "h6",
          "blockquote",
          "code",
          "pre",
          "span",
          "div",
          "table",
          "thead",
          "tbody",
          "tr",
          "th",
          "td",
          "img",
          "style",
          "meta",
        ],
        ALLOWED_ATTR: [
          "href",
          "target",
          "title",
          "class",
          "style",
          "src",
          "alt",
          "width",
          "height",
          "itemscope",
          "itemtype",
          "itemprop",
          "content",
        ],
        ALLOWED_URI_SCHEMES: ["http", "https", "mailto"],
        FORBID_TAGS: [
          "script",
          "iframe",
          "object",
          "embed",
          "form",
          "input",
          "textarea",
          "button",
        ],
        ADD_ATTR: ["target"],
      });

      console.log(
        "Sanitized HTML for post",
        data.id,
        ":",
        sanitized.substring(0, 200) + (sanitized.length > 200 ? "..." : "")
      );
      return sanitized;
    } catch (e) {
      console.error("Error sanitizing HTML for post", data.id, ":", e);
      // Fallback: try to extract plain text
      try {
        const tempDiv = document.createElement("div");
        tempDiv.innerHTML = html;
        return (
          tempDiv.textContent || tempDiv.innerText || html.substring(0, 500)
        );
      } catch (textError) {
        console.error(
          "Error extracting plain text for post",
          data.id,
          ":",
          textError
        );
        return html.substring(0, 500) || "Content could not be loaded";
      }
    }
  };

  const sanitizedContent = sanitizeHtml(data.content || data.description || "");

  // Parse categories
  const categories = data.categories || [];

  // Get category name
  let categoryName = "General";
  if (data.category) {
    try {
      const catIds = JSON.parse(data.category);
      if (catIds.length > 0) {
        const cat = categories.find((c) => c.id === catIds[0]);
        categoryName = cat ? cat.title : "General";
      }
    } catch (e) {
      categoryName = "General";
    }
  }

  // Format date
  const formattedDate = data.created_at
    ? new Date(data.created_at).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "Updated recently";

  // Construct author image URL
  const authorImageUrl = data.auther_image
    ? `${baseUrl}/images/blogs/${data.id}/${data.auther_image}`
    : null;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 px-4 sm:px-6 lg:px-12 py-8 sm:py-12 bg-gray-50 min-h-screen mt-0 sm:mt-4">
      {/* Main Blog Content */}
      <div className="lg:col-span-8">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
          {/* Featured Image */}
          {data.featured_image && (
            <div className="relative">
              <img
                src={`${baseUrl}/media/${data.featured_image}`}
                alt={data.title}
                className="w-full h-64 sm:h-80 md:h-96 object-cover rounded-t-2xl"
                onError={(e) => {
                  console.warn(
                    "Failed to load featured image for post",
                    data.id,
                    ":",
                    e.target.src
                  );
                  e.target.style.display = "none";
                }}
              />
            </div>
          )}

          <div className="p-6 sm:p-8">
            {/* Back button */}
            <Link
              href="/blog"
              className="flex items-center text-blue-600 hover:text-blue-800 transition-colors mb-6 text-sm font-semibold"
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
              Back to Blogs
            </Link>

            {/* Meta */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
              <div className="flex items-center gap-4">
                {authorImageUrl ? (
                  <img
                    src={authorImageUrl}
                    alt={data.auther_name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-gray-100"
                    onError={(e) => {
                      console.warn(
                        "Failed to load author image for post",
                        data.id,
                        ":",
                        e.target.src
                      );
                      e.target.style.display = "none";
                      e.target.nextSibling.style.display = "flex";
                    }}
                  />
                ) : null}
                <div
                  className="rounded-full bg-gray-200 flex items-center justify-center w-12 h-12 border-2 border-gray-100"
                  style={{ display: authorImageUrl ? "none" : "flex" }}
                >
                  <span className="font-semibold text-gray-700 text-lg">
                    {data.auther_name ? data.auther_name.charAt(0) : "A"}
                  </span>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-900 font-bold text-lg">
                      {data.auther_name || "Admin"}
                    </span>
                  </div>
                  <p className="text-gray-500 text-sm">{formattedDate}</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <span className="text-gray-300">•</span>
                <span className="bg-blue-100 text-blue-700 px-4 py-1.5 rounded-full text-sm font-semibold">
                  {categoryName}
                </span>
              </div>
            </div>

            {/* Content */}
            <div
              className="text-gray-800 prose prose-lg max-w-none leading-relaxed api-content"
              dangerouslySetInnerHTML={{ __html: sanitizedContent }}
            />
          </div>

          {/* Footer note */}
          <div className="p-6 bg-blue-50 text-center text-blue-700 text-sm font-semibold">
            This blog post has been reviewed by our editorial team.
          </div>
        </div>
      </div>

      {/* Sidebar */}
      <div className="lg:col-span-4">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 sticky top-24">
          <div className="flex items-center mb-6">
            <div className="w-1 h-8 bg-blue-600 rounded-full mr-3"></div>
            <h2 className="text-xl font-bold text-gray-900">
              <span className="text-blue-600">Recent</span> Posts
            </h2>
          </div>

          <div className="space-y-4 max-h-[calc(100vh-200px)] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
            {data.recent_posts?.length > 0 ? (
              data.recent_posts.map((post, idx) => {
                // Construct relative URL
                const relativeUrl = post.seo_url
                  ? post.seo_url.replace("https://www.doonedu.com", "")
                  : "#";

                // Format post date
                const postDate = post.created_at
                  ? new Date(post.created_at).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })
                  : "Recent";

                // Get post category name
                let postCategory = "General";
                if (post.category) {
                  try {
                    const catIds = JSON.parse(post.category);
                    if (catIds.length > 0) {
                      const cat = categories.find((c) => c.id === catIds[0]);
                      postCategory = cat ? cat.title : "General";
                    }
                  } catch (e) {}
                }

                return (
                  <Link
                    key={idx}
                    href={relativeUrl}
                    className="flex gap-4 p-4 rounded-lg border border-gray-200 hover:border-blue-500 hover:shadow-lg transition-all duration-300 bg-white"
                  >
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-900 text-sm line-clamp-2 mb-2 hover:text-blue-600 transition-colors">
                        {post.title}
                      </h3>
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>{postDate}</span>
                        <span className="bg-gray-100 px-2 py-1 rounded-full">
                          {postCategory}
                        </span>
                      </div>
                    </div>
                  </Link>
                );
              })
            ) : (
              <p className="text-sm text-gray-500 text-center">
                No recent posts available
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
