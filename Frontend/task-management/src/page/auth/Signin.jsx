import { Button, TextField } from "@mui/material";
import React, { useState } from "react";
import style from "./Auth.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getUserProfile, login } from "../../store/authSlice";

const Signin = ({ togglePannel }) => {
  const dispatch = useDispatch();
  const auth = useSelector((store) => store.auth);

  const [formData, setFormData] = useState({
    userName: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(formData));

    /*dispatch(login(formData)).then((res) => {
      if (res.meta.requestStatus === "fulfilled") {
        console.log("log in", res.payload.token);
        console.log("jwt", localStorage.getItem("jwt"));
        // invoke getUserProfile action creator
        dispatch(getUserProfile(res.payload.token));
      }
    });*/
  };

  return (
    <div>
      <h1 className={`text-lg font-bold text-center pb-8`}>Login</h1>
      <form onSubmit={handleSubmit} className={`space-y-3`}>
        <TextField
          fullWidth
          label="Email"
          name="userName"
          type="email"
          value={formData.email}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          label="Password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
        ></TextField>
        <div>
          <Button
            fullWidth
            sx={{ padding: "0.9rem" }}
            className={style.customButton}
            type="submit"
            disabled={auth.loading}
          >
            {auth.loading ? "Loading..." : "Login"}
          </Button>
        </div>
      </form>
      <div className={`mt-5 flex items-center gap-2 py-5 justify-center`}>
        <span>don't have account?</span>
        <Button onClick={togglePannel}>Signup</Button>
      </div>
    </div>
  );
};

export default Signin;
