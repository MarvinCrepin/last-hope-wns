import AddComment from "./mutations/AddComment";
import DeleteComment from "./mutations/DeleteComment";

import GetCommentByTicketId from "./queries/GetCommentByTicketId";

export default {
  Query: {
    GetCommentByTicketId,
  },

  Mutation: {
    DeleteComment,
    AddComment,
  },
};
