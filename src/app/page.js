import Image from "next/image";

import HeroSection from "./components/Herosection";
import SchoolCarousel from "./components/SchoolCarousel";
import SchoolSuggestionCard from "./components/SchoolSuggestionCard";
import Stepsapply from "./components/Stepsapply";
import Didyouknow from "./components/Didyouknow";
import Recommenationbanner from "./components/Recommendationbanner";
import HomepageCategories from "./components/Homepagecategories";
import Testimonials from "./components/Testimonials";
import NewsSection from "./components/NewsSection";
import ContactCallAction from "./components/ContactCallAction";

export default function Home() {
  return (
    <>
      <HeroSection />
      <SchoolCarousel />
      <SchoolSuggestionCard />
      <Stepsapply />
      <Didyouknow />
      <NewsSection/>
      <Recommenationbanner />
      <HomepageCategories />
      <ContactCallAction/>
      <Testimonials />
    </>
  );
}
