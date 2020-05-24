const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("config");
const { check, validationResult } = require("express-validator");
const auth = require("../../../middleware/auth");

const User = require("../../../models/seller/User");

// @route   GET api/seller/auth
// @desc    Test route
// @access  Public
router.get("/", auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password"); // drop the password
        res.json(user);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server error");
    }
});

// @route   POST api/seller/auth
// @desc    Authenticate user and get token (login)
// @access  Public
router.post('/', [
    // validate the user registration form
    check('email', 'Enter a valid email').isEmail(),
    check('password', 'Passowrd is required').exists(),
], async (req, res) => {
    // executes the validation process
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
        // check if user exists
        let user = await User.findOne({ email }); // email: email
        if(!user){ return res.status(400).json({ error: [{ msg: 'Invalid email' }] }) };

        // verify the user
        const isMatch = await bcrypt.compare(password, user.password); // password is what user entered, user.password is in the db
        if(!isMatch) {
            return res.status(400).json({ errors: [{ msg: 'Invalid email/password' }] });
        }

        // return jsonwebtoken
        const payload = {
            user: {
                id: user.id, // mongoose turns _id into id
                isSeller: user.isSeller
            }
        }

        jwt.sign(payload, config.get('jwtAdminKey'), { expiresIn: 360000 }, (err, token) => {
            if(err) throw err;
            res.json({ token });
        });
        
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server error");
    }
});

module.exports = router;