import Image from "next/image";
import { useState } from "react";
import { BsFillStarFill } from "react-icons/bs";
import { FaTruckMoving } from "react-icons/fa";
import { FiStar } from "react-icons/fi";
import { GiBeachBag } from "react-icons/gi";
import { MdOutlineShoppingCart } from "react-icons/md";
import Rating from "react-rating";
import { useDispatch, useSelector } from "react-redux";
import AlertToast from "../../utilities/alertToast/AlertToast";
import FeaturesCard from "../../utilities/FeaturesCard";
import { handleAddToCart } from "../../utilities/handleCart";
import toastConfig from "../../utilities/toastConfig";

export default function ProductView({ product }) {
  const all_reviews = useSelector((state) => state.products.all_reviews);
  // calculate average rating
  let total_rating = 0;
  all_reviews.map((review) => {
    total_rating = total_rating + review.rating;
  });
  const average_rating = total_rating / all_reviews?.length;

  const [qty, setQty] = useState(1);
  const dispatch = useDispatch();

  // toast state here
  const [toastOn, setToastOn] = useState(false);
  const [toastType, setToastType] = useState("");
  const [toastText, setToastText] = useState("");
  const { toast_config } = toastConfig(setToastOn, toastType, toastText);

  return (
    <>
      {/* message alert toast */}
      {toastOn && <AlertToast toast_config={toast_config} />}

      <div className="single_product_view">
        <div className="image_wrapper">
          <Image
            src={product?.thumbnail_big}
            alt="single_product_image"
            width="580"
            height="496"
          />
        </div>
        <div className="product_details_wrapper">
          {product?.prices?.sale_price !== 0 && (
            <div
              id="sale_badge"
              className="!text-light !w-24 !py-extra_padding2"
            >
              {Math.ceil(
                (product?.prices?.regular_price - product?.prices?.sale_price) /
                  (product?.prices?.regular_price / 100)
              )}
              % OFF
            </div>
          )}
          <h1 className="product_title">{product?.title}</h1>

          <div id="product_price">
            <span
              id={
                product?.prices?.sale_price !== 0
                  ? "regular_price"
                  : "sale_price"
              }
              className="!text-info_color !text-normal"
            >
              ৳ {product?.prices?.regular_price}
            </span>

            {product?.prices?.sale_price !== 0 && (
              <span id="sale_price" className="!text-green !text-medium">
                ৳ {product?.prices?.sale_price}
              </span>
            )}
          </div>

          {average_rating > 0 && (
            <span className="text-green text-semi_medium  my-2 block">
              <Rating
                initialRating={average_rating}
                readonly
                emptySymbol={<FiStar />}
                fullSymbol={<BsFillStarFill />}
              />
            </span>
          )}
          <h5 className="text-thin text-black3 capitalize">
            {product?.product_status}
          </h5>
          <div className="flex items-center my-7">
            {product?.stock_available > 0 && (
              <div id="add_to_cart_action">
                <button
                  id="qty_controller"
                  className="!shadow-md !bg-indigo-50"
                  onClick={() => {
                    if (qty > 1) {
                      setQty((prevQty) => prevQty - 1);
                    } else {
                      // show toast
                      setToastOn(true);
                      setToastType("warning_toast");
                      setToastText("Minimum quantity limit exceed!");
                    }
                  }}
                >
                  -
                </button>
                <span id="cart_qty">{qty}</span>
                <button
                  id="qty_controller"
                  className="!shadow-md !bg-indigo-50"
                  onClick={() => {
                    if (qty < 10) {
                      setQty((prevQty) => prevQty + 1);
                    } else {
                      // show toast
                      setToastOn(true);
                      setToastType("warning_toast");
                      setToastText("Maximum quantity limit exceed!");
                    }
                  }}
                >
                  +
                </button>
              </div>
            )}
            <div id="add_to_cart_btn">
              {product?.stock_available > 0 && (
                <button
                  id="cart_btn"
                  className="!mt-0 !py-1 !px-1.5"
                  onClick={() =>
                    handleAddToCart(
                      setToastOn,
                      setToastType,
                      setToastText,
                      product,
                      dispatch,
                      product?._id,
                      qty
                    )
                  }
                >
                  <MdOutlineShoppingCart /> &nbsp; Add to cart
                </button>
              )}
            </div>
          </div>
          <div className="desc text-black3 my-10">
            <h3 className="font-semibold text-semi_medium my-2">
              Quick Overview
            </h3>
            <p className="text-light">
              {product?.additional_info?.description.slice(0, 200)}...
            </p>
          </div>
          <div className="taxenomy text-sm text-black3">
            <span className="text-sm text-red-500">Category : </span>
            {product?.category}
          </div>
          <div className="feature_card_wrapper">
            <h3 className="text-light text-black2">
              Why shop from Daily Need?
            </h3>
            <div className="our_features2">
              <FeaturesCard
                features_name="free delivery"
                features_icon={<FaTruckMoving />}
                features_desc="Lorem ipsum dolor..."
              />

              <FeaturesCard
                features_name="100% Guarantee"
                features_icon={<GiBeachBag />}
                features_desc="Lorem ipsum dolor sit..."
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
