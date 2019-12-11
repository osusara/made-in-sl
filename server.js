const express = require("express");
const app = express();
const connectDB = require("./config/db");

app.get("/", (req, res) => res.send("API is Running"));

// middelware
app.use(express.json({ extended: false }));

// mongodb connection
connectDB();

// define routes
app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/profile", require("./routes/api/profile"));

// start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));