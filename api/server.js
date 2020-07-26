const path = require("path");
const express = require("express");
const app = express();
const connectDB = require("./config/db");

// middelware
app.use(express.json({ extended: false }));

// mongodb connection
connectDB();

// define routes
app.use("/api/buyer/auth", require("./routes/api/buyer/auth"));
app.use("/api/buyer/users", require("./routes/api/buyer/users"));
app.use("/api/buyer/profile", require("./routes/api/buyer/profile"));
app.use("/api/buyer/cart", require("./routes/api/buyer/cart"));
app.use("/api/buyer/order", require("./routes/api/buyer/order"));

app.use("/api/seller/auth", require("./routes/api/seller/auth"));
app.use("/api/seller/users", require("./routes/api/seller/users"));
app.use("/api/seller/profile", require("./routes/api/seller/profile"));

app.use("/api/products", require("./routes/api/product/products"));

// production build
app.use(express.static("client/build"));
app.get("*", (req, res) => res.sendFile(path.resolve(__dirname, "client", "build", "index.html")));

// start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
