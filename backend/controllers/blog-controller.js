import BlogData from "../model/BlogModel";
import UserData from "../model/UserModel";
import mongoose from "mongoose";


export const getAllBlogs = async (req, res, next) => {
  let blogs;
  try {
    //populate() function in mongoose is used for populating the data inside the reference
    blogs = await BlogData.find().populate("user");
  } catch (err) {
    return console.log(err);
  }
  if (!blogs) {
    return res.status(404).json({ message: "No Blogs Found" });
  }
  return res.status(200).json({ blogs });
};


export const addBlog = async (req, res, next) => {
  const { title, description, image, user } = req.body;

  let existingUser;
  try {
    //find existing user
    existingUser = await UserData.findById(user);
  } catch (err) {
    return console.log(err);
  }
  if (!existingUser) {
    return res.status(400).json({ message: "Unable To FInd User By This ID" });
  }
  const blog = new BlogData({
    title,
    description,
    image,
    user,
  });
  try {
    //session is runtime server storage
    const session = await mongoose.startSession();

    //startTransaction and commitTransaction is used allow and send data to server and user
    session.startTransaction();

    //save blog data in session
    await blog.save({ session });

    //then push data into blogs array
    existingUser.blogs.push(blog);

    //then save that array in db
    await existingUser.save({ session });

    //
    await session.commitTransaction();
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err });
  }

  return res.status(200).json({ blog });
};

export const updateBlog = async (req, res, next) => {
  const { title, description, image, user } = req.body;

  // if you have the route /update/:id, then the “id” property is available as req.params.id.
  const blogId = req.params.id;
  let blog;

  try {
    blog = await BlogData.findByIdAndUpdate(blogId, {
      title,
      description,
      image,
      user,
    });
  } catch (err) {
    return console.log(err);
  }
  if (!blog) {
    return res
      .status(500)
      .json({ message: "Unable To Update The BlogData No blog!" });
  }
  //return the res is show the data in console
  return res.status(200).json({ blog });
};

export const getById = async (req, res, next) => {
  const id = req.params.id;
  let blog;
  try {
    blog = await BlogData.findById(id);
  } catch (err) {
    return console.log(err);
  }
  if (!blog) {
    return res.status(404).json({ message: "No BlogData Found" });
  }
  return res.status(200).json({ blog });
};

export const deleteBlog = async (req, res, next) => {
  const id = req.params.id;

  let blog;
  try {
    blog = await BlogData.findByIdAndRemove(id).populate("user");
    //blog = {user:id, {blogs:[id1,id2]}}

    //remove blog id removes entire blog
    //pull particular blog
    await blog.user.blogs.pull(blog);
    
    //now save the changes
    await blog.user.save();
  } catch (err) {
    console.log(err);
  }
  if (!blog) {
    return res.status(500).json({ message: "Unable To Delete! no blog" });
  }
  return res.status(200).json({ message: "Successfully Delete" });
};

export const getByUserId = async (req, res, next) => {
  const userId = req.params.id;
  let userBlogs;
  try {
    userBlogs = await UserData.findById(userId).populate("blogs");
  } catch (err) {
    return console.log(err);
  }
  if (!userBlogs) {
    return res.status(404).json({ message: "No BlogData Found" });
  }
  return res.status(200).json({ user: userBlogs });
};
