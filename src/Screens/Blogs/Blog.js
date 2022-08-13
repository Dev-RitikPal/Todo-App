import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
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

export const Blog = () => {
  const dispatch = useDispatch();
  const history = useNavigate();
  const blogdata = useSelector((state) => state?.blogs);

  const [loader, setloader] = useState(false);

  useEffect(() => {
    blogdetails();
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

  const handledeletingblog = async (blogid) => {
    setloader(true);
    try {
      await HandleDeletingBlog(blogid);
      blogdetails();
      toast.success("Bog deleted");
      setloader(false);
    } catch (error) {
      console.log(error.message);
    }
    setloader(false);
  };

  return (
    <div>
      <Navbaar />
      {/* <br /> */}

      <div className="blog-main-div ">
        <button type="button" className="btn add-btn mt-3 btn-primary">
          <i className="fas fa-plus"></i>&nbsp;
          <span
            onClick={RedirectToCreatePage}
            style={{ textDecoration: "none", color: "white" }}
          >
            Create Blog
          </span>
        </button>
        <br />
        <br />

        {blogdata[0]
          ? blogdata.map((item, index) => <BlogCard item={item} />)
          : null}
      </div>

      {/* {loader ? <center><img src={loading} className="loadinggif" style={{marginLeft:"25%"}} /></center> :
                <div className='d-flex mx-5 my-5  ' >
                                        {blogdata[0] ? blogdata.map((item,index) => (
                    <Card sx={{ maxWidth: 500 }} className='mx-5 my-5 ' >
                    <CardMedia
                      component="img"
                      alt="green iguana"
                      height="140"
                      image={item?.image}
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                      <span dangerouslySetInnerHTML={{__html:item?.Blogdetail}} style={{marginTop:"-15px"}}/>
                      {item.Title.charAt(0)?.toUpperCase() + item?.Title?.slice(1,50)+"."}

                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button size="small">Share</Button>
                      <Button size="small" onClick={()=>dispatch(getBlogid(item?.blogid))}><Link to={`/blogs/${item?.Title?.replace(/ /g,"-")}`}>Learn More</Link></Button>
                    </CardActions>
                  </Card> )) : <h1> No blogs available !! </h1> }
                  </div>
                    
                     } */}
    </div>
  );
};
// {/* <div className='container w-100 mt-5'  style={{overflowY: "scroll",maxHeight:"600px"}}>
//                         {blogdata[0] ? blogdata.map((item,index) => (
//                         <div className="card mt-2 mb-1 " key={index} onClick={()=>dispatch(getBlogid(item?.blogid))} >
//                             <div className="card-header">
//                                <span style={{float:"left"}}><strong>Title : </strong>{item.Title.charAt(0)?.toUpperCase() + item?.Title?.slice(1,50)+"."}</span>
//                             {auth.currentUser.uid == item.uid ? <button className="btn btn-sm btn-danger px-2 mx-1 py-1" onClick={()=>handledeletingblog(item?.blogid)} title='Blog created by you will delete only' ><i className="fas fa-trash-alt"></i></button> : null}
//                             </div>
//                             <Link to={`/blogs/${item?.Title?.replace(/ /g,"-")}`}>
//                                <span style={{float:"right",fontSize:"10px",color:"black" }}><strong>Created : </strong>{item.date}</span>
//                                 <div className="card-body">
//                                     <div className='blogtitle'>
//                                     <span dangerouslySetInnerHTML={{__html:item?.Blogdetail}} style={{marginTop:"-15px"}}/>
//                                     </div>
//                                     <br/>
//                                     </div>
//                             </Link>
//                         </div>)) : <h1> No blogs available !! </h1> }
//                     </div>  */}
