import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import { FaPaperPlane } from "react-icons/fa";
import AddComment from "../../../../graphql/mutation/comment/AddComment";
import { TaskInList } from "../../../global";

type Props = {
  taskId: string;
  userId: string;
};

const CommentList = ({ taskId, userId }: Props) => {
  const [newCommentContent, setNewCommentContent] = useState("");

  const [addComment, { loading }] = useMutation(AddComment, {
    onCompleted: () => {
      setNewCommentContent("");
    },
  });

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

  return (
    <div className="space-y-4">
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
    </div>
  );
};

export default CommentList;
