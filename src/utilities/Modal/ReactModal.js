import React from "react";

export default function ReactModal({ setModal, modal_title, children }) {
  return (
    <>
      <div id="modalBackground">
        <div id="modalContainer">
          <div className="titleCloseBtn">
            <div className="text-normal tracking-wider text-black4">
              {modal_title}
            </div>

            <button
              onClick={() => setModal(false)}
              className="cross_admin_pannel_navigation"
            >
              ✖
            </button>
          </div>
          <div id="modal_body">{children}</div>
        </div>
      </div>
    </>
  );
}
