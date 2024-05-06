import React, { useState, useEffect } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Button, TextField } from "@mui/material";
import style from "./Auth.module.css";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../store/authSlice";

const Signup = ({ togglePannel }) => {
  const dispatch = useDispatch();
  const { auth } = useSelector((state) => state);
  // console.log("auth", auth);

  const [formData, setFormData] = useState({
    fullName: "",
    role: "",
    email: "",
    password: "",
    phoneNumber: "",
  });

  const handleChange = (e) => {
    // console.log("handle change");
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    dispatch(register(formData));
    // console.log("submitted", formData);
  };

  useEffect(() => {}, []);
  return (
    <div>
      <h1 className={`text-lg font-bold text-center pb-2`}>Register</h1>
      <form onSubmit={handleSubmit} className={`space-y-2`}>
        <TextField
          fullWidth
          label="fullName"
          name="fullName"
          placeholder="Enter your fullName"
          value={formData.fullName}
          onChange={handleChange}
        />

        <TextField
          fullWidth
          label="Email"
          name="email"
          type="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          label="Password"
          name="password"
          type="password"
          placeholder="Enter your password"
          value={formData.password}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          label="Phone Number"
          name="phoneNumber"
          placeholder="Enter your contact number"
          value={formData.phoneNumber}
          onChange={handleChange}
        ></TextField>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Role</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={formData.role}
            label="Role"
            name="role"
            onChange={handleChange}
          >
            <MenuItem value={"ADMIN"}>ADMIN</MenuItem>
            <MenuItem value={"USER"}>USER</MenuItem>
          </Select>
        </FormControl>
        <div>
          <Button
            fullWidth
            sx={{ padding: "0.9rem" }}
            className={style.customButton}
            type="submit"
          >
            Register
          </Button>
        </div>
      </form>
      <div className={`flex items-center gap-1 justify-center`}>
        <span>Already have an account?</span>
        <Button onClick={togglePannel}>Login</Button>
      </div>
    </div>
  );
};

export default Signup;
