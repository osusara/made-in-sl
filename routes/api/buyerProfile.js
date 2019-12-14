const express = require("express");
const router = express.Router();
const auth = require("../../middleware/buyerAuth");
const { check, validationResult } = require("express-validator");

const BuyerProfile = require("../../models/BuyerProfile");
const Buyer = require("../../models/Buyer");

// @route   GET api/buyerProfile/me
// @desc    Get current buyers buyerProfile
// @access  Private
router.get("/me", auth, async (req, res) => {
  try {
    const buyerProfile = await BuyerProfile.findOne({ buyer: req.buyer.id }).populate("buyer", ["username", "avatar"]);

    // check if the buyerProfile is valid
    if (!buyerProfile) {
      return res.status(400).json({ msg: "There is no Profile" });
    }

    res.json(buyerProfile);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
});

// @route   POST api/buyerProfile
// @desc    Create or update buyer buyerProfile
// @access  Private
router.post("/", [auth, [
  check('firstname', 'First Name is required').not().isEmpty(),
  check('lastname', 'Last Name is required').not().isEmpty(),
]], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { firstname, lastname, gender, phone } = req.body;

  // build buyerProfile object
  const buyerProfileFields = {};
  buyerProfileFields.buyer = req.buyer.id;
  if(firstname) buyerProfileFields.firstname = firstname;
  if(lastname) buyerProfileFields.lastname = lastname;
  if(gender) buyerProfileFields.gender = gender;
  if(phone) buyerProfileFields.phone = phone;

  try {
    let buyerProfile = await BuyerProfile.findOne({ buyer: req.buyer.id });

    // if there's a buyerProfile update it
    if(buyerProfile) {
        buyerProfile = await BuyerProfile.findOneAndUpdate({ buyer: req.buyer.id }, { $set: buyerProfileFields }, { new: true });
        return res.json(buyerProfile);
    }

    // if there's no buyerProfile create new one
    buyerProfile = new BuyerProfile(buyerProfileFields);

    await buyerProfile.save();
    res.json(buyerProfile);

  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
});

// @route   GET api/buyerProfile
// @desc    Get all Profiles
// @access  Public
router.get('/', async (req, res) => {
  try {
    const buyerProfiles = await BuyerProfile.find().populate('buyer', ['buyername', 'avatar']);
    res.json(buyerProfiles);

  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
});

// @route   GET api/buyerProfile/buyer/:buyer_id
// @desc    Get Profile by buyer_id
// @access  Public
router.get('/buyer/:buyer_id', async (req, res) => {
  try {
    const buyerProfile = await BuyerProfile.findOne({ buyer: req.params.buyer_id }).populate('buyer', ['buyername', 'avatar']);
    if(!buyerProfile) return res.status(400).json({ msg: 'Profile not found' });

    res.json(buyerProfile);
    
  } catch (error) {
    console.error(error.message);
    if(error.kind == 'ObjectId'){
      return res.status(400).json({ msg: "Profile not found" });
    }
    res.status(500).send("Server error");
  }
});

// @route   DELETE api/buyerProfile
// @desc    delete buyerProfile by buyer_id
// @access  Private
router.delete('/', auth, async (req, res) => {
  try {
    // remove buyerProfile
    await BuyerProfile.findOneAndRemove({ buyer: req.buyer.id });

    // remove buyer
    await Buyer.findOneAndRemove({ _id: req.buyer.id });

    res.json({ msg: 'Buyer deleted' });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
});

// @route   PUT api/buyerProfile/address
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
    const buyerProfile = await BuyerProfile.findOne({ buyer: req.buyer.id });

    buyerProfile.address.unshift(newAddress);
    await buyerProfile.save();

    res.json(buyerProfile);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
});

// @route   DELETE api/buyerProfile/address/:address_id
// @desc    delete addresses from the buyerProfile
// @access  Private
router.delete('/address/:address_id', auth, async (req, res) => {
  try {
    // get the buyerProfile
    const buyerProfile = await BuyerProfile.findOne({ buyer: req.buyer.id });

    // get the index of address to be removed
    const removeIndex = buyerProfile.address.map(item => item.id).indexOf(req.params.address_id);

    buyerProfile.address.splice(removeIndex, 1);
    await buyerProfile.save();

    res.json(buyerProfile);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;