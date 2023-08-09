import { Typography, Box, useTheme } from "@mui/material";
import { tokens } from "../theme";
import { Link, Redirect } from "react-router-dom";
import React, { useState } from "react";
import { signin } from "../scenes/auth/isauth";
import { isAuthenticated } from "../scenes/auth/isauth";
import {Navigate} from 'react-router-dom';

const SignInForm = () => {


  const [values, setValues] = useState({
    email: "",
    password: "",
    error: "",
    success: false,
    loading: false,
    didRedirect: false,
  });
  const { email, password, error, success, loading, didRedirect } = values;

  const handleChange = (name) =>
    (event) => {
      setValues({ ...values, error: false, [name]: event.target.value });
    };

  const onSumit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false, loading: true });

    signin({ email, password })
      .then((data) => {
        console.log("DATA", data);
        if (data.status) {
          let sessionToken = data.token;
          console.log("TOKKEN ADDED");
            setValues({
              ...values,
              didRedirect: true,
            });
        } else {
          setValues({
            ...values,
            loading: false,
          });
        }
      })
      .catch((e) => console.log(e));
  };
  const performRedirect = () => {
    if (isAuthenticated()) {
      return <Navigate to="/dashboard" />;
    }
  };

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Box mb="30px">
      <div className="row">
      <div className="col-md-6 offset-sm-3 text-left">
        <form>
          <div className="form-group">
            <label className="text-light">Email</label>
            <input
              name="email"
              className="form-control"
              value={email}
              onChange={handleChange("email")}
              type="text"
            />
          </div>
          <div className="form-group">
            <label className="text-light">password</label>
            <input
              name="password"
              className="form-control"
              value={password}
              onChange={handleChange("password")}
              type="password"
            />
          </div>
          <button
            onClick={onSumit}
            className="btn btn-success btn-block"
          >
            Submit
          </button>
        </form>

        {performRedirect()}
      </div>
    </div>
    </Box>
  );
};

export default SignInForm;
