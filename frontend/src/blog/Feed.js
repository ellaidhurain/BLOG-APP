import React from "react";
import { Box } from "@mui/material";
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

export const Feed = ({userName}) => {
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

  const [user, setUser] = useState([
    { title: "", description: "", user: "", image: "" },
  ]);
  const [liked, setLiked] = useState(true);
  const [comments, setComments] = useState(false);

  //get all blogs
  const getAllBlogsRequest = async () => {
    const res = await axios
      .get("http://localhost:5000/api/blog/getAllBlogs", {
        withCredentials: true,
      })
      .catch((err) => console.log(err));

    const blogs = await res.data; //get res data and store in variable called data
    return blogs; //output the result
  };

  useEffect(() => {
    getAllBlogsRequest().then((data) => setUser(data.blogs));

    let interval = setInterval(() => {
      refreshToken().then((data) => setUser(data.data));
    }, 100000 * 29);
    return () => clearInterval(interval);
  }, []);

  const date = new Date();
  const timestamp = date.toDateString();

  const handleComments = () => {
    setComments(!comments);
  };

  return (
    <>
    <UserBlogs/>
    
      {user.map((data) => (
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
                    {data.user.Name ? data.user.Name.charAt(0) : ""}
                </Avatar>
              }
              action={
                <IconButton aria-label="settings">
                  <MoreVertIcon />
                </IconButton>
              }
              title={data.user.Name}
              subheader={timestamp}
            />

            <CardMedia
              component="img"
              height="300"
              image={data.image}
              alt="Paella dish"
            />
      
            <CardContent onClick={handleComments}>
              <Typography variant="body2" color="text.primary">
                <h3>{data.title}</h3>
                {data.description}
              </Typography>
            </CardContent>
            <CardActions disableSpacing className="d-flex justify-content-end">
              <IconButton aria-label="add to favorites">
                <Checkbox
                  icon={<FavoriteBorder />}
                  checkedIcon={<Favorite sx={{ color: "red" }} />}
                />
              </IconButton>
              <Box style={{ fontSize: "15px" }}>100 likes</Box>
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
      ))}
    </>
  );
};
