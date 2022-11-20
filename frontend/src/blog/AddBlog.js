import React, { useState } from "react";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import { Box, TextField, Stack, ButtonGroup } from "@mui/material";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { styled } from "@mui/styles";
import Avatar from "@mui/material/Avatar";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import VideoChatIcon from "@mui/icons-material/VideoChat";
import AudioFileIcon from "@mui/icons-material/AudioFile";
import ImageIcon from "@mui/icons-material/Image";
import InsertInvitationIcon from "@mui/icons-material/InsertInvitation";
import { toast } from "react-toastify";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Dayjs } from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import axios from "axios";

axios.defaults.withCredentials = true;

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

export default function Add() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [post, setPost] = useState({
    title: "",
    description: "",
    image: "",
  });


  const onchangehandle = (e) => {
    setPost({
      ...post,
      [e.target.name]: e.target.value,
    });
    e.preventDefault();
  };

  const postBlogRequest = async () => {
    const res = await axios
      .post("http://localhost:5000/api/blog/addBlog", {
        title: post.title,
        description: post.description,
        image: post.image,
        user: localStorage.getItem("userId"),
      })
      .catch((err) => console.log(err));
    const data = await res.data;
    return data;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(post);
    postBlogRequest()
      .then((data) => console.log(data))
      .then(() => {
        toast.success("Blog added!");
        handleClose()
      });
  };

  // const [value, setValue] = React.useState<Dayjs | null>(null);
  return (
    <>
      <Tooltip
        title="Add Post"
        sx={{
          position: "fixed",
          bottom: 20,
          left: { xs: "calc(50%-25px)", md: 30 },
        }}
      >
        <IconButton>
          <Fab onClick={handleOpen} color="primary" aria-label="add">
            <AddIcon />
          </Fab>
        </IconButton>
      </Tooltip>
      <div>
        <StyledModel
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box
            width={600}
            height={550}
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
              onChange={onchangehandle}
              value={post.title}
            />

            <TextField
              name="description"
              sx={{ width: "100%", pt: 5, mt: 2, mb: 3 }}
              id="standard-multiline-static"
              onChange={onchangehandle}
              rows={4}
              label="description"
              variant="standard"
              value={post.description}
            />

            <TextField
              name="image"
              sx={{ width: "100%", pt: 5 }}
              id="standard-multiline-static"
              rows={4}
              label="imageURL"
              variant="standard"
              onChange={onchangehandle}
              // value={post.image}
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
              <Button onClick={handleSubmit}>Post</Button>
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
  );
}
