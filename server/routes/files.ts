import express from "express";
import multer from "multer";
import { UploadApiResponse, v2 as cloudinary } from "cloudinary";
import File from "../models/File";

const router = express.Router();

const storage = multer.diskStorage({});

let upload = multer({
  storage,
});

export default router.post(
  "/upload",
  upload.single("myFile"),
  async (req, res) => {
    try {
      if (!req.file)
        return res.status(400).json({
          message: "Please, provide a file to be uploaded!",
        });
      console.log(req.file);
      let uploadedFile: UploadApiResponse;
      try {
        uploadedFile = await cloudinary.uploader.upload(req.file.path, {
          folder: "Easyshare",
          resource_type: "auto",
        });
      } catch (error) {
        console.log(error);
        return res.status(400).json({
          message: "Cloudinary Error",
        });
      }
      console.log("uploadedFile", uploadedFile);
      const { originalname } = req.file;
      const { secure_url, bytes, format } = uploadedFile;

      const file = await File.create({
        filename: originalname,
        sizeInBytes: bytes,
        secure_url,
        format,
      });
      res.status(200).json({
        message: "Successfully uploaded!",
        id: file._id,
        downloadPageLink: `${process.env.API_BASE_ENDPOINT_CLIENT}/download/${file._id}`,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Server Error :(" });
    }
  }
);
