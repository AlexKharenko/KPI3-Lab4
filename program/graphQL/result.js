const { GraphQLObjectType, GraphQLString, GraphQLBoolean } = require("graphql");

const ResultType = new GraphQLObjectType({
  name: "Result",
  description: "represents a result",
  fields: () => ({
    success: { type: GraphQLBoolean },
    message: { type: GraphQLString },
  }),
});

module.exports = ResultType;
