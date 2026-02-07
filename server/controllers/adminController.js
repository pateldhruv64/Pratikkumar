// server/controllers/adminController.js
import Admin from "../models/adminModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import fs from "fs";
import path from "path";

// ✅ POST: Register Admin
export const registerAdmin = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    

    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ message: "Admin already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newAdmin = new Admin({
      name: username,
      email,
      password: hashedPassword,
    });

    await newAdmin.save();
    res.status(201).json({ message: "Admin registered successfully" });
  } catch (error) {
    console.error("❌ Error in registerAdmin:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ POST: Login Admin
export const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.status(200).json({ token, admin: { id: admin._id, name: admin.name } });
  } catch (error) {
    console.error("❌ Error in loginAdmin:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ GET: Admin Dashboard Info (Protected Route)
export const getDashboardData = async (req, res) => {
  try {
    const admin = req.admin;

    res.status(200).json({
      message: "Dashboard data loaded",
      adminName: admin.name,
      email: admin.email,
      lastLogin: admin.updatedAt || null,
    });
  } catch (error) {
    console.error("❌ Error in getDashboardData:", error);
    res.status(500).json({ message: "Failed to load dashboard" });
  }
};

// ✅ POST: Upload Catalog PDF (Protected Route)
// ✅ POST: Upload Catalog PDF (Protected Route)
export const uploadCatalogPdf = async (req, res) => {
  try {
    
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const fs = await import('fs');
    const path = await import('path');
    const uploadsDir = path.join(process.cwd(), "public", "assets");

    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }

    const destPath = path.join(uploadsDir, "catalog.pdf");

    fs.rename(req.file.path, destPath, (err) => {
      if (err) {
        console.error("❌ Error moving catalog:", err);
        return res.status(500).json({ message: "Failed to save catalog" });
      }
      res.status(200).json({ message: "✅ Catalog uploaded successfully" });
    });
  } catch (error) {
    console.error("❌ Error in uploadCatalogPdf:", error);
    res.status(500).json({ message: "Server error" });
  }
};
