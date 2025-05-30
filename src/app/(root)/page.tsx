import Blogs from "@/components/HomePage/Blogs";
import Category from "@/components/HomePage/Category";
import Collections from "@/components/HomePage/Collections";
import Features from "@/components/HomePage/Features";
import { HomeHero } from "@/components/HomePage/HomeHero";
import { Promotion } from "@/components/HomePage/Promotion";
import { Review } from "@/components/HomePage/ReviewRating/Review";

const page = () => {
  return (
    <div className="block">
      <HomeHero />
      <Category />
      <Collections />
      <Features />
      <Review />
      <Blogs />
      <Promotion />
    </div>
  );
};

export default page;
