const {
  GraphQLList,
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLInt,
  GraphQLString,
  GraphQLFloat,
  GraphQLBoolean,
} = require("graphql");

const DishServices = require("../services/dish.service");
const ResultType = require("./result");

const DishType = new GraphQLObjectType({
  name: "Dish",
  description: "represents a book",
  fields: () => ({
    dish_id: { type: new GraphQLNonNull(GraphQLInt) },
    dish_name: { type: new GraphQLNonNull(GraphQLString) },
    price: { type: new GraphQLNonNull(GraphQLFloat) },
    from: { type: new GraphQLNonNull(GraphQLString) },
    old_id: { type: GraphQLString },
  }),
});

const dishes = {
  type: new GraphQLList(DishType),
  description: "List of dishes",
  args: {
    dish_name: { type: GraphQLString },
    maxPrice: { type: GraphQLFloat },
    minPrice: { type: GraphQLFloat },
  },
  resolve: async (parent, args) => {
    const table = new DishServices({
      maxPrice: args.maxPrice,
      minPrice: args.minPrice,
      name: args.dish_name,
    });
    const result = await table.getDishes();
    return result;
  },
};
const dish = {
  type: DishType,
  description: "Dish object",
  args: {
    id: { type: GraphQLInt },
    service: { type: GraphQLBoolean, defaultValue: false },
  },
  resolve: async (parent, args) => {
    const table = new DishServices({});
    const result = await table.getDishByID(args.id, args.service);
    return result;
  },
};

const addDish = {
  type: ResultType,
  description: "Add a dish",
  args: {
    dish_name: { type: new GraphQLNonNull(GraphQLString) },
    price: { type: new GraphQLNonNull(GraphQLFloat) },
  },
  resolve: async (parent, args) => {
    const table = new DishServices({});
    await table.createDish({
      dish_name: args.dish_name,
      price: args.price,
    });
    return { success: true, message: "successfuly created" };
  },
};

const updateDish = {
  type: ResultType,
  description: "Update a dish",
  args: {
    dish_id: { type: new GraphQLNonNull(GraphQLInt) },
    dish_name: { type: GraphQLString },
    price: { type: GraphQLFloat },
  },
  resolve: async (parent, args) => {
    const table = new DishServices({});
    await table.updateDish({
      dish_id: args.dish_id,
      dish_name: args.dish_name || "",
      price: args.price || "",
    });
    return { success: true, message: "successfuly updated" };
  },
};

const deleteDish = {
  type: ResultType,
  description: "Delete a dish",
  args: {
    dish_id: { type: new GraphQLNonNull(GraphQLInt) },
  },
  resolve: async (parent, args) => {
    const table = new DishServices({});
    await table.deleteDish({
      dish_id: args.dish_id,
    });
    return { success: true, message: "successfuly deleted" };
  },
};

module.exports = {
  DishType,
  dish,
  dishes,
  addDish,
  updateDish,
  deleteDish,
};
