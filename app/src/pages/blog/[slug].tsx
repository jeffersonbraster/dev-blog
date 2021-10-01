import React from "react";
import { useParams } from "react-router-dom";

import { IParams, IBlog } from "../../utils/TypeScript";
import { getAPI } from "../../utils/FetchData";
import Loading from "../../components/Global/Loading";
import { showErrMsg } from "../../components/alert/Alert";
import DisplayBlog from "../../components/blog/DisplayBlog";

const DetailBlog = () => {
  const id = useParams<IParams>().slug;

  const [blog, setBlog] = React.useState<IBlog>();
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");

  React.useEffect(() => {
    if (!id) return;

    setLoading(true);
    getAPI(`blog/${id}`)
      .then((res) => {
        setBlog(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.response.data.msg);
        setLoading(false);
      });

    return () => setBlog(undefined);
  }, [id]);

  if (loading) return <Loading />;

  return (
    <div className="my-4">
      {error && showErrMsg(error)}

      {blog && <DisplayBlog blog={blog} />}
    </div>
  );
};

export default DetailBlog;
