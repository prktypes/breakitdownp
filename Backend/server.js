const express = require("express");
const cors = require("cors");
const datageneration = require("./datageneration"); // Import function properly

const app = express();
const port = 3000;

// Enable CORS
app.use(cors());
const allowedOrigins = ["http://localhost:5173"];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
  })
);
// Define an API route
app.get("/api/data", async (req, res) => {
  try {
    const content = await datageneration(); // Get data
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
});
