const express = require("express");
const DishServices = require("../services/dish.service");
const router = express.Router();

function timeout(s) {
  return new Promise(resolve => setTimeout(resolve, s * 1000));
}

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

router.get("/", async (req, res) => {
  const table = new DishServices(req.query);
  try {
    const result = await table.getDishes();
    await timeout(getRandomArbitrary(20, 30));
    if (result.length === 0) {
      res.status(404).json({ message: "Not Found" });
      return;
    }
    res.status(200).json({ result });
  } catch (err) {
    res.status(505).json(err);
  }
});

module.exports = router;
