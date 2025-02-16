require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const User = require("./models/User"); // Import User model
const datageneration = require("./datageneration"); // Import function properly

const app = express();
const port = 3000;

// Middleware - Order is important!
app.use(express.json()); // This needs to come before routes
app.use(cors());

// MongoDB Connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.post("/api/signup", async (req, res) => {
  try {
    console.log("Received signup request for username:", req.body.username);
    if (!req.body) {
      return res.status(400).json({ error: "Request body is missing" });
    }
    const { username, password } = req.body;
    // Validate input
    if (!username || !password) {
      return res.status(400).json({
        error: "Missing required fields",
        details: {
          username: !username ? "Username is required" : undefined,
          password: !password ? "Password is required" : undefined,
        },
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ error: "Username already exists" });
    }

    // Create new user
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      username,
      password: hashedPassword,
    });

    await user.save();
    console.log("New user created:", username); // Log only the username

    // Generate JWT
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET || "mySecretKey123!@#",
      { expiresIn: "1h" }
    );

    // Send success response
    res.status(201).json({
      message: "User created successfully",
      token,
    });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({
      error: "Internal server error",
      details: error.message,
    });
  }
});

// Login Route
app.post("/api/login", async (req, res) => {
  try {
    console.log("Login attempt for username:", req.body.username); // Log only username

    if (!req.body) {
      return res.status(400).json({ error: "Request body is missing" });
    }

    const { username, password } = req.body;

    if (!username || !password) {
      return res
        .status(400)
        .json({ error: "Username and password are required" });
    }

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    console.log("Successful login for username:", username); // Log successful login

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET || "mySecretKey123!@#",
      { expiresIn: "1h" }
    );

    res.json({ token });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Error logging in" });
  }
});

// Middleware to protect routes
const authenticate = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) return res.status(401).send("Access denied");

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).send("Invalid token");
    req.user = user;
    next();
  });
};

// Protected Route Example
// app.get("/api/protected", authenticate, (req, res) => {
//   res.send("This is a protected route");
// });

// Define an API route
app.get("/api/data", async (req, res) => {
  try {
    const subject = req.headers["subject"];
    const topic = req.headers["topic"];
    const additionalReq = req.headers["additionalReq"];
    const content = await datageneration(subject, topic, additionalReq); // Get data
    const jsonData = JSON.parse(content); // Convert string to JSON
    res.json(jsonData); // Send proper JSON response
  } catch (error) {
    console.error("Error generating content:", error);
    res.status(500).json({ error: "Error generating content" });
  }
});

// Start the Express server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
  console.log(`Test the server at http://localhost:${port}/test`);
});

// Error handling for unhandled promises
process.on("unhandledRejection", (error) => {
  console.error("Unhandled promise rejection:", error);
});
