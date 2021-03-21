import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./App.css";
import Posts from "./components/posts";
import Favorite from "./components/favorite";

function App() {
  return (
    <Router>
      <div className="App">
        <div className="heading">
          <span>
            <Link to="/">Posts</Link>
          </span>
          |
          <span>
            <Link to="/favpost">Favorite Post</Link>
          </span>
        </div>
        <Switch>
          <Route
            exact
            activeClassName="active"
            path="/favpost"
            component={Favorite}
          ></Route>
          <Route
            exact
            activeClassName="active"
            path="/"
            component={Posts}
          ></Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
