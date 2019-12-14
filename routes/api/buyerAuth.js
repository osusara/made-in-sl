const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("config");
const { check, validationResult } = require("express-validator");
const auth = require("../../middleware/buyerAuth");

const Buyer = require("../../models/Buyer");

// @route   GET api/auth
// @desc    Test route
// @access  Public
router.get("/", auth, async (req, res) => {
    try {
        const buyer = await Buyer.findById(req.buyer.id).select("-password"); // drop the password
        res.json(buyer);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server error");
    }
});

// @route   POST api/auth
// @desc    Authenticate buyer and get token (login)
// @access  Public
router.post('/', [
    // validate the buyer registration form
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
        // check if buyer exists
        let buyer = await Buyer.findOne({ email }); // email: email
        if(!buyer){ return res.status(400).json({ error: [{ msg: 'Invalid email' }] }) };

        // verify the buyer
        const isMatch = await bcrypt.compare(password, buyer.password); // password is what buyer entered, buyer.password is in the db
        if(!isMatch) {
            return res.status(400).json({ errors: [{ msg: 'Invalid email/password' }] });
        }

        // return jsonwebtoken
        const payload = {
            buyer: {
                id: buyer.id // mongoose turns _id into id
            }
        }

        jwt.sign(payload, config.get('jwtPrivateKey'), { expiresIn: 360000 }, (err, token) => {
            if(err) throw err;
            res.json({ token });
        });
        
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server error");
    }
});

module.exports = router;