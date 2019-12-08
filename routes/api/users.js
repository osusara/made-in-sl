const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("config");
const { check, validationResult } = require("express-validator");

const User = require("../../models/User");

// @route   POST api/users
// @desc    Register user
// @access  Public
router.post('/', [
    // validate the user registration form
    check('firstName', 'First Name is Required').not().isEmpty(),
    check('lastName', 'Last Name is Required').not().isEmpty(),
    check('address', 'Addresss No. is Required').not().isEmpty(),
    check('street', 'Address Street is Required').not().isEmpty(),
    check('city', 'Addresss City is Required').not().isEmpty(),
    check('postalCode', 'Postal Code is Required').not().isEmpty(),
    check('region', 'Region is Required').not().isEmpty(),
    check('email', 'Enter a valid email').isEmail(),
    check('password', 'Please enter a password with 8 or more characters').isLength({ min: 8 }),
], async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { firstName, lastName, gender, phone, address, street, city, postalCode, region, email, password } = req.body;

    try {
        // check if user exists
        let user = await User.findOne({ email }); // email: email
        if(user){ return res.status(400).json({ error: [{ msg: 'User already exist' }] }) };

        // get users gravatar
        const avatar = gravatar.url(email, { s: '200', r: 'pg', d: 'mm'});
        user = new User({
            avatar,
            firstName,
            lastName,
            gender,
            phone,
            address,
            street,
            city,
            postalCode,
            region,
            email,
            password
        });

        //encrypt password
        const salt = await bcrypt.genSalt(10); // 10 is recommended
        user.password = await bcrypt.hash(password, salt);

        await user.save(); // save to mongodb

        // return jsonwebtoken
        const payload = {
            user: {
                id: user.id // mongoose turns _id into id
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