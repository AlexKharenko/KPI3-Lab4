const express = require("express");
const ProductServices = require("../services/product.service");
const router = express.Router();

router.get("/", async (req, res) => {
  const table = new ProductServices(req.query);
  try {
    const result = await table.getProducts();
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
  const table = new ProductServices(req.query);
  try {
    const result = await table.getProductByID(req.params.id);
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
  const table = new StatusServices();
  try {
    const result = await table.getStatusByID(req.params.id);
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
  const product = new ProductServices(req.query);
  try {
    await product.updateProduct(req.body.product);
    res.status(200).json({ message: "Success" });
  } catch (err) {
    res.status(505).json(err);
  }
});
router.post("/create", async (req, res) => {
  const product = new ProductServices(req.query);
  try {
    await product.createProduct(req.body.product);
    res.status(200).json({ message: "Success" });
  } catch (err) {
    res.status(505).json(err);
  }
});
router.delete("/delete", async (req, res) => {
  const product = new ProductServices(req.query);
  try {
    await product.deleteProduct(req.body.product);
    res.status(200).json({ message: "Success" });
  } catch (err) {
    res.status(505).json(err);
  }
});

module.exports = router;
