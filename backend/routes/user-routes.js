import express from "express";
import { getAllUser, login, signup,logout } from "../controllers/user-controller";
import { verifyToken, refreshToken } from "../Auth/Auth";
import {
    addBlog,
    deleteBlog,
    getAllBlogs,
    getById,
    getByUserId,
    updateBlog,
  } from "../controllers/blog-controller";

const userRouter = express.Router();

userRouter.post("/signup", signup);
userRouter.post("/login", login);
userRouter.post("/logout", logout);
userRouter.get("/getUser", refreshToken, verifyToken, getAllUser);
userRouter.get("/refresh", refreshToken, verifyToken, getAllUser);

export default userRouter;
