const express = require("express");
const app = express();
const connectDB = require("./config/db");

app.get("/", (req, res) => res.send("API is Running"));

// middelware
app.use(express.json({ extended: false }));

// mongodb connection
connectDB();

// define routes
app.use("/api/buyer/auth", require("./routes/api/buyer/auth"));
app.use("/api/buyer/users", require("./routes/api/buyer/users"));
app.use("/api/buyer/profile", require("./routes/api/buyer/profile"));

app.use("/api/seller/auth", require("./routes/api/seller/auth"));
app.use("/api/seller/users", require("./routes/api/seller/users"));
app.use("/api/seller/profile", require("./routes/api/seller/profile"));

// start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));