const express = require("express");
const upload = require("../config/multer");
const {
  uploadFile,
  handleDeleteSingleFile,
  handleFileDownload,
  fetchAllFiles,
} = require("../controller/file");
const handleError = require("../helper/error");
const router = express.Router();

router.post("/file-upload", upload.single("file"), uploadFile);
router.delete("/:fileId", handleDeleteSingleFile);
router.get("/download/:fileId", handleFileDownload);
router.get("/all", fetchAllFiles);

module.exports = router;
