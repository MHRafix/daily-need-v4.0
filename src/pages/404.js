import Head from "next/head";
import Image from "next/image";
import Router from "next/router";
import React from "react";
import ErrorImage from "../images/error/404.png";

export default function ErrorPage() {
  return (
    <>
      <div className="page_main_wrapper">
        <Head>
          <title>Daily Needs - 404 Page Not Found</title>
          <meta
            name="description"
            content="Daily needs 404 page not found here"
          />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        {/* error body is here */}
        <main>
          <div className="container_wrapper">
            <div className="error_page_content flex justify-center !items-center h-screen">
              <div>
                <div className="error_image">
                  <Image src={ErrorImage} alt="error image 404" />
                </div>
                <div className="error_oops_content">
                  <h1 className="my-5 sm:!text-medium xs:text-semi_medium font-semibold text-black1 text-center tracking-wider ">
                    Sorry! Page not found.
                  </h1>

                  <p className="text-black3 text-light tracking-wider md:!text-left xs:text-center">
                    Unfortunately the page you are looking for has been moved or
                    deleted.
                  </p>
                  <br />
                  <button
                    className="location_pushBtn"
                    onClick={() => Router.back()}
                  >
                    Go Back{" "}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
