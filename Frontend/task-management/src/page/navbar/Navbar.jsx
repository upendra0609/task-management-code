import React, { useEffect, useState } from "react";

import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { Avatar } from "@mui/material";
import style from "./Navbar.module.css";
import Sidebar from "../sidebar/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { getUserProfile } from "../../store/authSlice";

const Navbar = () => {
  const { auth } = useSelector((store) => store);
  // console.log("auth user nav", auth);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const loggedIn = auth?.loggedIn;

  const dispatch = useDispatch();

  // for mobile display to open sidebar
  const handleMenuClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("use effect start");
    if (loggedIn) {
      console.log("use effect start if");
      dispatch(getUserProfile(localStorage.getItem("jwt")));
      console.log("loading done");
      setLoading(false);
    }
  }, [auth.jwt]);

  console.log("auth navbar", auth);

  // useEffect(() => {
  //   if (loggedIn) {
  //     // dispatch(getUserProfile(localStorage.getItem("jwt")));
  //   }
  // }, [loggedIn]);

  return (
    <>
      {!loading && (
        <div
          className={`${style.container} z-10 sticky left-0 right-0 top-0 py-2 px-5 lg:px-10 flex justify-between items-center`}
        >
          <div className={`flex items-center gap-2`}>
            <div className="lg:hidden">
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
                onClick={handleMenuClick}
              >
                {isMenuOpen ? <CloseIcon /> : <MenuIcon />}
              </IconButton>
              {isMenuOpen && (
                <Sidebar
                  setIsMenuOpen={setIsMenuOpen}
                  isMenuOpen={isMenuOpen}
                />
              )}
            </div>
            <p className="font-bold text-lg">Task Manager</p>
          </div>
          <div className="flex items-center gap-5">
            {loggedIn && (
              <>
                <p>{auth.user?.firstName + " " + auth.user?.lastName}</p>
                <Avatar sx={{ backgroundColor: "#c24dd0" }}>
                  {/* only first character of first name */}
                  {auth.user?.firstName?.toUpperCase().charAt(0)}
                  {/* {auth.user.charAt(0)} */}
                </Avatar>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
