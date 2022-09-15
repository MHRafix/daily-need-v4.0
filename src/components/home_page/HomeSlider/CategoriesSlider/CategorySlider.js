import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import SliderArrow from "../../../../utilities/SliderArrow";
import CategoryCard from "./CategoryCard";

export default function CategorySlider({ all_categories, all_products }) {
  // slider arrows are import from utilities
  const { SampleNextArrow, SamplePrevArrow } = SliderArrow();
  const settings = {
    dots: false,
    infinite: true,
    speed: 1500,
    slidesToShow: 8,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1199,
        settings: {
          slidesToShow: 6,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 425,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div
      className="category_slider_wrapper"
      style={{ borderBottom: "1px solid #eee" }}
    >
      <Slider {...settings}>
        {all_categories.map((category) => (
          <CategoryCard
            key={category._id}
            category_data={category}
            all_products={all_products}
          />
        ))}
      </Slider>
    </div>
  );
}
