// const { number } = require("joi");
import mongoose from "mongoose";

//A schema is a JSON object that defines the the structure and contents of your data.
// create table field structure
const UserSchema = mongoose.Schema({
  Name: {
    type: String,
    required: true,
    lowercase: true,
  },

  Email: {
    type: String,
    required: true,
  },

  Password: {
    type: String,
    required: true,
  },

  blogs:[{type:mongoose.Types.ObjectId, ref:"BlogData", required:true}],


});

export default mongoose.model("UserData", UserSchema );


//UserData - db table name.
//A module is a JavaScript library/file that you can import into other code using Node's require() function. Express itself is a module, as are the middleware and database libraries that we use in our Express applications.



  //{
//   _id: 59ab1c92ea84486fb4ba9f28,
//   Name: JD,
//   blogs: [
//     "59ab1b43ea84486fb4ba9ef0",
//     "59ab1b43ea84486fb4ba9ef1"
//   ]
// }
