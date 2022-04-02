import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { toast } from "react-toastify";
// import RenderSmoothImage from 'render-smooth-image-react';
import "render-smooth-image-react/build/style.css";

import "./Blog.css";

import { Navbaar } from "../../Containers";
import { auth, GetBlogsData, HandleDeletingBlog } from "../../Firebase";
import { getBlogid, getBlogs } from "../../Redux/Action/Actions";
import { handleErrors } from "../../Utils";
import { loading } from "../../Assets";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { BlogCard } from "./BlogsCard";
import { IconButton } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";

export const Blog = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const blogdata = useSelector((state) => state?.blogs);

  const [showFavorite, setShowFavorite] = useState(false);
  const Favblog = useSelector((state) => state?.userData?.data?.favrouteblogs);
  const [Favorite, setFavorite] = useState(Favblog);

  useEffect(() => {
    blogdetails();
    setFavorite(Favblog)
  }, []);

  const blogdetails = async () => {
    try {
      const res = await GetBlogsData();
      if (res) {
        dispatch(getBlogs(res));
      }
    } catch (error) {
      toast.error(handleErrors(error.message));
    }
  };

  const RedirectToCreatePage = () => {
    dispatch(getBlogid(""));
    history.push("/createblog");
  };

  return (
    <div>
      <Navbaar />
      <div className="blog-main-div ">
        <button type="button" 
        className="btn add-btn mt-3 btn-primary" 
        onClick={RedirectToCreatePage}
        >
          <i className="fas fa-plus"></i>&nbsp;
            Create Blog
        </button>
        <button type="button" onClick={()=>setShowFavorite(showFavorite ? false : true)} style={{float:"left"}} className="btn add-btn ml-1 mt-3 btn-primary">
         {!showFavorite && <FavoriteIcon style={{color:"white"}} />}
         &nbsp;{showFavorite ? "Show all" : `Show favorite (${Favorite?.length || 0})`} 
        </button>
        <br />
        <br />
        <br />
        <hr style={{border: "0.5px solid", color:"aliceblue"}}/>
        {blogdata[0]
          ? blogdata.map((item, index) => showFavorite ? Favblog.includes(item?.blogid) && <BlogCard item={item} /> : <BlogCard item={item} />)
          : null}
      </div>
    </div>
  );
};
