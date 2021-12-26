const express = require("express");
const StatusServices = require("../services/status.service");
const router = express.Router();

router.get("/", async (req, res) => {
  const table = new StatusServices();
  try {
    const result = await table.getStatuses();
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
  const status = new StatusServices(req.query);
  try {
    await status.updateStatus(req.body.status);
    res.status(200).json({ message: "Success" });
  } catch (err) {
    res.status(505).json(err);
  }
});
router.post("/create", async (req, res) => {
  const status = new StatusServices(req.query);
  try {
    await status.createStatus(req.body.status);
    res.status(200).json({ message: "Success" });
  } catch (err) {
    res.status(505).json(err);
  }
});
router.delete("/delete", async (req, res) => {
  const status = new StatusServices(req.query);
  try {
    await status.deleteStatus(req.body.status);
    res.status(200).json({ message: "Success" });
  } catch (err) {
    res.status(505).json(err);
  }
});

module.exports = router;
