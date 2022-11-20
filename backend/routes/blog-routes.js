import express from "express";
import { refreshToken,verifyToken} from "../Auth/Auth";
import {
  addBlog,
  deleteBlog,
  getAllBlogs,
  getById,
  getByUserId,
  updateBlog,
} from "../controllers/blog-controller";
const blogRouter = express.Router();

blogRouter.post("/addBlog", refreshToken, verifyToken, addBlog);
blogRouter.get("/getAllBlogs", refreshToken, verifyToken, getAllBlogs);
blogRouter.get("/refresh", refreshToken, verifyToken, getAllBlogs);
blogRouter.put("/updateOneBlog/:id", refreshToken, verifyToken, updateBlog);
blogRouter.get("/getOneBlog/:id", refreshToken, verifyToken, getById);
blogRouter.delete("/deleteOneBlog/:id", refreshToken,verifyToken, deleteBlog);
blogRouter.get("/getOneUser/:id", refreshToken,verifyToken, getByUserId);


export default blogRouter;
