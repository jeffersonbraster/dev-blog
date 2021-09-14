import React from "react";
import { useSelector, useDispatch } from "react-redux";
import NotFound from "../components/Global/NotFound";
import { createCategory } from "../redux/actions/categoryAction";
import { FormSubmit, RootStore } from "../utils/TypeScript";

const Category = () => {
  const [name, setName] = React.useState("");

  const { auth, categories } = useSelector((state: RootStore) => state);
  const dispatch = useDispatch();

  const handleSubmit = (e: FormSubmit) => {
    e.preventDefault();
    if (!auth.access_token || !name) return;

    dispatch(createCategory(name, auth.access_token as string));

    setName("");
  };

  if (auth.user?.role !== "admin") return <NotFound />;

  return (
    <div className="category row">
      <form onSubmit={handleSubmit}>
        <label htmlFor="category">Categoria</label>

        <div className="d-flex">
          <input
            type="text"
            name="category"
            id="category"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <button type="submit">Criar</button>
        </div>
      </form>

      <div>
        {categories.map((category) => (
          <div className="category_row" key={category._id}>
            <p className="m-0 text-capitalize">{category.name}</p>

            <div>
              <i className="fas fa-edit mx-2" />
              <i className="fas fa-trash-alt mx-2" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Category;
