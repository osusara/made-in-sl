const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const auth = require("../../../middleware/auth");

const Seller = require("../../../models/seller/User");
const Buyer = require("../../../models/buyer/User");
const Product = require("../../../models/product/Product");

// @route   POST api/products
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
        category: req.body.category,
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
// @access  Private - sellers only
router.get('/', async (req, res) => {
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

// @route   DELETE api/products/:id
// @desc    delete a product
// @access  Private - sellers only
router.delete('/:id', auth, async (req, res) => {
  try {
    // find the product
    const product = await Product.findById(req.params.id);
    if(!product) return res.status(404).json({ msg: "Product not found" });

    // check the user's authority for delete the product
    if(product.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Seller not authorized"});
    }

    // remove from mongodb
    await product.remove();

    res.json({ msg: 'Product removed' });
  } catch (error) {
    console.error(error.message);
    if (error.kind === "ObjectId")
      return res.status(404).json({ msg: "Post not found" });

    res.status(500).send("Server error");
  }
});

// @route   PUT api/products/like/:id
// @desc    like a product
// @access  Private - buyers only
router.put('/like/:id', auth, async (req, res) => {
  try {
    // get the product
    const product = await Product.findById(req.params.id);

    // check if the current user is a buyer
    if(req.user.isSeller) return res.status(401).json({ errors: [{ msg: 'User is not a buyer' }] });

    // check if the product has already been liked
    // get the user ids of each like (by filter()) and check if there's more than 0 which match with the current user's id
    if(product.likes.filter(like => like.user.toString() === req.user.id).length > 0) {

      // if liked - get remove index
      // get the index of user id which match with the current user's id
      const removeIndex = product.likes.map(like => like.user.toString()).indexOf(req.user.id);
      product.likes.splice(removeIndex, 1);

      await product.save();
      res.json(product.likes);

      return res.status(400).json({ msg: 'Post already liked' });
    } else {
      // if not liked
      product.likes.unshift({ user: req.user.id });

      await product.save();
      res.json(product.likes);
    }

  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
});

// @route   POST api/products/review/:id
// @desc    write a review on a product
// @access  Private - buyers only
router.post('/review/:id', [auth, [
  check('rate', 'Rate value is required').not().isEmpty()
]], async (req, res) => {
  // checking for validation
  const errors = validationResult(req);
  if(!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
  }

  try {
    // check if the current user is a seller
    if(req.user.isSeller) return res.status(401).json({ errors: [{ msg: 'User is not a buyer' }] });

    // get the user
    const user = await Buyer.findById(req.user.id).select('-password');

    //get the product
    const product = await Product.findById(req.params.id);

    // create new review object
    const newReview = {
      rate: req.body.rate,
      text: req.body.text,
      name: user.name,
      avatar: user.avatar,
      user: req.user.id
    };

    // add review to the product
    product.reviews.unshift(newReview);

    // save to mongodb
    await product.save();
    res.json(product.reviews);

  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;