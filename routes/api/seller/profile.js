const express = require("express");
const router = express.Router();
const auth = require("../../../middleware/auth");
const { check, validationResult } = require("express-validator");

const Profile = require("../../../models/seller/Profile");
const User = require("../../../models/seller/User");

// @route   GET api/seller/profile/me
// @desc    Get current users profile
// @access  Private
router.get("/me", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id }).populate("seller", ["username", "avatar"]);

    // check if the profile is valid
    if (!profile) {
      return res.status(400).json({ msg: "There is no Profile" });
    }

    res.json(profile);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
});

// @route   POST api/seller/profile
// @desc    Create or update user profile
// @access  Private
router.post("/", [auth, [
  check('company', 'Company name is required').not().isEmpty(),
  check('location', 'Company location is required').not().isEmpty(),
  check('phone', 'A Phone number is required').not().isEmpty(),
  check('email', 'An Email is required').isEmail(),
]], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { company, location, phone, email } = req.body;

  // build profile object
  const profileFields = {};
  profileFields.user = req.user.id;
  if(company) profileFields.company = company;
  if(location) profileFields.location = location;
  if(phone) profileFields.phone = phone;
  if(email) profileFields.email = email;

  try {
    let profile = await Profile.findOne({ user: req.user.id });

    // if there's a profile update it
    if(profile) {
        profile = await Profile.findOneAndUpdate({ user: req.user.id }, { $set: profileFields }, { new: true });
        return res.json(profile);
    }

    // if there's no profile create new one
    profile = new Profile(profileFields);

    await profile.save();
    res.json(profile);

  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
});

// @route   GET api/seller/profile
// @desc    Get all Profiles
// @access  Public
router.get('/', async (req, res) => {
  try {
    const profiles = await Profile.find().populate('seller', ['username', 'avatar']);
    res.json(profiles);

  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
});

// @route   GET api/seller/profile/user/:user_id
// @desc    Get Profile by user_id
// @access  Public
router.get('/user/:user_id', async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.params.user_id }).populate('seller', ['username', 'avatar']);
    if(!profile) return res.status(400).json({ msg: 'Profile not found' });

    res.json(profile);
    
  } catch (error) {
    console.error(error.message);
    if(error.kind == 'ObjectId'){
      return res.status(400).json({ msg: "Profile not found" });
    }
    res.status(500).send("Server error");
  }
});

// @route   DELETE api/seller/profile
// @desc    delete profile by user_id
// @access  Private
router.delete('/', auth, async (req, res) => {
  try {
    // remove profile
    await Profile.findOneAndRemove({ user: req.user.id });

    // remove user
    await User.findOneAndRemove({ _id: req.user.id });

    res.json({ msg: 'User deleted' });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;