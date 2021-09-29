import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { getBlogsByUserId } from "../../redux/actions/blogAction";
import CardHorinz from "../cards/CardHoriz";
import Pagination from "../Global/Pagination";

import { IParams, RootStore, IBlog } from "../../utils/TypeScript";
import Loading from "../alert/Loading";

const UserBlogs = () => {
  const { blogsUser } = useSelector((state: RootStore) => state);
  const dispatch = useDispatch();
  const user_id = useParams<IParams>().slug;

  const [blogs, setBlogs] = React.useState<IBlog[]>();
  const [total, setTotal] = React.useState(0);

  const history = useHistory();
  const { search } = history.location;

  React.useEffect(() => {
    if (!user_id) return;

    if (blogsUser.every((item) => item.id !== user_id)) {
      dispatch(getBlogsByUserId(user_id, search));
    } else {
      const data = blogsUser.find((item) => item.id === user_id);
      if (!data) return;

      setBlogs(data.blogs);
      setTotal(data.total);

      if (data.search) history.push(data.search);
    }
  }, [user_id, dispatch, blogsUser, search, history]);

  const handlePagination = (num: number) => {
    const search = `?page=${num}`;

    dispatch(getBlogsByUserId(user_id, search));
  };

  if (!blogs) return <Loading />;

  if (blogs.length === 0) return <h3 className="text-center">Sem blogs</h3>;

  return (
    <div>
      <div>
        {blogs.map((blog) => (
          <CardHorinz key={blog._id} blog={blog} />
        ))}
      </div>

      <div>
        {total > 1 && <Pagination total={total} callback={handlePagination} />}
      </div>
    </div>
  );
};

export default UserBlogs;
