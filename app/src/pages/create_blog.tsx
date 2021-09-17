import React from "react";
import { useSelector, useDispatch } from "react-redux";
import CardHoriz from "../components/cards/CardHoriz";
import CreateForm from "../components/cards/CreateForm";
import NotFound from "../components/Global/NotFound";
import { RootStore, IBlog } from "../utils/TypeScript";

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

  const { auth, categories } = useSelector((state: RootStore) => state);

  const dispatch = useDispatch();

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
    </div>
  );
};

export default Create_blog;
