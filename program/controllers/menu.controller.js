const express = require("express");
const MenuServices = require("../services/menu.service");
const router = express.Router();

router.get("/", async (req, res) => {
  const table = new MenuServices(req.query);
  try {
    const result = await table.getMenus();
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
  const table = new MenuServices(req.query);
  try {
    const result = await table.getMenuByID(req.params.id);
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
  const menu = new MenuServices(req.query);
  try {
    await menu.updateMenu(req.body.menu);
    res.status(200).json({ message: "Success" });
  } catch (err) {
    res.status(505).json(err);
  }
});
router.post("/create", async (req, res) => {
  const menu = new MenuServices(req.query);
  try {
    await menu.createMenu(req.body.menu);
    res.status(200).json({ message: "Success" });
  } catch (err) {
    res.status(505).json(err);
  }
});
router.delete("/delete", async (req, res) => {
  const menu = new MenuServices(req.query);
  try {
    await menu.deleteMenu(req.body.menu);
    res.status(200).json({ message: "Success" });
  } catch (err) {
    res.status(505).json(err);
  }
});

module.exports = router;
