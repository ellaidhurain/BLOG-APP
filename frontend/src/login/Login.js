import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import "./App.css";
import { authActions } from "../blog/slice/loginSlice";
import { Box, Button, TextField, Typography } from "@mui/material";
import { LoginImage } from "../blog/lottiefiles";

const validationSchema = Yup.object().shape({
  Email: Yup.string()
    .email("This is not a valid email.")
    .strict()
    .trim()
    .required("This field is required!"),
  Password: Yup.string().required("This field is required!").strict().trim(),
});

const Login = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.isLoggedIn);

  const [inputs, setInputs] = useState({
    Email: "",
    Password: "",
  });

  const [loading, setLoading] = useState(false);
  const [passwordType, setPasswordType] = useState("password");
  const [log, setlog] = useState(false);

  const handleChange = (e) => {
    setInputs(() => ({
      ...inputs,
      [e.target.name]: e.target.value,
    }));
  };

  const togglePassword = () => {
    if (passwordType === "password") {
      setPasswordType("text");
      return;
    }
    setPasswordType("password");
  };

  const login = async () => {
    const res = await axios
      .post(`http://localhost:5000/api/user/login`, {
        Email: inputs.Email,
        Password: inputs.Password,
      })
      .catch((err) => console.log(err));

    const user = await res.data;
    return user;
  };

  const handleSubmit = (e) => {
    login()
      .then((data) => localStorage.setItem("userId", data.user._id))
      .then(() => {
        navigate("/home");
      });
  };

  return (
    <>
      <div className="d-flex justify-content-even align-items-center" style={{ marginTop: "80px", marginLeft:"100px" }}>
        <div className="col-6">         
          <LoginImage />
        </div>

        <div className="col-6 col-sm-12 login-form" >
          <div>
            <img
              src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
              alt="profile-img"
              className="profile-img-card"
            />

            <div className="form-group">
              <TextField
                name="Email"
                type="text"
                className="form-control py-3 my-3 "
                style={{ borderRadius: "50px" }}
                placeholder="email"
                onChange={handleChange}
                value={inputs.Email}
              />
            </div>

            <TextField
              name="Password"
              type={passwordType}
              className="form-control py-3"
              style={{ borderRadius: "50px" }}
              placeholder="password"
              onChange={handleChange}
              value={inputs.Password}
            />

            <div className="form-group  mt-4 mb-3">
              <Button
                onClick={handleSubmit}
                variant="contained"
                className="btn btn-primary btn-block  px-5 mx-4"
              >
                {loading && (
                  <span className="spinner-border spinner-border-sm"></span>
                )}
                <span>Login</span>
              </Button>{" "}
              <Link to="/signup" style={{ textDecoration: "none" }}>
                <Button
                  type="submit"
                  variant="contained"
                  className="btn btn-primary btn-block px-5"
                >
                  Signup
                </Button>
              </Link>
            </div>

            <div className="input-group-btn d-flex justify-content-end mt-2">
              <Link style={{ textDecoration: "none" }}>
                <p className="mt-2">forgot password?</p>
              </Link>
              <Button style={{ color: "blue" }} onClick={togglePassword}>
                {passwordType === "password" ? (
                  <i className="bi bi-eye-slash"></i>
                ) : (
                  <i className="bi bi-eye"></i>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
