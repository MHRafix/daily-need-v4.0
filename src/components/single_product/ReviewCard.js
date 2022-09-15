import Image from "next/image";
import React, { useState } from "react";
import { BsFillStarFill } from "react-icons/bs";
import { FiStar } from "react-icons/fi";
import { MdVerifiedUser } from "react-icons/md";
import Rating from "react-rating";
import { month_name } from "../../fake_data/all_fakedata";

export default function ReviewCard({ review_data }) {
  const [expand, setExpand] = useState(false);
  const {
    customer_name,
    customer_pic,
    rating,
    review,
    product_pic,
    review_date,
  } = review_data;
  return (
    <>
      <div className="review_card_wrapper border-b-1 border-b-slate-100 py-1.5">
        <div className="review_card_header flex justify-between">
          <div className="flex mb-3">
            <div className="customer_image mx-2">
              {customer_pic && (
                <Image
                  src={customer_pic}
                  alt="pic"
                  width={40}
                  height={40}
                  className="rounded-full"
                />
              )}
            </div>
            <div className="customer_info mx-3">
              <h3 className="customer_name flex">
                by {customer_name}
                <span className="text-green text-semi_medium mx-1">
                  <MdVerifiedUser />
                </span>
              </h3>
              <span className="text-green text-light  my-2 block">
                <Rating
                  initialRating={rating}
                  readonly
                  emptySymbol={<FiStar />}
                  fullSymbol={<BsFillStarFill />}
                />
              </span>
            </div>
          </div>
          <div>
            {review_date.current_date} {month_name[review_date?.current_month]}{" "}
            {review_date?.current_year}
          </div>
        </div>
        <div className="review_card_header">
          {!expand && (
            <>
              <p className="text-sm inline">
                {review.slice(0, 1).toUpperCase()}
                {review.slice(1, 120)}
              </p>

              {review.length > 120 && (
                <button
                  className="text-orangee tracking-wider mx-2 cursor-pointer hover:text-black hover:duration-300"
                  onClick={() => setExpand(true)}
                >
                  ...Seemore
                </button>
              )}
              <br />
              {product_pic && (
                <Image
                  src={product_pic}
                  alt="product_pic"
                  width={100}
                  height={100}
                />
              )}
            </>
          )}
          {expand && (
            <>
              <p className="text-sm inline">
                {review.slice(0, 1).toUpperCase()}
                {review.slice(1)}
              </p>

              <button
                className="text-orangee tracking-wider mx-2 cursor-pointer hover:text-black hover:duration-300"
                onClick={() => setExpand(false)}
              >
                Seeless
              </button>
              <br />
              {product_pic && (
                <Image
                  src={product_pic}
                  alt="product_pic"
                  width={100}
                  height={100}
                />
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
}
