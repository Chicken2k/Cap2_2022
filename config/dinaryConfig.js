const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("cloudinary").v2;
const multer = require("multer");

cloudinary.config({
  cloud_name: "dds0kgeem",
  api_key: "681984885553636",
  api_secret: "CZT35VIfuhXQ3KCs-D9FWPpB1Z0",
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "RESTAURANT",
  },
});

const upload = multer({ storage: storage });
module.exports = { upload };
