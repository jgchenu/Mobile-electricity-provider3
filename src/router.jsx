import React from "react";
import "./style/App.scss";
import NotFound from "./pages/NotFound";
import history from "./router/history";
import ShoppingMall from "./pages/ShoppingMall";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CategoryList from "./pages/CategoryList";
import Goods from "./pages/Goods";
import Cart from "./pages/Cart";
import { Router, Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
class IRouter extends React.Component {
  render() {
    return <div className="App">
        <Router history={history}>
          <Route path="/" render={() => <Home>
                <Switch>
                  <Route exact path="/" component={ShoppingMall} />
                  <Route path="/login" component={Login} />
                  <Route path="/register" component={Register} />
                  <Route path="/categoryList" component={CategoryList} />
                  <Route path="/goods/:goodId" component={Goods} />
                  <Route path="/cart" component={Cart} />
                  <Route path="/*" component={NotFound} />
                </Switch>
              </Home>} />
        </Router>
      </div>;
  }
}

export default IRouter;
