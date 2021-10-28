import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

// screens
import Home from "../pages/Home";
import Detail from "../pages/Detail";

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/" exact>
        <Home />
      </Route>
      <Route path="/:id">
        <Detail />
      </Route>
    </Switch>
  </BrowserRouter>
);

export default App;
