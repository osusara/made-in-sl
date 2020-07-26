const express = require("express");
const router = express.Router();
const auth = require("../../../middleware/auth");
const { check, validationResult } = require("express-validator");

const Profile = require("../../../models/buyer/Profile");
const User = require("../../../models/buyer/User");

// @route   GET api/buyer/profile/me
// @desc    Get current users profile
// @access  Private
router.get("/me", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id }).populate("buyer", ["username", "avatar"]);

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

// @route   POST api/buyer/profile
// @desc    Create or update user profile
// @access  Private
router.post("/", [auth, [
  check('firstname', 'First Name is required').not().isEmpty(),
  check('lastname', 'Last Name is required').not().isEmpty(),
]], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { firstname, lastname, country, gender, phone } = req.body;

  // build profile object
  const profileFields = {};
  profileFields.user = req.user.id;
  if (firstname) profileFields.firstname = firstname;
  if (lastname) profileFields.lastname = lastname;
  if (gender) profileFields.gender = gender;
  if (country) profileFields.country = country;
  if (phone) profileFields.phone = phone;

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

// @route   GET api/buyer/profile
// @desc    Get all Profiles
// @access  Public
router.get('/', async (req, res) => {
  try {
    const profiles = await Profile.find().populate('buyer', ['username', 'avatar']);
    res.json(profiles);

  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
});

// @route   GET api/buyer/profile/user/:user_id
// @desc    Get Profile by user_id
// @access  Public
router.get('/user/:user_id', async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.params.user_id }).populate('buyer', ['username', 'avatar']);
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

// @route   DELETE api/buyer/profile
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

// @route   PUT api/buyer/profile/address
// @desc    add Profile address
// @access  Private
router.put('/address', [auth, [
  check('no', 'Address Number is required').not().isEmpty(),
  check('street', 'Street is required').not().isEmpty(),
  check('city', 'City is required').not().isEmpty(),
  check('postalcode', 'Postal Code is required').not().isEmpty(),
  check('province', 'State/Province is required').not().isEmpty(),
  check('region', 'Country is required').not().isEmpty(),
]], async (req, res) => {
  
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { no, street, city, postalcode, province, region } = req.body;
  const newAddress = { no, street, city, postalcode, province, region };

  try {
    const profile = await Profile.findOne({ user: req.user.id });

    profile.address.unshift(newAddress);
    await profile.save();

    res.json(profile);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
});

// @route   DELETE api/buyer/profile/address/:address_id
// @desc    delete addresses from the profile
// @access  Private
router.delete('/address/:address_id', auth, async (req, res) => {
  try {
    // get the profile
    const profile = await Profile.findOne({ user: req.user.id });

    // get the index of address to be removed
    const removeIndex = profile.address.map(item => item.id).indexOf(req.params.address_id);

    profile.address.splice(removeIndex, 1);
    await profile.save();

    res.json(profile);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
