// lib/uploadImage.js
import cloudinary from "./cloudinary";

export const UploadImage = async (file, folder) => {
  const buffer = await file.arrayBuffer();
  const bytes = Buffer.from(buffer);

  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { resource_type: "auto", folder: folder, maxFileSize: 14229086 },
      (err, result) => {
        if (err) {
          reject(err.message);
        } else {
          resolve({ url: result.secure_url, public_id: result.public_id });
        }
      }
    );
    uploadStream.end(bytes);
  });
};
