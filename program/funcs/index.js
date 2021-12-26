const axios = require("axios");
const Database = require("../config/database");

db = Database.getInstance();

exports.getData = async () => {
  let first = [];
  let second = [];
  const { data } = await axios.get("http://localhost:4000/search");
  first = data.result;
  for (let i = 1; i <= 10; i++) {
    const { data } = await axios.get(
      `http://localhost:5000/price-list/?page=${i}`
    );
    second = [...second, ...data.result];
  }
  await db.useQuery("TRUNCATE TABLE cache_dish RESTART IDENTITY;");
  await db.createMany({
    table_name: "cache_dish",
    columns: ["old_id", "dish_name", "price", "from"],
    values: first.map((item) => [
      item.id,
      item.dish_name,
      item.price,
      "service1",
    ]),
  });
  await db.createMany({
    table_name: "cache_dish",
    columns: ["old_id", "dish_name", "price", "from"],
    values: second.map((item) => [
      item.id,
      item.dish_name,
      item.price,
      "service2",
    ]),
  });
};
