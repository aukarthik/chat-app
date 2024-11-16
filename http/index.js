const express = require("express");
const cors = require("cors");

const RootRouter = require("./routes/index.js");
const { connectDB } = require("../db/connect");

const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../.env") });
const app = express();

app.use(cors());
app.use(express.json());

app.use("/", RootRouter);

app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Internal Server Error";
  return res.status(status).json({
    status,
    message,
  });
});
app.listen(process.env.PORT || 4000, async () => {
  await connectDB();
  console.log(process.env.PORT);
  console.log(`Server is running on port ${process.env.PORT}`);
});
