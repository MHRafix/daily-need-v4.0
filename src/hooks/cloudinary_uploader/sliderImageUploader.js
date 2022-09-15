export default function sliderImageUploader(sliderImg) {
  // avatar uploaded to cloudinary cloud service
  const slider_upload_cloudinary = async () => {
    if (sliderImg) {
      const data = new FormData();
      data.append("file", sliderImg);
      data.append("upload_preset", "sliderimages");
      data.append("cloud_name", "CoderXone");
      const upload_req = await fetch(
        "https://api.cloudinary.com/v1_1/CoderXone/image/upload",
        {
          method: "POST",
          body: data,
        }
      );
      const slider_image_uploaded = await upload_req.json();
      return slider_image_uploaded.url;
    } else {
      return;
    }
  };

  return { slider_upload_cloudinary };
}
