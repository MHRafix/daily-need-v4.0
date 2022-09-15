export default function AlertToast({ toast_config }) {
  const { toastStyle, alertText, toastIcon, handleRemoveToast } = toast_config;
  return (
    <>
      <div className={toastStyle}>
        <h3 className="flex items-center">
          <span style={{ fontSize: "22px" }}>{toastIcon}</span> &nbsp;{" "}
          {alertText}
        </h3>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <button onClick={handleRemoveToast}>✖</button>
      </div>
    </>
  );
}
