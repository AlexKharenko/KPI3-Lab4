const express = require("express");
const OrderServices = require("../services/order.service");
const router = express.Router();

router.get("/", async (req, res) => {
  const table = new OrderServices(req.query);
  try {
    const result = await table.getOrders();
    if (result.length === 0) {
      res.status(404).json({ message: "Not Found" });
      return;
    }
    res.status(200).json({ result });
  } catch (err) {
    res.status(505).json(err);
  }
});
router.get("/:id", async (req, res) => {
  const table = new OrderServices(req.query);
  try {
    const result = await table.getOrderByID(req.params.id);
    if (result.length === 0) {
      res.status(404).json({ message: "Not Found" });
      return;
    }
    res.status(200).json({ result });
  } catch (err) {
    res.status(505).json(err);
  }
});
router.put("/update", async (req, res) => {
  const order = new OrderServices(req.query);
  try {
    await order.updateOrder(req.body.order);
    res.status(200).json({ message: "Success" });
  } catch (err) {
    res.status(505).json(err);
  }
});
router.post("/create", async (req, res) => {
  const order = new OrderServices(req.query);
  try {
    await order.createOrder(req.body.order);
    res.status(200).json({ message: "Success" });
  } catch (err) {
    res.status(505).json(err);
  }
});
router.delete("/delete", async (req, res) => {
  const order = new OrderServices(req.query);
  try {
    await order.deleteOrder(req.body.order);
    res.status(200).json({ message: "Success" });
  } catch (err) {
    res.status(505).json(err);
  }
});

module.exports = router;
