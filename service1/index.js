require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");

const port = process.env.PORT || 3000;
const address = process.env.ADDRESS || "0.0.0.0";

const app = express();

app.use(bodyParser.json({ limit: "20mb" }));
app.use(bodyParser.urlencoded({ limit: "20mb", extended: true }));

app.use(express.json());

const dishController = require('./controllers/dish.controller');

app.use('/search', dishController);

app.listen(port, address, () => {
  console.log(`App listening on port http://${address}:${port}`);
});
