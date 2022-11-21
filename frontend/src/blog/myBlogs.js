import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box, ButtonGroup, Fab, IconButton, Modal, Stack, TextField, Tooltip } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { toast } from "react-toastify";
import styled from "@emotion/styled";
import { Feed } from "./Feed";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import ShareIcon from "@mui/icons-material/Share";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import Checkbox from "@mui/material/Checkbox";
import CommentIcon from "@mui/icons-material/Comment";
import Comments from "./Comments";
import { Link, useNavigate, useParams } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import { Button } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import VideoChatIcon from "@mui/icons-material/VideoChat";
import AudioFileIcon from "@mui/icons-material/AudioFile";
import ImageIcon from "@mui/icons-material/Image";
import InsertInvitationIcon from "@mui/icons-material/InsertInvitation";


const StyledModel = styled(Modal)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

const UserBox = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: "10px",
  marginBottom: "15px",
  marginLeft: "10px",
}));

export const UserBlogs = (props) => {

  const [userData, setUserData] = useState([]);
  const id = localStorage.getItem("userId");

  const getOneUserRequest = async () => {
    const res = await axios
      .get(`http://localhost:5000/api/blog/getOneUser/${id}`)
      .catch((err) => console.log(err));
    const data = await res.data;
    return data;
  };

  useEffect(() => {
    getOneUserRequest().then((data) => setUserData(data.user));
   
  }, []);


  return (

    <div>
      {" "}
      {userData &&
        userData.blogs &&
        userData.blogs.map((blog, index) => (
          <>
            <MyBlogs
              blogId={blog._id}
              key={index}
              title={blog.title}
              description={blog.description}
              imageURL={blog.image}
              userName={userData.Name}
             
            />
          </>
        ))}
    </div>
  );
};

export default function MyBlogs({

  blogId,
  title,
  description,
  imageURL,
  userName,

 
}) {
  const navigate = useNavigate();
  const id = useParams().blogId;

  const [inputs, setInputs] = useState({});
  const [liked, setLiked] = useState(false);
  const [comments, setComments] = useState(false);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    setInputs({
      title: title,
      description: description,
      image: imageURL,
    });
  }, [id]);



  const updateRequest = async () => {
    const res = await axios
      .put(`http://localhost:5000/api/blog/updateOneBlog/${blogId}`, {
        title: inputs.title,
        description: inputs.description,
        image: inputs.image,
      })
      .catch((err) => console.log(err));
    
    const data = res.data;
    return data;
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    updateRequest().then((data) => {
      toast.success("succesfully updated");  
      handleClose();
    });
  };

  const deleteRequest = async () => {
    //save api response in variable called res
   const res = await axios
      .delete(`http://localhost:5000/api/blog/deleteOneBlog/${blogId}`, {
        withCredentials: true,
      })
      .catch((err) => console.log(err));
      const data = res.data;
      return data;
  };


  
  const handleDelete = () => {
    deleteRequest()
  
      .then(() => {
        toast.success("successfully deleted");
        setInputs({...inputs})
        navigate('/home')
      });
  };

  const onChangeHandle = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
    e.preventDefault();
  };

  const date = new Date();
  const timestamp = date.toDateString();

  const increase = () =>{
    setLiked(!liked);
  }

  const handleComments = () => {
    setComments(!comments);
  };


  return (
    <>
      <div>

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
                  {userName ? userName.charAt(0) : ""}
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
              <Box>

                <IconButton aria-label="delete" sx={{ marginLeft: "10px" }}>
                  <EditIcon
                  onClick={handleOpen}
                  />
                </IconButton>
                <IconButton aria-label="delete" sx={{ marginLeft: "10px" }}>
                  <DeleteIcon onClick={handleDelete} />
                </IconButton>
              </Box>
            </CardActions>
            {comments && <Comments />}
          </Card>
        </Box>
    
      </div>
      <>

      <div>
        <StyledModel
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box
            width={700}
            height={600}
            bgcolor={"background.default"}
            color={"text.primary"}
            p={2}
            borderRadius={5}
          >
            <Typography variant="h6" color="grey" textAlign="center">
              Create Post
            </Typography>
            <UserBox className="d-flex">
              <Avatar alt="Remy Sharp" src="/static/use2.png" />
              <Typography variant="h6" ent>
                ellai
              </Typography>
            </UserBox>
            <TextField
              name="title"
              sx={{ width: "100%", pt: 5 }}
              id="standard-multiline-static"
              rows={4}
              label="title"
              variant="standard"
              onChange={onChangeHandle}
              value={inputs.title}
            />

            <TextField
              name="description"
              sx={{ width: "100%", pt: 5, mt: 2, mb: 3 }}
              id="standard-multiline-static"
              onChange={onChangeHandle}
              rows={4}
              label="description"
              variant="standard"
              value={inputs.description}
              multiline
            />

            <TextField
              name="image"
              sx={{ width: "100%", pt: 5 }}
              id="standard-multiline-static"
              rows={4}
              label="imageURL"
              placeholder="paste image url here"
              variant="standard"
              onChange={onChangeHandle}
              value={inputs.image}
            />
            <Stack direction="row" gap={1} mt={2} mb={3}>
              <InsertEmoticonIcon color="success" />
              <VideoChatIcon color="secondary" />
              <AudioFileIcon color="success" />
              <ImageIcon color="error" />
            </Stack>

            <ButtonGroup
              fullWidth
              variant="contained"
              aria-label="outlined primary button group"
            >
              <Button onClick={handleUpdate}>Post</Button>
              <Button sx={{ width: "100px" }}>
              
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="Basic example"
                    // value={value}
                    onChange={(newValue) => {
                      // setValue(newValue);
                    }}
                    renderInput={(params) =>   <InsertInvitationIcon {...params}/>}
                  />
                </LocalizationProvider>
              </Button>
            </ButtonGroup>
          </Box>
        </StyledModel>
  
      </div>
      </>
    </>
  );
}

