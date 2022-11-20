import express from "express";
import mongoose from "mongoose";
import blogRouter from "./routes/blog-routes";
import userRouter from "./routes/user-routes";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv/config";
import morgan from "morgan";


const app = express();

app.use(express.urlencoded({extended:false}));

//don't use other cors.use this only
app.use(cors({
  origin:"http://localhost:3000",
  methods:['GET','POST','PUT','DELETE','OPTIONS','PATCH'],  
  credentials: true,
}
))

app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));

app.use("/api/user", userRouter);
app.use("/api/blog", blogRouter);


mongoose
  .connect(
    'mongodb+srv://ellaidhurai:3zk29FAErKPzQOVQ@cluster0.ooqxbak.mongodb.net/test'
  )
  .then(() => app.listen(5000))
  .then(() =>
    console.log("Connected To mongo DB and Listening Localhost 5000")
  )
  .catch((err) => console.log(err));
