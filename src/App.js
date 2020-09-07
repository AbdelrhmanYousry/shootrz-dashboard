import React from "react";
import "./App.css";
import {
  Route,
  BrowserRouter as Router,
  Switch,
  Redirect,
} from "react-router-dom";
import Login from "./pages/login";
import Events from "./pages/events";
import Home from "./pages/home";
import Header from "./containers/Header";
import { isLoggedIn } from "./utils/auth"
function PrivateRoute({ children, ...rest }) {
   
  return (
    <Route
      {...rest}
      render={({ location }) =>
        isLoggedIn() ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route>
            <Header />
            <PrivateRoute path="/events">
              <Events />
            </PrivateRoute>
            <PrivateRoute exact path="/">
              <Home />
            </PrivateRoute>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
