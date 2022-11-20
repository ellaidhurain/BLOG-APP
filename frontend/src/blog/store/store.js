import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../slice/counterslice";
import userReducer from "../slice/userSlice";
import commentReducer from "../slice/commentSlice";

const store = configureStore({ 
    reducer: {
        counter:counterReducer,
        users: userReducer,
        comments: commentReducer,
    } 
    });
export default store;
