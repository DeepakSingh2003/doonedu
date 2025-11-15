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

export default async function Page(props) {
  // ⭐ REQUIRED FIX – await params for Next.js 15+
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
