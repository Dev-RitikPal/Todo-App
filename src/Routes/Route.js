import { React, useState, useEffect } from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import { onAuthStateChanged } from "@firebase/auth";
import { useSelector } from "react-redux";
// import { Routes, Route } from "react-router-dom";
import { Routes, Route } from "react-router-dom";

import { auth } from "../Firebase";
import {
  Dashboard,
  Login,
  Signup,
  TodoTasks,
  Portfolio,
  Blog,
  CreateBlog,
  Showblogs,
  Profile,
  TypingTest,
} from "../Screens";
import { PrivateRoute } from "./PrivateRoute";
import { PublicRoute } from "./PublicRoutes";
import { loading } from "../Assets";

export const AllRoutes = (props) => {
  const publicroutes = [
    { path: "/", component: Portfolio },
    { path: "/signup", component: Signup },
    { path: "/login", component: Login },
  ];

  const userData = useSelector((state) => state?.getMongodata);

  const [user, setUser] = useState(userData);
  console.log("🚀 ~ file: Route.js ~ line 35 ~ AllRoutes ~ user", user)
  const [loader, setloader] = useState(false);

  const privateroutes = [
    { path: "/", component: <Dashboard /> },
    {
      path: "/Portfolio/:Ritik-PAl",
      component: <Portfolio />,
    },
    { path: "/test-typing", component: <TypingTest /> },
    { path: "/todo-app", component: <TodoTasks /> },
    { path: "/blogs", component: <Blog /> },
    { path: "/createblog", component: <CreateBlog /> },
    { path: "/blogs/:Blogdetail", component: <Showblogs /> },
    { path: "/Profile", component: <Profile /> },
    { path: "/", component: <Portfolio/> },
    { path: "/signup", component: <Signup/> },
    { path: "/login", component: <Login/> },
  ];

  useEffect(() => {
    handleauth();
  }, []);

  const handleauth = () => {
    if (userData?.data?.user) {
      setUser(true);
      setloader(false);
    }
    // onAuthStateChanged(auth, user => {
    //   if (user) setUser(user);
    //     setloader(false)
    // })
  };

  return (
    <Router>
      {/* // {loader ? (
        //   <center>
        //     <img className="loadinggif" src={loading} alt="Loading" />
        //   </center>
        // ) : ( */}
      <Routes>
        {privateroutes.map((value, index) => (
          <Route
            exact
            path={value.path}
            key={index}
            element={value.component}
          />
        ))}
         {/* {publicroutes.map((value, index) => (
          <PublicRoute
            exact
            path={value.path}
            key={index}
            user={user}
            element={value.component}
          />
        ))} */}
      </Routes>
    </Router>
  );
};
// PublicRoute