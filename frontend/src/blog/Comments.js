import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import React from "react";
import Avatar from "@mui/material/Avatar";
import { Box } from "@mui/system";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { styled } from "@mui/styles";
import { addComment, deleteComment, updateComment } from "./slice/commentSlice";
import { createStyles, makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    field: {
      width: "100%",
      outline: "none",
      color: "#757575 !important",
      // boxShadow: "-9px 7px 17px #ddd",
      transition: ".6s ease-in-out",
      border: "none !important",
      borderRadius: "7px",
      "& .MuiInputBase-input": {},
      "& .MuiInput-underline": {
        "&::before": {
          display: "none",
        },
        "&::after": {
          display: "none",
        },
      },
      "& .MuiOutlinedInput-notchedOutline": {
        borderWidth: "0px",
      },
    },
  })
);

export default function Comments() {
  const classes = useStyles();

  //use dispatch is used to dispatch reducer and action from store
  const dispatch = useDispatch();

  //get userList object data from store/reducer and store in variable userList.
  const commentList = useSelector((state) => state.comments.value);

  const [comment, setComment] = useState("");
  const [edit, setEdit] = useState(false);

  const AddComment = () => {
    dispatch(
      addComment({
        id: commentList[commentList.length - 1].id + 1, //accessing last array and adding id in array
        name: commentList[0].name,
        message: comment,
        time: commentList[0].time,
        profilepic: commentList[0].profilepic,
      })
    );
  };

  const handleChange = (e) => {
    setComment(e.target.value);
  };

  const handleEdit = () => {
    setEdit(!edit);
  };

  return (
    <Box className="comments">
      <Box className="m-3 d-flex">
        <Avatar
          alt="Remy Sharp"
          src={commentList.map((data) => data.profilepic)}
          className="mx-2"
        />
        <TextField
          name="message"
          className="w-100 mb-2"
          placeholder="write a comment here..."
          value={commentList.message}
          onChange={handleChange}
        />
        <Button onClick={AddComment}>send</Button>
      </Box>
      {commentList.map((data) => (
        <>
          <Box
            className="d-flex align-items-center"
            sx={{ marginLeft: "20px" }}
            gap={1}
          >
            <Avatar alt="Remy Sharp" src={data.profilepic} />
            <Typography>{data.name}</Typography>
          </Box>
          <Box
            className="info d-flex justify-content-between mb-2"
            sx={{ paddingLeft: "40px" }}
          >
            <Box className={classes.field}>
              <TextField
                id="outlined-multiline-flexible"
                multiline
                fullWidth
                className="m-2 col-5"
                value={data.message}
              />
            </Box>
            <Box className="col-3">
              {edit && (
                <Button
                  onClick={() => {
                    dispatch(
                      updateComment({
                        id: data.id,
                        message: commentList.message,
                      })
                    );
                  }}
                >
                  save
                </Button>
              )}
              <IconButton aria-label="delete">
                <EditIcon onClick={handleEdit} />
              </IconButton>

              <IconButton>
                <DeleteIcon
                  onClick={() => {
                    dispatch(deleteComment({ id: data.id }));
                  }}
                />
              </IconButton>
            </Box>

            <Typography className="date col-1" color="text.secondary">
              {data.time}
            </Typography>
          </Box>
        </>
      ))}
    </Box>
  );
}
