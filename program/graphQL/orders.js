const {
  GraphQLList,
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLInt,
  GraphQLString,
  GraphQLFloat,
  GraphQLBoolean,
} = require("graphql");

const { DishType } = require("./dishes");
const OrderServices = require("../services/order.service");
const ResultType = require("./result");

const OrderType = new GraphQLObjectType({
  name: "Order",
  description: "represents a order",
  fields: () => ({
    order_id: { type: new GraphQLNonNull(GraphQLInt) },
    table_id: { type: new GraphQLNonNull(GraphQLInt) },
    general_price: { type: new GraphQLNonNull(GraphQLFloat) },
    date: { type: new GraphQLNonNull(GraphQLString) },
    dishes: {
      type: new GraphQLList(DishType),
      resolve: (order) => {
        return order.dishes;
      },
    },
  }),
});

const orders = {
  type: new GraphQLList(OrderType),
  description: "List of dishes",
  args: {
    date: { type: GraphQLString },
    table: { type: GraphQLInt },
  },
  resolve: async (parent, args) => {
    const table = new OrderServices({ date: args.date, table: args.table });
    const result = await table.getOrders();
    return result;
  },
};

const order = {
  type: OrderType,
  description: "Order object",
  args: {
    id: { type: GraphQLInt },
  },
  resolve: async (parent, args) => {
    const table = new OrderServices({});
    const result = await table.getOrderByID(args.id);
    return result;
  },
};

const createOrder = {
  type: ResultType,
  description: "Add a order",
  args: {
    dishes: { type: new GraphQLNonNull(new GraphQLList(GraphQLInt)) },
    table_id: { type: new GraphQLNonNull(GraphQLInt) },
  },
  resolve: async (parent, args) => {
    const table = new OrderServices({});
    await table.createOrder({
      dishes: args.dishes,
      table_id: args.table_id,
    });
    return { success: true, message: "successfuly created" };
  },
};

module.exports = {
  OrderType,
  order,
  orders,
  createOrder,
};
