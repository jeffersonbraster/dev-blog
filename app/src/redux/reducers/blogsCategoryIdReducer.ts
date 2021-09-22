import {
  IGetBlogsCategoryType,
  IBlogsCategory,
  GET_BLOGS_BY_CATEGORY_ID,
} from "../types/blogType";

const blogCategoryIdReducer = (
  state: IBlogsCategory[] = [],
  action: IGetBlogsCategoryType
): IBlogsCategory[] => {
  switch (action.type) {
    case GET_BLOGS_BY_CATEGORY_ID:
      return [...state, action.payload];

    default:
      return state;
  }
};

export default blogCategoryIdReducer;
