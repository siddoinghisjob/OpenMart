const cloudinary = require("cloudinary").v2;
const pool = require("../model/pool");

cloudinary.config({
  cloud_name: process.env.OPENMART_CLOUD_NAME,
  api_key: process.env.OPENMART_API_KEY,
  api_secret: process.env.OPENMART_API_SECRET,
});

//files, aid

const handleFileUpload = async (files, aid) => {
  try {
    const uploadPromises = files.map(async (file) => {
      const result = await cloudinary.uploader.upload(
        `data:image/jpeg;base64,${file.buffer.toString("base64")}`
      );

      const imageUrl = result.secure_url;
      const query = await pool.query(
        "insert into images (aid,url) values ($1,$2)",
        [aid, imageUrl]
      );
    });

    const uploadedUrls = await Promise.all(uploadPromises);
    return { messsage: "Successfully uploaded images", code: 0 };
  } catch (error) {
    return new Error({ messsage: "Failed to upload images", code: 1 });
  }
};
module.exports = handleFileUpload;
