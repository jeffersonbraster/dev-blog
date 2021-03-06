import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { IBlog, RootStore, IUser, IComment } from "../../utils/TypeScript";
import Comments from "../comments/Comments";
import Input from "../comments/Input";

interface Iprops {
  blog: IBlog;
}

const DisplayBlog: React.FC<Iprops> = ({ blog }) => {
  const { auth } = useSelector((state: RootStore) => state);
  const dispatch = useDispatch();

  const [showComments, setShowComments] = React.useState<IComment[]>([]);

  const handleComment = (body: string) => {
    if (!auth.user || !auth.access_token) return;

    const data = {
      content: body,
      user: auth.user,
      blog_id: blog._id as string,
      blog_user_id: (blog.user as IUser)._id,
      createdAt: new Date().toISOString(),
    };

    setShowComments([data, ...showComments]);
  };
  return (
    <div>
      <h2
        className="text-center my-3 text-capitalize fs-1"
        style={{ color: "#ff7a00" }}
      >
        {blog.title}
      </h2>

      <div className="text-end fst-italic" style={{ color: "teal" }}>
        <small>
          {typeof blog.user !== "string" && `By: ${blog.user.name}`}
        </small>

        <small className="ms-2">
          {new Date(blog.createdAt).toLocaleString()}
        </small>
      </div>

      <div dangerouslySetInnerHTML={{ __html: blog.content }} />

      <hr className="my-1" />

      <h3 style={{ color: "#ff7a00" }}>Comentários: </h3>
      {auth.user ? (
        <Input callback={handleComment} />
      ) : (
        <h5>
          Necessário fazer o <Link to={`/login?blog/${blog._id}`}>login</Link>{" "}
          para comentar.
        </h5>
      )}

      {showComments?.map((comment, index) => (
        <Comments key={index} comment={comment} />
      ))}
    </div>
  );
};

export default DisplayBlog;
