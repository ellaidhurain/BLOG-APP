import UserData from "../model/UserModel";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const signup = async (req, res) => {
  try {
    //handle already registered email
    const emailExist = await UserData.findOne({ Email: req.body.Email });

    if (emailExist) {
      return res.status(400).json("email already exist");
    }

    //encrypt password
    const hash = await bcrypt.hashSync(req.body.Password, 10);

    //send payload
    const postUsers = new UserData({
      Name: req.body.Name,
      Email: req.body.Email,
      Password: hash,
      blogs: [],
    });

    //save data in db
    const saveUsers = await postUsers.save();
    res.status(200).json(saveUsers);
  } catch (err) {
    res.status(400).json({ err: err });
    console.log(res);
  }
};

const login = async (req, res, next) => {
  const { Email, Password } = req.body;

  let existingUser;
  try {
    //verify email has registered
    existingUser = await UserData.findOne({ Email: Email });
  } catch (err) {
    return new Error(err);
  }

  //check email is valid
  if (!existingUser) {
    return res.status(400).json({ message: "User not found. Signup Please" });
  }

  //check password is valid
  const isPasswordCorrect = bcrypt.compareSync(Password, existingUser.Password);
  if (!isPasswordCorrect) {
    return res.status(400).json({ message: "Invalid Email / Password" });
  }

  //if valid create token for user
  const token = jwt.sign({ id: existingUser._id }, "secret_key", {
    expiresIn: "24h",
  });

  console.log("Generated Token\n", token);

  //check if already has any token and remove that token from cookies
  if (req.cookies[`${existingUser._id}`]) {
    req.cookies[`${existingUser._id}`] = "";
  }

  //send token from cookies.
  res.cookie(String(existingUser._id), token, {
    path: "/",
    expires: new Date(Date.now() + 10000 * 30), // 30 seconds
    httpOnly: true,
    sameSite: "lax",
  });

  return res
    .status(200)
    .json({ message: "Successfully Logged In", user: existingUser, token });
};

//after verification of userToken with user id get data from db.
const getAllUser = async (req, res, next) => {
  //now send that verified req id to user
  const userId = req.id;
  let user;
  try {
    //find data for that id from db
    user = await UserData.findById(userId, "-password");
  } catch (err) {
    return new Error(err);
  }
  if (!user) {
    return res.status(404).json({ message: "User Not Found" });
  }

  //return data to user
  return res.status(200).json({ user });
};

//logout is not creating new token. so user is redirected to login
const logout = (req, res, next) => {
  const cookies = req.headers.cookie;
  //get old token from cookies
  const prevToken = cookies?.split("=")[1];
  if (!prevToken) {
    return res.status(400).json({ message: "Couldn't find token" });
  }
  jwt.verify(String(prevToken), "secret_key", (err, user) => {
    if (err) {
      console.log(err);
      return res.status(403).json({ message: "Authentication failed" });
    }
    res.clearCookie(`${user.id}`);
    req.cookies[`${user.id}`] = "";
    return res.status(200).json({ message: "Successfully Logged Out" });
  });
};

export { signup, login, getAllUser, logout };
