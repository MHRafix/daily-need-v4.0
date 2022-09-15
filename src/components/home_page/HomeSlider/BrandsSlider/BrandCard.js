import Image from "next/image";
import React from "react";

export default function BrandCard({ brand_data }) {
  const { brand_image } = brand_data;

  return (
    <div className="brand_card_wrapper">
      <div className="brand_image">
        <Image
          className="catImg"
          src={brand_image}
          alt="category_image"
          width={80}
          height={80}
        />
      </div>
    </div>
  );
}
