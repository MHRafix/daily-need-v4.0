import Image from "next/image";
import Link from "next/link";
import PaymentBanner from "../../../images/card_images/payment_methods.webp";

export default function FooterCopyrightArea() {
  return (
    <>
      <div className="copyright_area">
        <div className="container_wrapper">
          <div className="copyright_wrapper">
            <div className="text-sm tracking-wider mb-10 md:mb-0">
              Copyright 2022. &nbsp;
              <Link href="https://rafix.netlify.app/" passHref>
                <a target="_blank" className="text-green font-semibold">
                  Mehedi Hasan Rafiz
                </a>
              </Link>
              &nbsp; All rights reserved
            </div>
            <div className="payment_method">
              <Image src={PaymentBanner} alt="payment method" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
