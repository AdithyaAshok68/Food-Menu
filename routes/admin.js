const express = require("express");
const User = require("../models/user");
const router = express.Router();

// Get all users (admin only)
router.get("/", async (req, res) => {
    const users = await User.find();
    res.json(users);
});

// Change user role to admin
router.put("/:id/make-admin", async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ error: "User not found" });
        user.role = "admin";
        await user.save();
        res.json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;