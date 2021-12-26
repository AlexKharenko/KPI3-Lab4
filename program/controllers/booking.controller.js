const express = require("express");
const BookingServices = require("../services/booking.service");
const router = express.Router();

router.get("/", async (req, res) => {
  const booking = new BookingServices(req.query);
  try {
    const result = await booking.getBookings();
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
  const booking = new BookingServices(req.query);
  try {
    await booking.updateBooking(req.body.booking);
    res.status(200).json({ message: "Success" });
  } catch (err) {
    res.status(505).json(err);
  }
});
router.post("/create", async (req, res) => {
  const booking = new BookingServices(req.query);
  try {
    await booking.createBooking(req.body.booking);
    res.status(200).json({ message: "Success" });
  } catch (err) {
    res.status(505).json(err);
  }
});
router.delete("/delete", async (req, res) => {
  const booking = new BookingServices(req.query);
  try {
    await booking.deleteBooking(req.body.booking);
    res.status(200).json({ message: "Success" });
  } catch (err) {
    res.status(505).json(err);
  }
});

module.exports = router;
