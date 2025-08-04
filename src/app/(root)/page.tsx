import Blogs from "@/components/home-page/blogs";
import Category from "@/components/home-page/category";
import Collections from "@/components/home-page/collections";
import CustomerSupportForm from "@/components/home-page/customer-support-form";
import Features from "@/components/home-page/features";
import { HomeHero } from "@/components/home-page/home-hero";
import { Review } from "@/components/home-page/review-rating/review";

const page = () => {
  return (
    <div className="block">
      <HomeHero />
      <Category />
      <Collections />
      <Features />
      <Review />
      <CustomerSupportForm />
      <Blogs />
    </div>
  );
};

export default page;
