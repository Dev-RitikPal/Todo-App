import * as React from "react";

import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import DeleteIcon from "@mui/icons-material/Delete";
import ShareIcon from "@mui/icons-material/Share";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import moment from "moment";
import { auth, GetBlogsData, HandleAddingFavrioteBlog, HandleDeletingBlog } from "../../Firebase";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { getBlogs } from "../../Redux/Action/Actions";
import { toast } from "react-toastify";
import { handleErrors } from "../../Utils";

import "./Blog.css";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export const BlogCard = (props) => {
  // console.log(props.item);
  const [expanded, setExpanded] = React.useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const Favblog = useSelector((state) => state?.userData?.data?.favrouteblogs);
  const [showcolor, setshowcolor] = React.useState(Favblog?.includes(props?.item?.blogid));
  const [favrouteblogs, setfavrouteblogs] = React.useState(Favblog);

  const colors = [
    "red",
    "blue",
    "black",
    "green",
    "purple",
    "violet",
    "blueviolet",
    "royalblue",
    "slateblue",
    "mediumvioletred",
  ];

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  React.useEffect(() => {
    BlogDetails();
    setshowcolor(Favblog?.includes(props?.item?.blogid))
  }, []);

  const BlogDetails = async () => {
    try {
      const res = await GetBlogsData();
      if (res) {
        dispatch(getBlogs(res));
      }
    } catch (error) {
      toast.error(handleErrors(error.message));
    }
  };

  const HandleDeleteBlog = async (blogid) => {
    try {
      await HandleDeletingBlog(blogid);
      BlogDetails();
      setshowcolor(true)
      toast.success("Bog deleted");
      // setloader(false);
    } catch (error) {
      console.log(error.message);
    }
    // setloader(false);
  };

  const AddTofavorite = async (blogId) => {
    const isexits = favrouteblogs?.filter(item => item == blogId)
    const removefav = Favblog.filter((item)=> item !== blogId)
    console.log(removefav[0],"<=======")
    try {
      if (!removefav[0]) {
        await HandleAddingFavrioteBlog([...Favblog, blogId]);
        BlogDetails();
        toast.success("Added to favorities");
        setshowcolor(true)
      } else {
        await HandleAddingFavrioteBlog(removefav);
        setshowcolor(false)
        toast.info("Removed From favriote");
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <div className="card-div">
      <Card style={{ width: "", marginTop: "2%", backgroundColor: 'rgb(0 30 60)', color: "white", borderRadius: "9px" }} className="blogcard dark">
        <CardHeader
          avatar={
            <Avatar
              sx={{
                bgcolor: colors[Math.floor(Math.random() * colors.length) + 1],
              }}
              aria-label="recipe"
            >
              {props?.item?.Name?.charAt(0).toUpperCase()}
            </Avatar>
          }
          action={
            <IconButton
              aria-label="settings"
              onClick={() => HandleDeleteBlog(props?.item?.blogid)}
            >
              <span style={{ color: "white" }}>{auth.currentUser.uid == props?.item?.uid ? <DeleteIcon /> : null}</span>
            </IconButton>
          }
          title={
            props?.item?.Name.charAt(0)?.toUpperCase() +
            props?.item?.Name.slice(1)
          }
          subheader={<span style={{ color: "white" }}>{moment(props?.item?.date).format("ll") + " " + props?.item?.time}</span>}
        />
        <CardMedia
          component="img"
          height="194"
          image={props?.item.image}
          alt="Cover"
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary" fontSize="20px">
            <strong style={{ color: "white" }}>Title : </strong>{" "}
            <span dangerouslySetInnerHTML={{ __html: props?.item?.Title }} style={{ color: "white" }} />
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton aria-label="add to favorites" onClick={() => AddTofavorite(props?.item?.blogid)}>
            <FavoriteIcon style={{ color: showcolor ? "red" : "white" }} />
          </IconButton>
          <IconButton aria-label="share">
            <ShareIcon style={{ color: "white" }} />
          </IconButton>
          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
            >
            <ExpandMoreIcon style={{ color: "white" }} />
          </ExpandMore>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <center> <Typography paragraph>About this blog</Typography></center>
            <hr />
            <br /><br />
            <Typography paragraph>
              <span
                dangerouslySetInnerHTML={{ __html: props?.item?.Blogdetail }}
              />
            </Typography>
            <Typography>
              Set aside off of the heat to let rest for 10 minutes, and then
              serve.
            </Typography>
          </CardContent>
          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon style={{ color: "white" }} />
          </ExpandMore>
        </Collapse>
      </Card>
    </div>
  );
};
