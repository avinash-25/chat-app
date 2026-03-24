export const uploadImage = async (dataUrl) => {
  if (!dataUrl) return null;
  let result = await v2.uploader.upload(dataUrl, {
    folder: "ProfilePic",
    resource_type: "image",
    // transformation: { width: 360, height: 360, crop: "limit" },
  });
  return result;
};

export const deleteImage = async (id) => {
  console.log("delete called");
  let result = await v2.uploader.destroy(id);
  console.log("result: ", result);
  return result;
};
