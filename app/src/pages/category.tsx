import React from "react";
import { useSelector, useDispatch } from "react-redux";
import NotFound from "../components/Global/NotFound";
import {
  createCategory,
  updateCategory,
  deleteCategory,
} from "../redux/actions/categoryAction";
import { FormSubmit, RootStore, ICategory } from "../utils/TypeScript";

const Category = () => {
  const [name, setName] = React.useState("");
  const [edit, setEdit] = React.useState<ICategory | null>(null);

  const { auth, categories } = useSelector((state: RootStore) => state);
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (edit) setName(edit.name);
  }, [edit]);

  const handleSubmit = (e: FormSubmit) => {
    e.preventDefault();
    if (!auth.access_token || !name) return;

    if (edit) {
      if (edit.name === name) return;

      const data = { ...edit, name };
      dispatch(updateCategory(data, auth.access_token as string));
    } else {
      dispatch(createCategory(name, auth.access_token as string));
    }
    setEdit(null);
    setName("");
  };

  const handleDelete = (id: string) => {
    if (!auth.access_token) return;
    dispatch(deleteCategory(id, auth.access_token));
  };

  const clearEdit = () => {
    setName("");
    setEdit(null);
  };

  if (auth.user?.role !== "admin") return <NotFound />;

  return (
    <div className="category row">
      <form onSubmit={handleSubmit}>
        <label htmlFor="category">Categoria</label>

        <div className="d-flex align-items-center">
          {edit && (
            <i
              className="fas fa-times me-2 text-danger"
              onClick={() => clearEdit()}
              style={{ cursor: "pointer" }}
            />
          )}
          <input
            type="text"
            name="category"
            id="category"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <button type="submit">{edit ? "Atualizar" : "Criar"}</button>
        </div>
      </form>

      <div>
        {categories.map((category) => (
          <div className="category_row" key={category._id}>
            <p className="m-0 text-capitalize">{category.name}</p>

            <div>
              <i
                className="fas fa-edit mx-2"
                onClick={() => setEdit(category)}
              />
              <i
                className="fas fa-trash-alt mx-2"
                onClick={() => handleDelete(category._id)}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Category;
