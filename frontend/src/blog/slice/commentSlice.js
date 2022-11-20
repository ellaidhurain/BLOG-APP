import { createSlice } from "@reduxjs/toolkit";


const comments = [
    {
      id: 1,
      name: "martin",
      message:
        "This is the nice post of the year please keep post.you are doing great work!",
      profilepic: "/static/use.png",
      userId: 1,
      time: "1 hour ago",
    },
    {
      id: 2,
      name: "sundar",
      message:
        "This is the nice post of the year please keep post.you are doing great work!",
      userId: 2,
      profilepic: "/static/use2.png",
      time: "2 hours ago",
    },
  ];

const commentSlice = createSlice({
  name: "users",
  initialState: {
    value: comments, //array data
  },
  reducers: {
    addComment(state, action) {
      state.value.push(action.payload); 
      // here we push new data in array.payload means input from user
    },

    deleteComment(state, action) {
      //here we remove that particular data from array using filter method.
      //it does not remove user it filter and show other users and omits selected id
      state.value = state.value.filter((user) => user.id !== action.payload.id);
    },

    updateComment(state, action) {
      state.value.map((user) => {
        const {id, comment} = action.payload
         //match object id with payload id
        if (user.id === id) {
          user.comment = comment;
        }
      });
    },
    
    copyComment(state, action) {
      state.value.push(action.payload);
    },
  },
});

export const { addComment, deleteComment, updateComment } = commentSlice.actions; //grab all actions then export as addUser
export default commentSlice.reducer; //grap all reducer and export
