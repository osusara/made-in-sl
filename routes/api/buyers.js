const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("config");
const { check, validationResult } = require("express-validator");

const Buyer = require("../../models/Buyer");

// @route   POST api/buyers
// @desc    Register buyer
// @access  Public
router.post('/', [
    // validate the buyer registration form inputs
    check('username', 'Username is Required').not().isEmpty(),
    check('email', 'Enter a valid email').isEmail(),
    check('password', 'Please enter a password with 8 or more characters').isLength({ min: 8 }),
], async (req, res) => {

    // execute the validation process
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { username, email, password } = req.body;

    try {
        // check if buyer exists with same email
        let buyer = await Buyer.findOne({ email }); // email: email
        if(buyer){ return res.status(400).json({ error: [{ msg: 'A user already registered with the same Email' }] }) };

        // check if buyer exists with same username
        buyer = await Buyer.findOne({ username });
        if(buyer){ return res.status(400).json({ error: [{ msg: 'Username has already taken' }] }) };

        // get buyers gravatar
        const avatar = gravatar.url(email, { s: '200', r: 'pg', d: 'mm'});

        buyer = new Buyer({
            avatar,
            username,
            email,
            password
        });

        //encrypt password
        const salt = await bcrypt.genSalt(10); // 10 is recommended
        buyer.password = await bcrypt.hash(password, salt);

        await buyer.save(); // save to mongodb

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