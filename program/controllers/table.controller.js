const express = require("express");
const tableServices = require("../services/table.service");
const router = express.Router();

router.get("/free", async (req, res) => {
  const table = new tableServices(req.query);
  try {
    const result = await table.getFreeTablesForTime();
    if (result.length === 0) {
      res.status(404).json({ message: "Not Found" });
      return;
    }
    res.status(200).json({ result });
  } catch (err) {
    res.status(505).json(err);
  }
});
router.get("/", async (req, res) => {
  const table = new tableServices(req.query);
  try {
    const result = await table.getTables();
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
  const table = new tableServices(req.query);
  try {
    const result = await table.getTableByID(req.params.id);
    if (result.length === 0) {
      res.status(404).json({ message: "Not Found" });
      return;
    }
    res.status(200).json({ result });
  } catch (err) {
    res.status(505).json(err);
  }
});
router.get("/:number", async (req, res) => {
  const table = new tableServices(req.query);
  try {
    const result = await table.getTableByNumber(req.params.number);
    if (result.length === 0) {
      res.status(404).json({ message: "Not Found" });
      return;
    }
    res.status(200).json({ result });
  } catch (err) {
    console.log(err)
    res.status(505).json(err);
  }
});
router.put("/update", async (req, res) => {
  const table = new tableServices(req.query);
  try {
    await table.updateTable(req.body.table);
    res.status(200).json({message: "Success"});
  } catch (err) {
    res.status(505).json(err);
  }
});
router.post("/create", async (req, res) => {
  const table = new tableServices(req.query);
  try {
    await table.createTable(req.body.table);
    res.status(200).json({message: "Success"});
  } catch (err) {
    res.status(505).json(err);
  }
});
router.delete("/delete", async (req, res) => {
  const table = new tableServices(req.query);
  try {
    await table.deleteTable(req.body.table);
    res.status(200).json({message: "Success"});
  } catch (err) {
    res.status(505).json(err);
  }
});

module.exports = router;
