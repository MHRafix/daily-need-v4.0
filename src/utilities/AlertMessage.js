import { useRouter } from "next/router";
import { BiError } from "react-icons/bi";
import { CgLogIn } from "react-icons/cg";
import { IoMdArrowRoundBack } from "react-icons/io";
import { MdCloudDone } from "react-icons/md";
import Breadcrumb from "../components/commons/Breadcrumb/Breadcrumb";

export const ErrorMessage = ({ message }) => {
  return (
    <div className="text-red-500 text-big_ultra !font-bold text-left tracking-wider">
      <h1 style={{ fontWeight: "700", fontSize: "20px" }}>{message}</h1>
    </div>
  );
};

export const MyProfileErrMssg = ({ message, bread_string }) => {
  const history = useRouter();

  return (
    <>
      <Breadcrumb bread_nav={bread_string} />
      <ErrorMessage message={message} />
      <div className="flex items-center" style={{ marginTop: "10px" }}>
        <span>
          <button
            onClick={() => history.push("/")}
            id="cart_btn"
            className="!rounded-sm !text-light"
            style={{ textTransform: "capitalize" }}
          >
            <IoMdArrowRoundBack className="!text-normal" /> &nbsp; go home
          </button>
        </span>
        &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
        <span>
          <button
            onClick={() => history.push("/my_account/my_acc")}
            id="cart_btn"
            className="!rounded-sm !text-light"
            style={{ textTransform: "capitalize" }}
          >
            login now &nbsp; <CgLogIn className="!text-normal" />
          </button>
        </span>
      </div>
    </>
  );
};

export const ErrorAlert = ({ message }) => {
  return (
    <div style={{ padding: "10px" }} id="alertIdError">
      <h1 className="flex items-center">
        <BiError /> &nbsp; {message}
      </h1>
    </div>
  );
};

export const SuccessMessage = ({ message }) => {
  return (
    <div style={{ padding: "10px", background: "green" }} id="alertIdSuccess">
      <h1 className="flex items-center">
        <MdCloudDone /> &nbsp; {message}
      </h1>
    </div>
  );
};
