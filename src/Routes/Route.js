import { React, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import { Navigate } from "react-router-dom";

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

export const AllRoutes = (props) => {
  const userID = localStorage.getItem("authTokan");
  // const userID = useSelector((state)=>state?.getMongodata?.user?._id)
  const privateroutes = [
    { path: "/", component: <Dashboard /> },
    {
      path: "/Portfolio/:Ritik-PAl",
      component: <Portfolio />,
    },
    {
      path: "/test-typing",
      component: !userID ? <Navigate replace to="/" /> : <TypingTest />,
    },
    {
      path: "/todo-app",
      component: !userID ? <Navigate replace to="/" /> : <TodoTasks />,
    },
    {
      path: "/blogs",
      component: !userID ? <Navigate replace to="/" /> : <Blog />,
    },
    {
      path: "/createblog",
      component: !userID ? <Navigate replace to="/" /> : <CreateBlog />,
    },
    {
      path: "/blogs/:Blogdetail",
      component: !userID ? <Navigate replace to="/" /> : <Showblogs />,
    },
    {
      path: "/Profile",
      component: !userID ? <Navigate replace to="/" /> : <Profile />,
    },
    {
      path: "/Portfolio",
      component: !userID ? <Navigate replace to="/" /> : <Portfolio />,
    },
    {
      path: "/signup",
      component: userID ? <Navigate replace to="/" /> : <Signup />,
    },
    {
      path: "/login",
      component: userID ? <Navigate replace to="/" /> : <Login />,
    },
  ];

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
      </Routes>
    </Router>
  );
};
