const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const auth = require("../../../middleware/auth");

const Seller = require("../../../models/seller/User");
const Buyer = require("../../../models/buyer/User");
const Product = require("../../../models/product/Product");

// @route   POST api/posts
// @desc    add a product
// @access  Private
router.post("/",[auth, [
      check("title", "Title is required").not().isEmpty(),
      check("description", "Description is required").not().isEmpty(),
      check("price", "Price is required").not().isEmpty()
]], async (req, res) => {
    // checking for validation
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    try {

      // check if the current user is a seller
      if(!req.user.isSeller) return res.status(401).json({ errors: [{ msg: 'User is not a seller' }] });

      //get the seller
      const user = await Seller.findById(req.user.id).select("-password");

      // adding new product
      const newProduct = new Product({
        image: req.body.image,
        title: req.body.title,
        description: req.body.description,
        price: req.body.price,
        name: user.username,
        avatar: user.avatar,
        user: req.user.id
      });

      // save to mongodb
      const product = await newProduct.save();
      res.json(product);
    } catch (error) {
      console.error(error.message);
      if (error.kind == "ObjectId") {
        return res.status(400).json({ msg: "Profile not found" });
      }
      res.status(500).send("Server error");
    }
  }
);

// @route   GET api/products
// @desc    get all product list
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    // get the recent products
    const products = await Product.find().sort({ date: -1 });
    res.json(products);

  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
});

// @route   GET api/products/:id
// @desc    get product by id
// @access  Private
router.get('/:id', auth, async (req, res) => {
  try {
    // get the product by id
    const product = await Product.findById(req.params.id);

    // check if the product is exist
    if(!product)
      return res.status(404).json({ msg: 'Product not found' });
    
    res.json(product);
  } catch (error) {
    console.error(error.message);

    if (error.kind === "ObjectId")
      return res.status(404).json({ msg: "Post not found" });

    res.status(500).send("Server error");
  }
});

module.exports = router;