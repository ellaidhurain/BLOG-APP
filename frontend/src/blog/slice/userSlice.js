import { createSlice } from "@reduxjs/toolkit";

const userList = [
  {
    id: 1,
    name: "sundar",
  },
  {
    id: 2,
    name: "martin",
  },
];

const userSlice = createSlice({
  name: "users",
  initialState: {
    value: userList, //array data
  },
  reducers: {
    addUser(state, action) {
      state.value.push(action.payload); 
      // here we push new data in array.payload means input from user
    },

    deleteUser(state, action) {
      //here we remove that particular data from array using filter method.
      //it does not remove user it filter and show other users and omits selected id
      state.value = state.value.filter((user) => user.id !== action.payload.id);
    },

    updateUser(state, action) {
      state.value.map((user) => {
         //match object id with payload id
        if (user.id === action.payload.id) {
          user.name = action.payload.name;
        }
      });
    },
    
    copyUser(state, action) {
      state.value.push(action.payload);
    },
  },
});

export const { addUser, deleteUser, updateUser, copyUser } = userSlice.actions; //grab all actions then export as addUser
export default userSlice.reducer; //grap all reducer and export

// let value = 3

//let arr = [1, 2, 3, 4, 5, 3]

//arr = arr.filter(item => item !== value)

//console.log(arr)
// [ 1, 2, 4, 5 ]

