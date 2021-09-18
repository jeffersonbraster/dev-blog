import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { createBlog } from "../redux/actions/blogAction";
import CardHoriz from "../components/cards/CardHoriz";
import CreateForm from "../components/cards/CreateForm";
import Quill from "../components/editor/Quill";
import NotFound from "../components/Global/NotFound";
import { RootStore, IBlog } from "../utils/TypeScript";
import { validCreateBlog } from "../utils/Valid";
import { ALERT } from "../redux/types/alertType";

const Create_blog = () => {
  const initState = {
    user: "",
    title: "",
    content: "",
    description: "",
    thumbnail: "",
    category: "",
    createdAt: new Date().toISOString(),
  };

  const [blog, setBlog] = React.useState<IBlog>(initState);
  const [body, setBody] = React.useState("");

  const divRef = React.useRef<HTMLDivElement>(null);
  const [text, setText] = React.useState("");

  const { auth } = useSelector((state: RootStore) => state);

  const dispatch = useDispatch();

  React.useEffect(() => {
    const div = divRef.current;
    if (!div) return;

    const text = div?.innerText as string;
    setText(text);
  }, [body]);

  const handleSubmit = async () => {
    if (!auth.access_token) return;

    const check = validCreateBlog({ ...blog, content: text });
    if (check.errLength !== 0) {
      return dispatch({ type: ALERT, payload: { errors: check.errMsg } });
    }

    let newData = { ...blog, content: body };

    dispatch(createBlog(newData, auth.access_token));
  };

  if (!auth.access_token) return <NotFound />;
  return (
    <div className="my-4 create_blog">
      <h2>Create Blog</h2>

      <div className="row mt-4">
        <div className="col-md-6">
          <h5>Criar</h5>
          <CreateForm blog={blog} setBlog={setBlog} />
        </div>
        <div className="col-md-6">
          <h5>Preview</h5>
          <CardHoriz blog={blog} />
        </div>
      </div>

      <Quill setBody={setBody} />

      <div
        ref={divRef}
        dangerouslySetInnerHTML={{
          __html: body,
        }}
        style={{ display: "none" }}
      />

      <small>{text.length}</small>

      <button
        className="btn btn-dark mt-3 d-block mx-auto"
        onClick={handleSubmit}
      >
        Criar post
      </button>
    </div>
  );
};

export default Create_blog;
