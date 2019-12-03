const express = require("express");
const app = express();
const connectDB = require("./config/db");

app.get('/', (req, res) => res.send("API is Running"));

// mongodb connection
connectDB();

// define routes
app.use('/api/users', require("./routes/api/users"));

// start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`)); 