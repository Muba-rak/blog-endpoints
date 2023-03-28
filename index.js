require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;
const mongoose = require("mongoose");
const authRouter = require("./routes/authRouter");
const auth = require("./middleware/authentication");
const blogRouter = require("./routes/blogRouter");
const notFound = require("./utils/notfound");
//middleware
app.use(express.json());

//routes
app.use("/api/v1", authRouter);
// app.get("/test", auth, (req, res) => {
//   res.send("passed authentication");
// });
app.use("/api/v1/blog", auth, blogRouter);

//error route
app.use(notFound);

const start = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    app.listen(PORT, () => {
      console.log(`server running on port ${PORT}..`);
    });
  } catch (error) {
    console.log(error);
  }
};
start();
