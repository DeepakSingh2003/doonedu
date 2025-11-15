import Location from "../components/Loacation";
import School from "../components/School";
import BlogList from "../components/BlogList";
import BlogCategory from "../components/BlogCategory";
import BlogView from "../components/BlogView";

export const dynamic = "force-dynamic";

async function fetchPageData(slugArray) {
  const apiUrl = `${process.env.NEXT_PUBLIC_MAIN_API_URL_SLUG}/${slugArray.join(
    "/"
  )}?api_call=true`;

  const res = await fetch(apiUrl, { cache: "no-store" });

  if (!res.ok) return null;

  return res.json();
}

// Generate metadata from API
export async function generateMetadata(props) {
  const params = await props.params;
  const slugArray = Array.isArray(params.slug) ? params.slug : [params.slug];

  try {
    const data = await fetchPageData(slugArray);

    if (!data) {
      return {
        title: "Not Found",
        description: "The page you are looking for does not exist.",
      };
    }

    const seoHtml = data?.response?.data?.seo_html;

    if (!seoHtml) {
      // Fallback metadata based on page type
      const pageType = data?.response?.page_type;
      let fallbackTitle = "Boarding Schools";
      let fallbackDescription = "Find the best boarding schools for your child";

      if (pageType === "location") {
        const locationName = slugArray[0]
          ? slugArray[0].replace(/-/g, " ")
          : "";
        fallbackTitle = `Boarding Schools in ${locationName}`;
        fallbackDescription = `Explore boarding schools in ${locationName}. Compare fees, facilities, and admission information.`;
      } else if (pageType === "school_view") {
        fallbackTitle =
          data?.response?.school?.school_title || "School Details";
        fallbackDescription = `Information about ${fallbackTitle}`;
      }

      return {
        title: fallbackTitle,
        description: fallbackDescription,
      };
    }

    // Parse SEO HTML to extract title and meta description
    const titleMatch = seoHtml.match(/<title>(.*?)<\/title>/);
    const descriptionMatch = seoHtml.match(
      /<meta name="description" content="(.*?)"/
    );

    const title = titleMatch ? titleMatch[1] : "Boarding Schools";
    const description = descriptionMatch
      ? descriptionMatch[1]
      : "Find the best boarding schools for your child";

    return {
      title: title,
      description: description,
      // You can add more meta tags here if needed
      openGraph: {
        title: title,
        description: description,
        type: "website",
      },
      twitter: {
        card: "summary",
        title: title,
        description: description,
      },
    };
  } catch (error) {
    console.error("Error generating metadata:", error);
    return {
      title: "Boarding Schools",
      description: "Find the best boarding schools for your child",
    };
  }
}

export default async function Page(props) {
  const params = await props.params;
  const slugArray = Array.isArray(params.slug) ? params.slug : [params.slug];

  const data = await fetchPageData(slugArray);

  if (!data) return <p>No data found.</p>;

  const pageType = data?.response?.page_type;

  if (slugArray.length === 1 && pageType === "location") {
    return <Location locationData={data} />;
  }

  if (slugArray.length === 2 && pageType === "school_view") {
    return <School school={data.response.school} seo={data.response.data} />;
  }

  if (slugArray[0] === "blog" && pageType === "blog_list") {
    return <BlogList blogs={data} />;
  }

  if (slugArray[0] === "blog" && pageType === "blog_category") {
    return <BlogCategory categoryData={data} />;
  }

  if (slugArray[0] === "blog" && pageType === "blog_view") {
    return <BlogView blogData={data} />;
  }

  return <p>Invalid page</p>;
}
