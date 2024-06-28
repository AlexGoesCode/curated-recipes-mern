import { v2 as cloudinary } from 'cloudinary';

export const imageUpload = async (file, folder) => {
  try {
    const result = await cloudinary.uploader.upload(file.path, {
      folder: folder,
    });
    console.log(result);
    //we return just the secure_url property. In case of needing more properties, we can return the whole result object.
    return result.secure_url;
  } catch (e) {
    console.log(e);
  }
};
