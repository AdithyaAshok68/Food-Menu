const express = require("express");
const cors = require("cors");
var mongoose = require("mongoose");
const app = express();
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(cors());

const mongoUrl = process.env.MONGODB_URI;
const port = process.env.PORT;


// Middleware to disable caching
app.use((req, res, next) => {
  res.set(
    "Cache-Control",
    "no-store, no-cache, must-revalidate, proxy-revalidate"
  );
  res.set("Pragma", "no-cache");
  res.set("Expires", "0");
  next();
});

const admin = require("./routes/admin"); 
const food = require("./routes/food"); 
const user = require("./routes/user"); 

app.use("/api/admin", admin); 
app.use("/api/menu", food); 
app.use("/api/user", user); 

mongoose.set("strictQuery", false);
mongoose
  .connect(mongoUrl)
  .then(() => {
    console.log("Connected to mongoDb!");
    app.listen(port, () => {
      console.log(`node api app is running on port ${port}`);
    });
  })
  .catch((error) => {
    console.log("Error connecting to MongoDB:", console.log(error));
  });
