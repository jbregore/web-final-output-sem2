import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import Post from "./pages/Post";

import firebase from "./utils/firebase";

import PrivateRoute from "./routers/PrivateRoute";
import PublicRoute from "./routers/PublicRoute";


export default function App() {
  const [values, setValues] = useState({
    isAuthenticated: false,
    isLoading: true,
  });

  useEffect(() => {
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        setValues({ isAuthenticated: true, isLoading: false });
      } else {
        setValues({ isAuthenticated: false, isLoading: false });
      }
      console.log(user);
    });
  }, []);

  if (values.isLoading) {
    return <p>LOADING...</p>;
  }

  return (
    <div>
      <Router>
        <Switch>
          <Route path="/" exact>
            <Redirect to="/login" />
          </Route>

          <PublicRoute 
            component={Login}
            path="/login"
            isAuthenticated={values.isAuthenticated}
            restricted={true}
          />

          <PublicRoute 
            component={Signup}
            path="/signup" 
            isAuthenticated={values.isAuthenticated}
            restricted={true}
          />

          
          <PrivateRoute
            component={Home}
            isAuthenticated={values.isAuthenticated}
            path="/home"
          />

          <PrivateRoute
            component={Post}
            isAuthenticated={values.isAuthenticated}
            path="/post"
          />

          <PrivateRoute
            component={Profile}
            isAuthenticated={values.isAuthenticated}
            path="/profile"
          />


        </Switch>
      </Router>
    </div>
  );
}