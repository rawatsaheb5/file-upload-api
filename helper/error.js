const errorHandler = (err, req, res, next) => {
  if (err.code === "LIMIT_FILE_SIZE") {
    return res.status(400).json({ message: "File size is too large!" });
  }

  if (err.name === "ValidationError") {
    return res
      .status(422)
      .json({ message: "Validation error: " + err.message });
  }

  if (err.name === "MongoError") {
    return res.status(500).json({ message: "Database error" });
  }

  return res.status(500).json({ message: "Something went wrong!" });
};

module.exports = errorHandler;
