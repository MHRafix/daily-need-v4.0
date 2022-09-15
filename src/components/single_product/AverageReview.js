import React from "react";
import { BsFillStarFill } from "react-icons/bs";
import { FiStar } from "react-icons/fi";
import Rating from "react-rating";

export default function AverageReview({ all_reviews }) {
  // calculate average rating
  let total_rating = 0;
  all_reviews.map((review) => {
    total_rating = total_rating + review.rating;
  });
  const average_rating = total_rating / all_reviews?.length;

  return (
    <>
      <div className="average_rating_wrapper">
        <div className="average_rating p-extra_padding">
          <div>
            <span className="text-black2 overflow-hidden text-medium_light my-5 font-bold">
              {average_rating}
            </span>
            <span className="text-black4 text-semi_medium font-semi_bold">
              /5
            </span>
          </div>

          <span className="text-green text-medium  my-5 block">
            <Rating
              initialRating={average_rating}
              readonly
              emptySymbol={<FiStar />}
              fullSymbol={<BsFillStarFill />}
            />
          </span>

          <p>{all_reviews.length} Reviews</p>
        </div>
      </div>
    </>
  );
}
