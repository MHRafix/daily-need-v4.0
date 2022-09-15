export default function imageUploader(image1, image2) {
  // avatar uploaded to cloudinary cloud service
  const image_upload_cloudinary = async () => {
    if (image1 && image2) {
      // small thumbnail uploda here
      const data1 = new FormData();
      data1.append("file", image1);
      data1.append("upload_preset", "gridproducts");
      data1.append("cloud_name", "CoderXone");
      const upload_req1 = await fetch(
        "https://api.cloudinary.com/v1_1/CoderXone/image/upload",
        {
          method: "POST",
          body: data1,
        }
      );
      const image1_uploaded = await upload_req1.json();

      // big thumbnail upload here
      const data2 = new FormData();
      data2.append("file", image2);
      data2.append("upload_preset", "singleproducts");
      data2.append("cloud_name", "CoderXone");
      const upload_req2 = await fetch(
        "https://api.cloudinary.com/v1_1/CoderXone/image/upload",
        {
          method: "POST",
          body: data2,
        }
      );

      const image2_uploaded = await upload_req2.json();
      return {
        small_thumbnail: image1_uploaded.url,
        big_thumbnail: image2_uploaded.url,
      };
    } else {
      return;
    }
  };

  return { image_upload_cloudinary };
}
