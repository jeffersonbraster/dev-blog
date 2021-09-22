import React from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootStore, IParams, IBlog } from "../../utils/TypeScript";
import { getBlogsByCategoryId } from "../../redux/actions/blogAction";
import NotFound from "../../components/Global/NotFound";
import CardVert from "../../components/cards/CardVert";

const BlogsByCategory = () => {
  const { categories, blogsCategory } = useSelector(
    (state: RootStore) => state
  );
  const dispatch = useDispatch();

  const { slug } = useParams<IParams>();

  const [categoryId, setCategoryId] = React.useState("");
  const [blogs, setBlogs] = React.useState<IBlog[]>();
  const [total, setTotal] = React.useState(0);

  React.useEffect(() => {
    const category = categories.find((item) => item.name === slug);

    if (category) setCategoryId(category._id);
  }, [slug, categories]);

  React.useEffect(() => {
    if (!categoryId) return;

    if (blogsCategory.every((item) => item.id !== categoryId)) {
      dispatch(getBlogsByCategoryId(categoryId));
    } else {
      const data = blogsCategory.find((item) => item.id === categoryId);
      if (!data) return;

      setBlogs(data.blogs);
      setTotal(data.total);
    }
  }, [categoryId, dispatch, blogsCategory]);

  if (!blogs) return <NotFound />;
  return (
    <div className="blogs_category">
      <div className="show_blogs">
        {blogs?.map((blog) => (
          <CardVert key={blog._id} blog={blog} />
        ))}
      </div>
    </div>
  );
};

export default BlogsByCategory;
