import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Home from "./pages/Home";
import Posts from "./pages/Posts";

import './global.css';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/postagem">
          <Posts />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
