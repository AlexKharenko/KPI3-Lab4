const { GraphQLSchema, GraphQLObjectType } = require("graphql");

const { addDish, updateDish, deleteDish, dishes, dish } = require("./dishes");
const { createOrder, orders, order } = require("./orders");
const { menus, menu } = require("./menus");

const RootQueryType = new GraphQLObjectType({
  name: "Query",
  description: "Root Query",
  fields: () => ({
    dishes,
    dish,
    orders,
    order,
    menus,
    menu,
  }),
});

const RootMutationType = new GraphQLObjectType({
  name: "Mutation",
  description: "Root mutation",
  fields: () => ({
    addDish,
    updateDish,
    deleteDish,
    createOrder,
  }),
});

const schema = new GraphQLSchema({
  query: RootQueryType,
  mutation: RootMutationType,
});

module.exports = schema;
