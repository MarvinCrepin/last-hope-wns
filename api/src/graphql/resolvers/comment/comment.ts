import AddComment from "./mutations/AddComment";

import GetCommentByTicketId from "./queries/GetCommentByTicketId";

export default {
  Query: {
    GetCommentByTicketId,
  },

  Mutation: {
    AddComment,
  },
};
