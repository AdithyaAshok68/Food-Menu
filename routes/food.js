const express = require("express");
const Food = require("../models/food");
const Category = require("../models/category");
const router = express.Router();

// Get all food items
router.get("/", async (req, res) => {
    const foods = await Food.find().populate("category");
    res.json(foods);
});

// Add a new category (admin only)
router.post("/category", async (req, res) => {
    try {
        const { name, parent } = req.body;
        const category = new Category({ name, parent });
        await category.save();
        res.status(201).json(category);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post("/food", async (req, res) => {
    try {
        const { name, category, price, description } = req.body;
        const food = new Food({ name, category, price, description }); // Create new food item
        await food.save(); // Save in DB
        res.status(201).json(food);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


module.exports = router;