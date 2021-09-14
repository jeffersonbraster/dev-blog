import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useDispatch } from "react-redux";

import PageRender from "./PageRender";
import Header from "./components/Global/Header";
import Footer from "./components/Global/Footer";

import { Alert } from "./components/alert/Alert";

import { refresh_token } from "./redux/actions/authAction";
import { getCategories } from "./redux/actions/categoryAction";

const App = () => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(refresh_token());
    dispatch(getCategories());
  }, [dispatch]);

  return (
    <div className="container">
      <Router>
        <Header />
        <Alert />

        <Switch>
          <Route exact path="/" component={PageRender} />
          <Route exact path="/:page" component={PageRender} />
          <Route exact path="/:page/:slug" component={PageRender} />
        </Switch>
        <Footer />
      </Router>
    </div>
  );
};

export default App;
