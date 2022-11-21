import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

//After login new token will be created for that id/secret key.
 //user Authorization

 const verifyToken = (req, res, next) => {
    //get token from cookies
    const cookies = req.headers.cookie;
  
    //if cookies has value string split token from id
    const token = cookies?.split("=")[1];
    if (!token) {
      res.status(404).json({ message: "No token found" });
    }
  
    //verify token with login secret key
    jwt.verify(String(token),"secret_key", (err, user) => {
      if (err) {
        return res.status(400).json({ message: "Invalid Token" });
      }
      console.log(user.id);
  
      //if secret key for that id match the token then store that verified user id in variable
      req.id = user.id;
    });
    next();
  };

//refresh token is created when user refresh the page and auto verified with new token
const refreshToken = (req, res, next) => {
    //get prev token from headers
    const cookies = req.headers.cookie;
    const prevToken = cookies?.split("=")[1];
    if (!prevToken) {
      return res.status(400).json({ message: "Couldn't find token" });
    }
    //verify again with id
    jwt.verify(String(prevToken),"secret_key", (err, user) => {
      if (err) {
        console.log(err);
        return res.status(403).json({ message: "Authentication failed" });
      }
      //if valid token, clear from cookies
      res.clearCookie(`${user.id}`);
      req.cookies[`${user.id}`] = "";
  
      //req new token
      const token = jwt.sign({ id: user.id },"secret_key", {
        expiresIn: "10m",
      });
      console.log("Regenerated Token\n", token);
  
      //send token from cookies
      res.cookie(String(user.id), token, {
        path: "/",
        expires: new Date(Date.now() + 1000 * 300), // 30 seconds
        httpOnly: true,
        // sameSite: "strict", //not allows cross-site request. very safe
        sameSite: "lax", // allows GET only for cross-site request
        secure:"true"
      });
  
      req.id = user.id;
      next();
    });
  };


export {verifyToken, refreshToken} 