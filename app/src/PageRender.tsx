import React from "react";
import { useParams } from "react-router-dom";
import NotFound from "./components/Global/NotFound";
import { IParams } from "./utils/TypeScript";

const generatePage = (name: string) => {
  const component = () => require(`./pages/${name}`).default;

  try {
    return React.createElement(component());
  } catch (err) {
    return <NotFound />;
  }
};

const PageRender = () => {
  const { page, slug }: IParams = useParams();

  let name = "";
  if (page) {
    name = slug ? `${page}/[slug]` : `${page}`;
  }

  return generatePage(name);
};

export default PageRender;