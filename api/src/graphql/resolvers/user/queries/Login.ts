import { ApolloError } from "apollo-server-core";

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Create type for args
export default async (_parent: any, args: any, context: any) => {
    console.log(args)
    const user = await context.prisma.user.findUnique({
        where: { mail: args.mail },
    });

    if(!user){
        throw new ApolloError("Invalid user");
    }

    if(!bcrypt.compareSync(args.password, user.password)){
        throw new ApolloError("Invalid password");
    }

    const token = await jwt.sign(
            { user_id: user._id, mail: user.mail, roles: user.roles },
                process.env.ACCESS_TOKEN_SECRET_KEY,
            {
                expiresIn: "2h",
            }
        );
        
    return {token, user};
};
