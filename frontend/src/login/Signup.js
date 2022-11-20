import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import "./App.css";
import axios from "axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Box, Button, TextField, Typography } from "@mui/material";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import { LoginImage } from "../blog/lottiefiles";

const Signup = (props) => {
  const [loading, setLoading] = useState(false);
  const [passwordType, setPasswordType] = useState("password");
  const [passwordInput, setPasswordInput] = useState("");

  const handlePasswordChange = (e) => {
    setPasswordInput(e.target.value);
  };
  const togglePassword = () => {
    if (passwordType === "password") {
      setPasswordType("text");
      return;
    }
    setPasswordType("password");
  };

  const initialValues = {
    Name: "",
    Email: "",
    Password: "",
  };

  const validationSchema = Yup.object().shape({
    Name: Yup.string()
      .test(
        "len",
        "The username must be between 3 and 20 characters.",
        (val) =>
          val && val.toString().length >= 3 && val.toString().length <= 20
      )
      .required("This field is required!"),
    Email: Yup.string()
      .email("This is not a valid email.")
      .required("This field is required!"),
    Password: Yup.string()
      .test(
        "len",
        "The password must be between 6 and 40 characters.",
        (val) =>
          val && val.toString().length >= 6 && val.toString().length <= 40
      )
      .required("This field is required!"),
  });

  const navigate = useNavigate();
  const onSubmit = async (data) => {
    const { Name, Email, Password } = data;
    const API_URL = "http://localhost:5000/api/user/signup";

    await axios({
      method: "post",
      url: API_URL,
      data: {
        Name,
        Email,
        Password,
      },
      withCredentials: true,
    })
      .then(() => {
        toast.success("Registration success");
        navigate("/login");
      })
      .then((data) => localStorage.setItem("userId", data.user._id))
      .catch((error) => toast.error(error.response.data));
  };

  return (
    <div className="d-flex justify-content-even align-items-center" style={{ marginTop: "80px", marginLeft:"100px" }}>
      <div className="col-6">
        <LoginImage />
      </div>
      <div className="col-6 col-md-12 signup-form" >
        <div>
          <img
            src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
            alt="profile-img"
            className="profile-img-card"
          />
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            <Form>
              <div>
                <div className="form-group">
                  <label htmlFor="Name">Username</label>
                  <Field
                    name="Name"
                    type="text"
                    className="form-control py-3"
                    style={{ borderRadius: "50px" }}
                  />
                  <ErrorMessage
                    name="Name"
                    component="div"
                    className="text-danger"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="Email">Email</label>

                  <Field
                    name="Email"
                    type="email"
                    className="form-control py-3"
                    style={{ borderRadius: "50px" }}
                  />
                  <ErrorMessage
                    name="Email"
                    component="div"
                    className="text-danger"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="Password">Password</label>
                  <Field
                    name="Password"
                    type={passwordType}
                    className="form-control py-3"
                    style={{ borderRadius: "50px" }}
                  />
                  <ErrorMessage
                    name="Password"
                    component="div"
                    className="text-danger"
                  />
                </div>

                <div className="form-group m-4">
                  <Button
                    type="submit"
                    variant="contained"
                    className="btn btn-primary btn-block"
                  >
                    Register
                  </Button>
                  <Link
                    to="/login"
                    style={{ padding: "10px", textDecoration: "none" }}
                  >
                    <Button
                      type="submit"
                      variant="contained"
                      className="btn btn-primary btn-block"
                    >
                      Back To Login
                    </Button>
                  </Link>
                </div>
              </div>
            </Form>
          </Formik>
          <div className="input-group-btn d-flex justify-content-end">
            <Button onClick={togglePassword}>
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
  );
};

export default Signup;
