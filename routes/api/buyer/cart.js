const express = require("express");
const router = express.Router();
const auth = require("../../../middleware/auth");

const Cart = require("../../../models/buyer/Cart");

// @route   GET api/buyer/cart
// @desc    get cart
// @access  Private
router.get("/", auth, async (req, res) => {
  try {
    // get the recent cart items
    const cart = await Cart.findOne({ user: req.user.id }).sort({ date: -1 });
    res.json(cart);

  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
});

// @route   POST api/buyer/cart/:productId
// @desc    add to cart
// @access  Private
router.post("/:productId", auth, async (req, res) => {

  const item = {
    item: req.params.productId,
    title: req.body.title,
    price: req.body.price,
    image: req.body.image,
    description: req.body.description
  };
  if (req.body.qty) item.qty = req.body.qty;

  try {
    let cart = await Cart.findOne({ user: req.user.id });

    // if there's a cart update it
    if(cart) {

      //check if the item is already in the cart
      const productItem = await Cart.findOne({ $and: [{ user: req.user.id }, { 'products.item': req.params.productId }]});

      if(productItem) {
        cart = await Cart.findOneAndUpdate(
          { $and: [{ user: req.user.id }, { 'products.item': req.params.productId }] },
          { 'products.$.qty': req.body.qty },
          { new: true }
        );

        return res.json(cart);
      }

      cart.products.unshift(item);
      await cart.save();

      return res.json(cart);
    }

    // if there's no cart create new one
    cart = new Cart({user: req.user.id});

    cart.products.unshift(item);
    await cart.save();

    res.json(cart);
  } catch (error) {

    console.error(error.message);
    if (error.kind == "ObjectId") {
      return res.status(400).json({ msg: "Object not found" });
    }

    res.status(500).send("Server error");
  }
});

// @route   DELETE api/buyer/cart/:productId
// @desc    delete from cart
// @access  Private
router.delete("/:productId", auth, async (req, res) => {
  try {
    // get the cart
    const cart = await Cart.findOne({ user: req.user.id });

    // get the index of product to be removed
    const removeIndex = cart.products
      .map(item => item.item)
      .indexOf(req.params.productId);

    cart.products.splice(removeIndex, 1);
    await cart.save();

    res.json(cart);

  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
});

// @route   DELETE api/buyer/cart/
// @desc    delete cart
// @access  Private
router.delete("/", auth, async (req, res) => {
  try {
    // remove cart
    await Cart.findOneAndRemove({ user: req.user.id });

    res.json({msg: 'Cart is empty now'});

  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;