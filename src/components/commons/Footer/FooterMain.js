import Image from "next/image";
import Link from "next/link";
import { BsTelephone } from "react-icons/bs";
import { FaMobileAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { SiTorbrowser } from "react-icons/si";
import AppStore from "../../../images/logo/apple.webp";
import PlayStore from "../../../images/logo/google.webp";
import Logo from "../../../images/logo/logo_black.webp";
import FooterBlock from "../../../utilities/FooterBlock";

export default function FooterMain() {
  // cities array here
  const cities_array = [
    { _id: "1", item_name: "New Delhi" },
    { _id: "2", item_name: "Bengaluru" },
    { _id: "3", item_name: "Hyderabad" },
    { _id: "4", item_name: "Kolkata" },
    { _id: "5", item_name: "Gurugram" },
  ];

  // categories array here
  const categories_array = [
    { _id: "1", item_name: "Vegetables" },
    { _id: "2", item_name: "Grocery & Staples" },
    { _id: "3", item_name: "Breakfast & Dairy" },
    { _id: "4", item_name: "Soft Drinks" },
    { _id: "5", item_name: "Biscuits & Cookies" },
  ];

  // aboutus array here
  const aboutus_array = [
    { _id: "1", item_name: "Company Information" },
    { _id: "2", item_name: "Careers" },
    { _id: "3", item_name: "Store Location" },
    { _id: "4", item_name: "Affillate Program" },
    { _id: "5", item_name: "Copyright" },
  ];

  return (
    <>
      <div className="footer_main">
        <div className="container_wrapper">
          <div className="footer_main_grid_layout">
            {/* brand block here */}
            <div className="block_wrapper">
              <div className="block_header">
                <Image src={Logo} alt="brnad_logo" />
              </div>

              <div className="block_body">
                <div className="block_content">
                  <span>
                    <BsTelephone />
                  </span>
                  &nbsp; &nbsp;
                  <span className="tracking-wider">+880 1611859722</span>
                </div>
                <div className="block_content">
                  <span>
                    <FaMobileAlt />
                  </span>
                  &nbsp; &nbsp;
                  <span className="tracking-wider">12345 6780, 5684 98562</span>
                </div>
                <div className="block_content">
                  <span className="text-green">
                    <MdEmail />
                  </span>
                  &nbsp; &nbsp;
                  <Link href="https://mail.google.com" passHref>
                    <a target="_blank">
                      <span className="text-green tracking-wider">
                        rafiz.mehedi@gmail.com
                      </span>
                    </a>
                  </Link>
                </div>
                <div className="block_content">
                  <span className="text-light_blue">
                    <SiTorbrowser />
                  </span>
                  &nbsp; &nbsp;
                  <Link href="https://rafix.netlify.app/" passHref>
                    <a target="_blank">
                      <span className="tracking-wider text-light_blue">
                        https://rafix.netlify.app
                      </span>
                    </a>
                  </Link>
                </div>
              </div>
            </div>

            {/* cities block here */}
            <FooterBlock block_header="top cities" item_array={cities_array} />

            {/* categories block here */}
            <FooterBlock
              block_header="categories"
              item_array={categories_array}
            />

            {/* about us block here */}
            <FooterBlock block_header="about us" item_array={aboutus_array} />

            {/* last block here */}
            {/* brand block here */}
            <div className="block_wrapper">
              <div className="block_header">
                <h3 className="block_header_line">downloads app</h3>
              </div>

              <div className="block_body">
                <div className="block_content">
                  <div className="store_images">
                    <Image src={PlayStore} alt="play store logo" />
                    &nbsp; &nbsp; &nbsp;
                    <Image src={AppStore} alt="app store logo" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
