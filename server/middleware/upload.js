// import multer from 'multer';
// import path from 'path';
// import fs from 'fs';

// // 📁 Ensure uploads directory exists
// const uploadDir = 'server/uploads/';
// if (!fs.existsSync(uploadDir)) {
//   fs.mkdirSync(uploadDir, { recursive: true });
// }

// // 📦 Storage engine
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, uploadDir);
//   },
//   filename: (req, file, cb) => {
//     const uniqueName =
//       Date.now() + '-' + Math.round(Math.random() * 1e9) + path.extname(file.originalname);
//     cb(null, uniqueName);
//   },
// });

// // 📂 File filter for images and PDFs
// const fileFilter = (req, file, cb) => {
//   const imageTypes = /jpeg|jpg|png|webp/;
//   const pdfType = /pdf/;
//   const ext = path.extname(file.originalname).toLowerCase();
//   const mime = file.mimetype;

//   if (
//     (imageTypes.test(ext) && imageTypes.test(mime)) ||
//     (pdfType.test(ext) && mime === 'application/pdf')
//   ) {
//     cb(null, true);
//   } else {
//     cb(new Error('Only image and PDF files are allowed'));
//   }
// };

// // ✅ Multiple fields support (image + brochure)
// const upload = multer({
//   storage,
//   fileFilter,
//   limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
// });

// export default upload;


//cloudnarryyyy walaaa


import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    if (file.mimetype === "application/pdf") {
      return {
        folder: "products/brochures",
        resource_type: "auto",
      };
    }

    return {
      folder: "products/images",
      allowed_formats: ["jpg", "png", "jpeg", "webp"],
    };
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
});

export default upload;
