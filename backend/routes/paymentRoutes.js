// Example in Express.js
router.post("/payment/order", authMiddleware, async (req, res) => {
  const instance = new Razorpay({ key_id, key_secret });
  const options = {
    amount: req.body.amount * 100,
    currency: "INR",
    receipt: "receipt_order_" + Date.now(),
  };

  try {
    const order = await instance.orders.create(options);
    res.json(order);
  } catch (err) {
    res.status(500).json({ error: "Failed to create Razorpay order" });
  }
});
