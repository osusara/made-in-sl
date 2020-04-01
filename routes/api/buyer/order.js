const express = require("express");
const router = express.Router();
const auth = require("../../../middleware/auth");

const Order = require("../../../models/buyer/Order");

// @route   GET api/buyer/order
// @desc    get all order list
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    // get the orders in time order
    const orders = await Order.find({ user: req.user.id }).sort({ date: -1 }).limit(10);
    res.json(orders);

  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
});

// @route   POST api/buyer/order
// @desc    add to order
// @access  Private
router.post("/", auth, async (req, res) => {
  const items = []

  req.body.products.forEach(function(product){
    const item = {
      item: product.item,
      image: product.image,
      title: product.title,
      description: product.description,
      price: product.price,
      qty: product.qty
    };

    items.unshift(item);
  })

  try {
    const order = new Order({
      user: req.user.id,
      total: req.body.total,
      products: items
    });

    await order.save();
    res.json(order);

  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
});

// @route   PUT api/buyer/order/delivered
// @desc    mark order as delivered
// @access  Private
router.post("/delivered", auth, async (req, res) => { 
  try {
    const order = await Order.findOneAndUpdate({ _id: req.body.orderId }, { $set: {delivered: true} }, { new: true });
    const orders = await Order.find({ user: req.user.id }).sort({ date: -1 }).limit(10);
    res.json(orders);

  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
});

// @route   DELETE api/buyer/order/:productId
// @desc    delete from order
// @access  Private
// router.delete("/:productId", auth, async (req, res) => {
//   try {
//     // get the order
//     const order = await Order.findOne({ user: req.user.id });

//     // get the index of product to be removed
//     const removeIndex = order.products
//       .map(item => item.item)
//       .indexOf(req.params.productId);

//     order.products.splice(removeIndex, 1);
//     await order.save();

//     res.json(order);
//   } catch (error) {
//     console.error(error.message);
//     res.status(500).send("Server error");
//   }
// });

module.exports = router;
