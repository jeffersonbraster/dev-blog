import React from "react";
import AvatarComment from "./AvatarComent";
import CommentList from "./CommentList";
import { IComment } from "../../utils/TypeScript";

interface IProps {
  comment: IComment;
}

const Comments: React.FC<IProps> = ({ comment }) => {
  return (
    <div className="my-3 d-flex">
      <AvatarComment user={comment.user} />

      <CommentList comment={comment} />
    </div>
  );
};

export default Comments;
