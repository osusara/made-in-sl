const express = require("express");
const router = express.Router();

router.get('/', (req, res) => {
    console.log("User Router");
});

module.exports = router;