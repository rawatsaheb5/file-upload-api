const express = require("express");
const app = express();
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const fileRoute = require("./route/file");
const errorHandler = require("./helper/error");
dotenv.config();

connectDB();

const PORT = process.env.PORT || 8000; 

app.use(express.json());
app.use("/uploads", express.static("uploads"));

app.use("/api", fileRoute);
app.use(errorHandler);



app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
