import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Login from "./Login";
import Signup from "./Signup";
import Home from "./Home";
import MyBlogs from "../blog/myBlogs";
import UserBlogs from "../blog/myBlogs";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AddBlog from "../blog/AddBlog";

function App() {
  const LoggedIn = true;
  const ProtectedRoute = ({ children }) => {
    if (!LoggedIn) {
      return <Navigate to="/login" />;
    }
    return children; //children is home page
  };

  return (
    <div className="wrapper">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/myBlogs" element={<UserBlogs />} />
        <Route path="/myBlogs/:id" element={<MyBlogs />} />
        <Route path="/AddBlogs/:id" element={<AddBlog />} />
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
          exact
        />
      </Routes>

      <ToastContainer />
    </div>
  );
}

export default App;
