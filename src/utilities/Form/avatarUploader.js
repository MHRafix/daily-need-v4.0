export default function avatarUploader(userpic) {
  // avatar uploaded to cloudinary cloud service
  const avatar_upload_cloudinary = async () => {
    if (userpic) {
      const data = new FormData();
      data.append("file", userpic);
      data.append("upload_preset", "userimages");
      data.append("cloud_name", "CoderXone");
      const upload_req = await fetch(
        "https://api.cloudinary.com/v1_1/CoderXone/image/upload",
        {
          method: "POST",
          body: data,
        }
      );
      const avatar_uploaded = await upload_req.json();
      return avatar_uploaded.url;
    } else {
      return;
    }
  };

  return { avatar_upload_cloudinary };
}
