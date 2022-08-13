import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import './Blog.css'

import { Navbaar } from "../../Containers";
import { getBlogid, getBlogs } from "../../Redux";
import { GetBlogsData } from "../../Firebase";

export const Showblogs = () => {
  
  const dispatch = useDispatch()
  const history = useNavigate()
  const blogdata = useSelector((state) => state?.blogs);
  const blogidref = useSelector((state) => state?.blogid);
  const authorname = useSelector((state)=>state?.userData?.data.username);
  const validation = blogdata.filter((item)=>item.blogid === blogidref).map((item)=>item.Name === authorname)

  useEffect(() => {
    blogdetails()
  }, [])

  const blogdetails = async () => {
      try {
          const res = await GetBlogsData()
          if (res) {
              dispatch(getBlogs(res));
          }
      } catch (error) {
          console.log(error.message)
      }
  }

  const handleupdateingblog = (id) => {
      dispatch(getBlogid(id))
      history.push('/createblog')
  }

  return (
    <div>
        <Navbaar />
        <center>
            <h2 className="mt-2">Blog</h2>
          </center>
          <div className="border showblogmaindiv mt-5">
              {blogdata.filter((item)=>item.blogid === blogidref).map((item) =>
                <>
                  <div>
                      {validation[0] ? <span className="editblog" onClick={()=>handleupdateingblog(item.blogid)} ><i className="fas fa-edit"></i></span> : null}
                      <span className="date-content" ><strong>created : </strong>{item?.date}</span>
                      <span className="title-content"><strong>Writen by :</strong> {item?.Name?.charAt(0)?.toUpperCase() + item?.Name?.slice(1)}<br/><br/>
                      <span><strong>Title : </strong>{item?.Title?.charAt(0)?.toUpperCase() + item?.Title?.slice(1)}</span>
                      </span>
                  </div>   
                  <div className="blog-div">
                      <img src={item.image} style={{height:"50%", width:"75%"}} alt="CoverImage" />
                      <div dangerouslySetInnerHTML={{__html:item?.Blogdetail}}/>
                  </div> 
                </> 
             )}
        </div>
    </div>
  );
};
