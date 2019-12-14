const express = require("express");
const app = express();
const connectDB = require("./config/db");

app.get("/", (req, res) => res.send("API is Running"));

// middelware
app.use(express.json({ extended: false }));

// mongodb connection
connectDB();

// define routes
app.use("/api/buyerAuth", require("./routes/api/buyerAuth"));
app.use("/api/buyers", require("./routes/api/buyers"));
app.use("/api/buyerProfile", require("./routes/api/buyerProfile"));

// start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));