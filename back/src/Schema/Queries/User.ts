import { GraphQLID, GraphQLList } from 'graphql';
import { UserType } from '../TypeDefs/User';
import User from '../../Entities/User';

export const GET_ALL_USERS = {
  type: new GraphQLList(UserType),
  resolve() {
    return User.find();
  },
};

export const GET_USER_BY_ID = {
  type: UserType,
  args: {
    id: { type: GraphQLID },
  },
  resolve(parent: any, args: any) {
    const { id } = args;
    return User.findOneBy({ id });
  },
};
