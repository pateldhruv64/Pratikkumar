import multer from "multer";
import path from "path";
import fs from "fs";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";

// 📁 Ensure uploads directory exists (Absolute path)
const uploadDir = path.join(process.cwd(), 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// 📦 Storage engine for local files (Old way - still here as fallback)
const localDiskStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + '-' + path.extname(file.originalname);
    cb(null, uniqueName);
  },
});

export const localUpload = multer({
  storage: localDiskStorage,
  limits: { fileSize: 10 * 1024 * 1024 },
});

// ☁️ Cloudinary Storage for Catalog (PDFs as raw)
export const catalogStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "catalog",
    resource_type: "raw", // Crucial for non-image files like PDF
    format: "pdf",
  },
});

export const catalogUpload = multer({ storage: catalogStorage });

// ☁️ Cloudinary Storage for Products (Images + Brochures)
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    if (file.mimetype === "application/pdf") {
      return {
        folder: "products/brochures",
        resource_type: "image", // Some use 'image' for PDFs if they want thumbnailing, but 'raw' is safer for general downloads. Sticking to existing pattern.
        format: "pdf",
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
