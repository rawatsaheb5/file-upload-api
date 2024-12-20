const File = require("../model/file");
const path = require("path");
const fs = require("fs");

const uploadFile = async (req, res) => {
    try {
      
    if (!req.file) {
      return res.status(400).json({ message: "File is required!" });
    }
    const file = req.file;

    const fileInformation = new File({
      originalName: file.originalname,
      fileName: file.filename,
      fileType: file.mimetype,
      fileSize: Number(file.size),
    });

    await fileInformation.save();

    res.status(201).json({
      message: "File uploaded successfully!",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
};

const handleDeleteSingleFile = async (req, res) => {
  try {
    const { fileId } = req.params;
    const fileRecord = await File.findById(fileId);
    if (!fileRecord) {
      return res.status(404).json({ message: "File not found!" });
    }

    const filePath = path.join(__dirname, "../uploads", fileRecord.fileName);

    fs.unlink(filePath, async (err) => {
      if (err) {
        return res
          .status(500)
          .json({ message: "Error deleting file from server.", error: err });
      }

      await File.findByIdAndDelete(fileId);

      res.status(200).json({ message: "File deleted successfully!" });
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
};

const handleFileDownload = async (req, res) => {
  try {
    const fileId = req.params.fileId;

    const fileInfo = await File.findById(fileId);
    if (!fileInfo) {
      return res.status(404).json({
        message: "File not found!",
      });
    }

    const filePath = path.join(__dirname, "../uploads", fileInfo.fileName);

    if (!fs.existsSync(filePath)) {
      return res.status(404).json({
        message: "File is missing on the server!",
      });
    }

    res.setHeader(
      "Content-Disposition",
      `attachment; filename="${fileInfo.originalName}"`
    );
    res.sendFile(filePath);
  } catch (error) {
    console.error("Error in file download:", error);
    return res.status(500).json({ error: error.message });
  }
};

const fetchAllFiles = async (req, res) => {
  try {
    const allFiles = await File.find({});
    res.status(200).json({
      message: "files fetched successfully!",
      allFiles,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  uploadFile,
  handleDeleteSingleFile,
  handleFileDownload,
  fetchAllFiles,
};
