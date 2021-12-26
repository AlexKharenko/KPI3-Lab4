const express = require("express");
const DishServices = require("../services/dish.service");
const router = express.Router();

router.get("/", async (req, res) => {
  const table = new DishServices(req.query);
  try {
    const result = await table.getDishes();
    if (result.length === 0) {
      res.status(404).json({ message: "Not Found" });
      return;
    }
    res.status(200).json({ result });
  } catch (err) {
    res.status(505).json(err);
  }
});
router.get("/add-dishes", async (req, res) => {
  const table = new DishServices(req.query);
  try {
    await table.addDishes();
    res.status(200).json({ success:true });
  } catch (err) {
    res.status(505).json(err);
  }
});
router.get("/:id", async (req, res) => {
  const table = new DishServices(req.query);
  try {
    const result = await table.getDishByID(req.params.id);
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
  const dish = new DishServices(req.query);
  try {
    await dish.updateDish(req.body.dish);
    res.status(200).json({ message: "Success" });
  } catch (err) {
    res.status(505).json(err);
  }
});
router.post("/create", async (req, res) => {
  const dish = new DishServices(req.query);
  try {
    await dish.createDish(req.body.dish);
    res.status(200).json({ message: "Success" });
  } catch (err) {
    res.status(505).json(err);
  }
});
router.delete("/delete", async (req, res) => {
  const dish = new DishServices(req.query);
  try {
    await dish.deleteDish(req.body.dish);
    res.status(200).json({ message: "Success" });
  } catch (err) {
    res.status(505).json(err);
  }
});
module.exports = router;
