import React, { useState } from "react";
import { Avatar, Button } from "@mui/material";
import style from "./Sidebar.module.css";
import { sideMenu } from "./sideMenu";
import CreateTask from "../task/createTask/CreateTask";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../store/authSlice";

const Sidebar = ({ setIsMenuOpen, isMenuOpen }) => {
  const location = useLocation();
  const updatedParams = new URLSearchParams(location.search);
  const navigate = useNavigate();

  const [activeMenu, setActiveMenu] = useState("Home");

  // This is the state to control the EditTaskForm popover visibility
  const [openTaskForm, setOpenTaskForm] = useState(false);
  // Handler to close the EditTaskForm popover
  const handleCloeTaskForm = () => {
    setOpenTaskForm(false);
  };
  // Handler to open the EditTaskForm popover
  const handlepenTaskForm = () => {
    setOpenTaskForm(true);
  };

  const handleMenuChange = (item) => {
    if (item.name === "Create New Task") {
      // setOpenTaskForm(true);
      handlepenTaskForm();
    } else if (item.name === "HOME") {
      updatedParams.delete("filter");
      const queryString = updatedParams.toString();
      const updatedPath = queryString
        ? `${location.pathname}?${queryString}`
        : location.pathname;
      navigate(updatedPath);
    } else {
      updatedParams.set("filter", item.value);
      navigate(`${location.pathname}?${updatedParams.toString()}`);
    }
    setActiveMenu(item.name);
  };

  const dispatch = useDispatch();
  const handleLogout = () => {
    console.log("Logout");
    dispatch(logout());
  };

  return (
    <>
      <div
        className={`${style.card} min-h-[85vh] flex flex-col justify-start fixed lg:w-[19vw]`}
      >
        <div className="space-y-5 h-full">
          {/* tailwind css clss name to hide the logo */}
          <div className="flex justify-center">
            <Avatar
              sx={{ width: "4.5rem", height: "4.5rem" }}
              className="border-2 border-[#c24dd0]"
            ></Avatar>
          </div>
          {sideMenu
            .filter((item) => item.role.includes("ADMIN"))
            .map((item) => (
              <p
                key={item.name}
                className={`py-1.5 px-5 rounded-full text-center cursor-pointer text-sm sm:text-base ${
                  activeMenu == item.name
                    ? `${style.activeMenuItem}`
                    : `${style.menuItem}`
                }`}
                onClick={() => handleMenuChange(item)}
              >
                {item.name}
              </p>
            ))}
          <Button
            sx={{ padding: "0.5rem", borderRadius: "2rem" }}
            fullWidth
            className={`${style.logoutButton} text-sm sm:text-base`}
            onClick={handleLogout}
          >
            Logout
          </Button>
        </div>
      </div>
      <CreateTask open={openTaskForm} handleClose={handleCloeTaskForm} />
    </>
  );
};

export default Sidebar;
