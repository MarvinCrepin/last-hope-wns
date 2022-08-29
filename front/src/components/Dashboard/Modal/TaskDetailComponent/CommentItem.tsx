import React from "react";
import { FaRegUserCircle, FaTrash, FaTrashAlt } from "react-icons/fa";
import { returnRoleName } from "../../../common/Utils";
import Moment from "react-moment";
import { useSelector } from "react-redux";
import { user } from "../../../../slicer/authSlice";

type Props = {
  comment: any;
  deleteComment: () => void;
};

export default function CommentItem({ comment, deleteComment }: Props) {
  const userInStore = useSelector(user);
  const FORMAT_DATE = "YYYY/MM/DD, hh:mm a";

  return (
    <div className="flex flex-col ">
      <div>
        <div className="flex justify-between items-center">
          <div className=" text-lh-dark	flex items-center space-x-4">
            <FaRegUserCircle size={44} />
            <div className="font-title  text-2xl">
              {`${comment.user.firstname} ${comment.user.lastname} - `}
              <span className="text-lh-secondary">
                {returnRoleName(comment.user.roles)}
              </span>
            </div>
          </div>
          {comment.user.id === userInStore.id ||
          userInStore.roles === "ROLE_ADMIN" ? (
            <FaTrashAlt
              size={22}
              className="text-lh-secondary cursor-pointer hover:opacity-80"
              onClick={() => deleteComment()}
            />
          ) : null}
        </div>
      </div>
      <div className="p-2">
        <div className="font-text text-lh-dark text-xl">{comment.content}</div>
        <div className="my-3 text-gray-500 text-right">
          <Moment format={FORMAT_DATE}>{new Date(comment.created_at)}</Moment>
        </div>
      </div>
    </div>
  );
}
