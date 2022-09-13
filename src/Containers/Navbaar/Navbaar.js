import { React, useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";

import "./Navbaar.css";
import "react-toastify/dist/ReactToastify.css";

import {
  GetUserdata,
  getUserdata,
  UserLogout,
  userLogout,
} from "../../Firebase";
import { handleErrors } from "../../Utils";
import { GetUserData } from "../../Redux/Action/Actions";
import axios from "axios";
import { user } from "../../Redux/Reducers/authReducer";

export const Navbaar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const users = useSelector((state) => state);
  console.log("🚀 ~ file: Navbaar.js ~ line 24 ~ Navbaar ~ users", users)
  const [displayNone, setDisplayNone] = useState("");
  const userId = localStorage.getItem("authTokan");

  useEffect(() => {
    getuserdata();
  }, []);

  const getuserdata = async () => {
    try {
      const data = {
        headers: {
          authId: userId,
        },
      };
      const res = await axios.get(`http://localhost:3003/getUserData`, data);
      if (res?.data?.name) {
        dispatch(user(res?.data));
      } else if (res?.data?.err) {
        toast.error("Session expired, please login again");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogout = async () => {
    try {
      const userId = localStorage.getItem("authTokan");
      const res = await axios.delete(
        `http://localhost:3003/logOutUser/${userId}`
      );
      console.log(
        "🚀 ~ file: Navbaar.js ~ line 43 ~ handleLogout ~ res",
        res.data.msg
      );
      if (res.data.msg) {
        localStorage.removeItem("authTokan");
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark w-100">
        {/* <span className="navbar-brand text-white  "> */}

        {/* </span> */}
        <button
          className="navbar-toggler mx-2"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          onClick={() => setDisplayNone(displayNone == "" ? "d-none" : "")}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon text-white "></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            {/* <li className="nav-item ">
                            <span className="nav-link"><Link className="menu-tabs" to="/dashboard">Dashboard</Link></span>
                        </li> */}
            <li className="nav-item">
              <span className="nav-link" title="Portfolio@Ritik">
                <Link
                  className="menu-tabs mx-3"
                  to={`/portfolio/${"Ritik-Pal"}`}
                >
                  Portfolio
                </Link>
              </span>
            </li>
            <li className="nav-item">
              <span className="nav-link" title="Todo app">
                <Link className="menu-tabs mx-3" to="/todo-app">
                  Todo app
                </Link>
              </span>
            </li>
            <li className="nav-item">
              <span className="nav-link" title="Todo app">
                <Link className="menu-tabs mx-3" to="/blogs">
                  Blogs
                </Link>
              </span>
            </li>
            <li className="nav-item">
              <span className="nav-link" title="Typing test">
                <Link className="menu-tabs mx-3" to="/test-typing">
                  Typing test
                </Link>
              </span>
            </li>
          </ul>
        </div>
        <div className="mx-3">
          <span
            id="imageDropdown"
            className={displayNone}
            data-toggle="dropdown"
          >
            <img
              src={
                user?.profileimage
                  ? user?.profileimage
                  : "https://img.icons8.com/officel/50/000000/test-account.png"
              }
              className="mx-3 profile-photo"
              alt="profile"
              title="Profile"
            />
          </span>
          <ul
            className="dropdown-menu show-profile-dropdown"
            role="menu"
            aria-labelledby="imageDropdown"
          >
            <li className="dropdown-text-username">HI,{user?.name} </li>
            <hr />
            <li
              role="presentation"
              className="dropdown-text"
              onClick={() => navigate.push("/profile")}
            >
              View Profile
            </li>
            <li
              role="presentation"
              className="dropdown-text"
              onClick={handleLogout}
            >
              Logout
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};
