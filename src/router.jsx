import React from "react";
import "./style/App.scss";
import NotFound from "./pages/NotFound";
import history from "./router/history";
import ShoppingMall from "./pages/ShoppingMall";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CategoryList from "./pages/CategoryList";
import { Router, Route, Switch } from "react-router-dom";

class IRouter extends React.Component {
  render() {
    return (
      <div className="App">
        <Router history={history}>
          <Switch>
            <Route exact path="/" component={ShoppingMall} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/categoryList" component={CategoryList} />
            <Route path="/*" component={NotFound} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default IRouter;
