import {
  GraphQLBoolean,
  GraphQLInt,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: { type: GraphQLInt },
    lastname: { type: GraphQLString },
    firstname: { type: GraphQLString },
    mail: { type: GraphQLString },
    password: { type: GraphQLString },
    role: { type: GraphQLString },
  }),
});

const NoContentReturnType = new GraphQLObjectType({
  name: 'Error',
  fields: () => ({
    success: { type: GraphQLBoolean },
    msg: { type: GraphQLString },
  }),
});

export { UserType, NoContentReturnType };
