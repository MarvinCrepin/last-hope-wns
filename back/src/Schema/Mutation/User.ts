import { GraphQLID, GraphQLString } from 'graphql';
import bcrypt from 'bcrypt';

import { UserType, NoContentReturnType } from '../TypeDefs/User';
import User from '../../Entities/User';

export const CREATE_USER = {
  type: UserType,
  args: {
    lastname: { type: GraphQLString },
    firstname: { type: GraphQLString },
    mail: { type: GraphQLString },
    password: { type: GraphQLString },
    role: { type: GraphQLString },
  },
  async resolve(parent: any, args: any) {
    const { password } = args;

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const NEW_USER = {
      ...args,
      password: hashedPassword,
      role: args.role,
    };
    await User.insert(NEW_USER);
    return NEW_USER;
  },
};

export const DELETE_USER = {
  type: NoContentReturnType,
  args: {
    id: { type: GraphQLID },
  },
  async resolve(parent: any, args: any) {
    await User.delete(args.id);
  },
};
