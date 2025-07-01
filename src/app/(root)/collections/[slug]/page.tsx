"use client";
import { ProductFeatures } from "@/components/details/product-features";
import { ProductImages } from "@/components/details/product-images";
import { ProductInfo } from "@/components/details/product-info";
import { ProductName } from "@/components/details/product-name";
import { ProductTabs } from "@/components/details/product-tab";
// import RevelentProduct from "@/components/details/revelent-products";
import ReviewProduct from "@/components/details/review-products";
import { useWatchQuery } from "@/queries";
import React from "react";

const DetailsPage = ({ params }: { params: { slug: string } }) => {
  const { data } = useWatchQuery(params.slug);
  return (
    <div className="container mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 my-8">
        <ProductImages images={data?.images || []} name={data?.name || ""} />
        <div className="flex flex-col h-full">
          <ProductName name={data?.name || ""} />
          <div className="flex-grow">
            <ProductTabs
              description={data?.description}
              brand={data?.brand}
              movement={data?.movement}
              material={data?.material}
              bandMaterial={data?.bandMaterial}
              diameter={data?.diameter}
              gender={data?.gender}
              warranty={data?.warranty}
              waterResistance={data?.waterResistance}
            />
          </div>
          <ProductInfo price={data?.price ?? 0} />
        </div>
      </div>
      <div>
        <ProductFeatures watch={data} />
        {/* <RevelentProduct /> */}
        <ReviewProduct slug={data?.slug || ""} />
      </div>
    </div>
  );
};

export default DetailsPage;
