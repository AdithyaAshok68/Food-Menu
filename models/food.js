const mongoose = require("mongoose");
const FoodSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true },
  price: { type: Number, required: true },
  description: { type: String },
}, { timestamps: true });
module.exports = mongoose.model("Food", FoodSchema);