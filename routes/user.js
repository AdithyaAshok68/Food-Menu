const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/user");
const router = express.Router();

// User Signup
router.post("/signup", async (req, res) => {
    try {
        const { email, password, name } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ email, password: hashedPassword, name });
        await newUser.save();
        res.status(201).json(newUser);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// User Login
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ error: "User not found" });
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });
        res.json({ user });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Update User by ID (Only Admin or the User Themselves)
router.put("/update/:id", async (req, res) => {
    try {
        const { name, password } = req.body;
        const user = await User.findById(req.params.id);

        if (!user) return res.status(404).json({ error: "User not found" });

        // Update fields if provided
        if (name) user.name = name;
        if (password) user.password = await bcrypt.hash(password, 10);

        await user.save();
        res.json({ message: "User details updated successfully", user });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


module.exports = router;