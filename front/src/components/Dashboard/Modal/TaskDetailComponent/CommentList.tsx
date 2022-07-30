import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import Pagination from "@mui/material/Pagination";

import { FaPaperPlane } from "react-icons/fa";

import CommentItem from "./CommentItem";
import usePagination from "../../../common/hook/usePagination";
import AddComment from "../../../../graphql/mutation/comment/AddComment";
import GetCommentByTicketId from "../../../../graphql/queries/comment/GetCommentByTicketId";
import DeleteComment from "../../../../graphql/mutation/comment/DeleteComment";

type Props = {
  taskId: string;
  userId: string;
};

const CommentList = ({ taskId, userId }: Props) => {
  const [newCommentContent, setNewCommentContent] = useState("");
  let [page, setPage] = useState(1);

  const [addComment, { loading }] = useMutation(AddComment, {
    onCompleted: () => {
      setNewCommentContent("");
    },
    refetchQueries: [
      { query: GetCommentByTicketId, variables: { ticketId: taskId } },
    ],
  });

  const [getComment, { data: dataComments, loading: loadingComment }] =
    useLazyQuery(GetCommentByTicketId);

  const handleChange = (e: any, p: number) => {
    setPage(p);
    _DATA.jump(p);
  };

  const PER_PAGE = 2;

  const count = Math.ceil(
    dataComments ? dataComments.GetCommentByTicketId.length : 0 / PER_PAGE
  );

  const _DATA = usePagination(
    dataComments ? dataComments.GetCommentByTicketId : [],
    PER_PAGE
  );

  const submitComment = () => {
    const newComment = {
      content: newCommentContent,
      ticket_id: taskId,
      user_id: userId,
    };

    addComment({
      variables: {
        data: newComment,
      },
    });
  };

  const [deleteComment, { loading: loadDelete }] = useMutation(DeleteComment);

  const handleDelete = async (id: string) => {
    await deleteComment({
      variables: {
        commentId: id,
      },
      update(cache) {
        const normalizedId = cache.identify({
          id: id,
          __typename: "Comment",
        });
        cache.evict({ id: normalizedId });
        cache.gc();
      },
    });
  };

  useEffect(() => {
    if (taskId) {
      getComment({
        variables: {
          ticketId: taskId,
        },
      });
    }
  }, [taskId]);

  console.log(dataComments);
  return (
    <div className="space-y-4 max-h-full overflow-hidden">
      <h3 className="text-lh-primary font-title text-4xl">Comments</h3>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          submitComment();
        }}
        className="flex flex-col items-end  space-y-4"
      >
        <textarea
          value={newCommentContent}
          onChange={(e) => setNewCommentContent(e.target.value)}
          placeholder="Write a comment"
          id="commentarea"
          name="commentarea"
          className="rounded-lg border-2 border-lh-gray p-2 text-lh-dark font-text w-full"
          rows={5}
          cols={5}
        />
        <button
          disabled={loading}
          className={
            loading
              ? " bg-gray-500 cursor-progress font-text text-lh-light py-1.5 px-3 flex space-x-2 items-center rounded-lg w-fit"
              : "bg-lh-secondary font-text text-lh-light py-1.5 px-3 flex space-x-2 items-center rounded-lg w-fit"
          }
        >
          <div>Post</div>
          <FaPaperPlane />
        </button>
      </form>
      <div>
        <div className="space-y-4 h-96 overflow-y-auto">
          {dataComments &&
            _DATA.currentData().map((comment: any) => {
              return (
                <CommentItem
                  key={comment.id}
                  comment={comment}
                  deleteComment={() => handleDelete(comment.id)}
                />
              );
            })}
        </div>
        <div className="flex items-center justify-center my-4">
          <Pagination
            count={count}
            size="large"
            page={page}
            variant="outlined"
            shape="rounded"
            onChange={handleChange}
          />
        </div>
      </div>
    </div>
  );
};

export default CommentList;
