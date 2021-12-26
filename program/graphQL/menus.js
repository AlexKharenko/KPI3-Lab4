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
const MenuServices = require("../services/menu.service");

const MenuType = new GraphQLObjectType({
  name: "Menu",
  description: "represents a menu",
  fields: () => ({
    menu_id: { type: new GraphQLNonNull(GraphQLInt) },
    date: { type: new GraphQLNonNull(GraphQLString) },
    dishes: {
      type: new GraphQLList(DishType),
      resolve: (menu) => {
        return menu.dishes;
      },
    },
  }),
});

const menus = {
  type: new GraphQLList(MenuType),
  description: "List of menus",
  args: {
    date: { type: GraphQLString },
  },
  resolve: async (parent, args) => {
    const table = new MenuServices({ date: args.date });
    const result = await table.getMenus();
    return result;
  },
};

const menu = {
  type: MenuType,
  description: "Menu object",
  args: {
    id: { type: GraphQLInt },
  },
  resolve: async (parent, args) => {
    const table = new MenuServices({});
    const result = await table.getMenuByID(args.id);
    return result;
  },
};

module.exports = {
  menu,
  menus,
};
