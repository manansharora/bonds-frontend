import { Typography, Box, useTheme } from "@mui/material";
import { tokens } from "../theme";
import React, { useState } from "react";
import { signup } from "../scenes/auth/isauth";

const SignUp = () => {
    const [values, setValues] = useState({
        name: "",
        email: "",
        password: "",
        error: "",
        success: false,
      });
    
      const { name, email, password, error, success } = values;
      const id = 1;
      const handleChange = (name) =>
        (event) => {
          setValues({ ...values, error: false, [name]: event.target.value });
        };


  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false });
    
    signup({ id, name, email, password })
      .then((data) => {
        console.log("DATA", data);
        if (data === name) {
          setValues({
            ...values,
            name: "",
            email: "",
            password: "",
            error: "",
            success: true,
          });
        } else {
          setValues({
            ...values,
            error: true,
            success: false,
          });
        }
      })
      .catch((e) => console.log(e));
  };


  return (
    <Box mb="30px">
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <form>
            <div className="form-group">
              <label className="text-light">Name</label>
              <input
                className="form-control"
                value={name}
                onChange={handleChange("name")}
                type="text"
              />
            </div>
            <div className="form-group">
              <label className="text-light">Email</label>
              <input
                className="form-control"
                value={email}
                onChange={handleChange("email")}
                type="text"
              />
            </div>
            <div className="form-group">
              <label className="text-light">password</label>
              <input
                className="form-control"
                value={password}
                onChange={handleChange("password")}
                type="password"
              />
            </div>
            <button
              onClick = {onSubmit}
              className="btn btn-success btn-block"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </Box>
  );
};

export default SignUp;
