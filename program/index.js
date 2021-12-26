require("dotenv").config();

const express = require("express");
const expressGraphQL = require("express-graphql").graphqlHTTP;
const bodyParser = require("body-parser");

const schedule = require("node-schedule");

const port = process.env.PORT || 3000;
const address = process.env.ADDRESS || "0.0.0.0";

const app = express();

app.use(bodyParser.json({ limit: "20mb" }));
app.use(bodyParser.urlencoded({ limit: "20mb", extended: true }));

app.use(express.json());

const schemaData = require("./graphQL/schema");

app.use(
  "/graphql",
  expressGraphQL({
    schema: schemaData,
    graphiql: true,
  })
);

const bookingController = require("./controllers/booking.controller");
const tableController = require("./controllers/table.controller");
const orderController = require("./controllers/order.controller");
const dishController = require("./controllers/dish.controller");
const menuController = require("./controllers/menu.controller");
const productController = require("./controllers/product.controller");
const statusController = require("./controllers/status.controller");

const func = require("./funcs/index");

app.use("/booking", bookingController);
app.use("/tables", tableController);
app.use("/orders", orderController);
app.use("/dishes", dishController);
app.use("/menus", menuController);
app.use("/products", productController);
app.use("/status", statusController);

schedule.scheduleJob("0 * * *", async () => {
  await func.getData();
});

app.listen(port, address, () => {
  console.log(`App listening on port http://${address}:${port}`);
});
