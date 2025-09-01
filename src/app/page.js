import Image from "next/image";
import Navbar from "./components/Navbar";
import SubNav from "./components/subnav";
import HeroSection from "./components/Herosection";
import SchoolCarousel from "./components/SchoolCarousel";
import SchoolSuggestionCard from "./components/SchoolSuggestionCard";
import Stepsapply from "./components/Stepsapply";
import Didyouknow from "./components/Didyouknow";
import Recommenationbanner from "./components/recommendationbanner";
import HomepageCategories from "./components/Homepagecategories";
import Testimonials from "./components/Testimonials";

export default function Home() {
  return (
    <>
      <HeroSection />
      <SchoolCarousel />
      <SchoolSuggestionCard />
      <Stepsapply />
      <Didyouknow />
      <Recommenationbanner />
      <HomepageCategories />
      <Testimonials />
    </>
  );
}
