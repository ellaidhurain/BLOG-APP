import React, { Fragment } from "react";
import { Box, Button } from "@mui/material";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import ShareIcon from "@mui/icons-material/Share";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import Checkbox from "@mui/material/Checkbox";
import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import CommentIcon from "@mui/icons-material/Comment";
import Comments from "./Comments";
import styled from "@emotion/styled";
import MyBlogs, { UserBlogs } from "./myBlogs";
import { useNavigate } from "react-router-dom";
import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles({
  font: {
    fontFamily: "Roboto !important",
  },
});


export const Feed = (props) => {
  const classes = useStyles();
  const navigate = useNavigate();


  const refreshToken = async () => {
    const res = await axios
      .get("http://localhost:5000/api/blog/refresh", {
        withCredentials: true,
      })
      .catch((err) => console.log(err));

    const data = await res.data;
    return data;
  };

  const [blogs, setBlogs] = useState([
    { title: "", description: "", user: "", image: "" },
  ]);

  //get all blogs
  const getAllBlogsRequest = async () => {
    const res = await axios
      .get("http://localhost:5000/api/blog/getAllBlogs", {
        withCredentials: true,
      })
      .catch((err) => console.log(err));

    const blogs = await res.data; //get res data and store in variable called blogs
    return blogs;
  };

  //useEffect is used for fetching data, directly updating the DOM, and timers.
  useEffect(() => {
    //call the function to fetch data from server and save data in blogs array
    getAllBlogsRequest().then((data) => setBlogs(data.blogs));

    //set interval for update token
    let interval = setInterval(() => {
      refreshToken().then((data) => setBlogs(data.blogs));
    }, 100000 * 29);
    return () => clearInterval(interval);
  }, []);



  // store server data in local storage
  // useEffect(()=>{
  // pass key and value to setItem
  // localStorage.setItem("data",JSON.stringify(blogs))
  // },[blogs])



  return(
    <div>
      {blogs.map((blog, index)=>(

      <Allblogs 
      title={blog.title}
      description={blog.description}
      imageURL={blog.image}
      userName={blog.Name}
      />

      ))}
    </div>
  )
}
  const Allblogs = ({  
    title,
    description,
    imageURL,
    userName
  }) =>{

      const [liked, setLiked] = useState(false);
      const [comments, setComments] = useState(false);
      const date = new Date();
      const timestamp = date.toDateString();
    
      const increase = () => {
        setLiked(!liked);
      };
    
      const handleComments = () => {
        setComments(!comments);
      };
  return (
    <>
      <UserBlogs />

         <Box flex={4} p={2}>
          <Card
            sx={{
              marginBottom: 2,
              borderRadius: "15px",
              boxShadow: " rgba(149, 157, 165, 0.2) 0px 8px 24px;",
            }}
          >
            <CardHeader
              avatar={
                <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                  {/* {data.user.Name ? data.user.Name.charAt(0) : ""} */}
                </Avatar>
              }
              action={
                <IconButton aria-label="settings">
                  <MoreVertIcon />
                </IconButton>
              }
              title={userName}
              subheader={timestamp}
            />

            <CardMedia
              component="img"
              height="300"
              image={imageURL}
              alt="Paella dish"
            />

            <CardContent onClick={handleComments}>
              <Typography variant="body2" color="text.primary">
                <h3>{title}</h3>
                {description}
              </Typography>
            </CardContent>
            <CardActions disableSpacing className="d-flex justify-content-end">
              <IconButton aria-label="add to favorites">
                <Checkbox
                  onClick={increase}
                  icon={<FavoriteBorder />}
                  checkedIcon={<Favorite sx={{ color: "red" }} />}
                />
              </IconButton>
              {liked && "Liked"}

              <IconButton
                aria-label="delete"
                sx={{ marginLeft: "10px" }}
                onClick={handleComments}
              >
                <CommentIcon />
              </IconButton>
              <Box style={{ fontSize: "15px" }} pr={3}>
                10 comments
              </Box>
              <IconButton aria-label="share">
                <ShareIcon />
              </IconButton>
            </CardActions>
            {comments && <Comments />}
          </Card>
        </Box>
      
    </>
  );
};
