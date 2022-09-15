import { FaRecycle, FaTruckMoving } from "react-icons/fa";
import { GiBeachBag } from "react-icons/gi";
import { ImPriceTags } from "react-icons/im";
import FeaturesCard from "../../../utilities/FeaturesCard";

export default function FooterFeaturesCard() {
  return (
    <>
      <div className="border-b-1 border-b-slate-300">
        <div className="container_wrapper">
          <div className="our_features  py-4 grid sm:grid-cols-2 md:!grid-cols-3 lg:!grid-cols-4 sm:gap-x-44 md:gap-x-16 lg:gap-x-10 gap-y-10">
            <FeaturesCard
              features_name="Free & Next Day Delivery"
              features_icon={<FaTruckMoving />}
              features_desc="Lorem ipsum dolor sit ..."
            />

            <FeaturesCard
              features_name="100% satisfaction"
              features_icon={<GiBeachBag />}
              features_desc="Lorem ipsum dolor sit ..."
            />

            <FeaturesCard
              features_name="7 days replacement"
              features_icon={<FaRecycle />}
              features_desc="Lorem ipsum dolor sit ..."
            />

            <FeaturesCard
              features_name="great discount"
              features_icon={<ImPriceTags />}
              features_desc="Lorem ipsum dolor sit ..."
            />
          </div>
        </div>
      </div>
    </>
  );
}
