import React, { useState } from "react";
import style from "./TaskCard.module.css";
import { IconButton } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import UserList from "../userLIst/UserList";
import SubmissionList from "../submission/SubmissionList";
import EditTaskForm from "../EditTaskForm/EditTaskForm";
import { useDispatch, useSelector } from "react-redux";
import { deleteTask } from "../../../store/taskSlice";
import { useLocation, useNavigate } from "react-router-dom";
import TaskSubmit from "../taskSubmit/TaskSubmit";

const role = "ADMIN";

const TaskCard = ({ item }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const { auth } = useSelector((store) => store);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  // This is the state to control the UserList popover visibility
  const [openUserList, setOpenUserList] = useState(false);
  // Handler to close the UserList popover
  const handleCloeUserList = () => {
    setOpenUserList(false);
  };
  // Handler to open the UserList popover
  const handleOpenUserList = () => {
    setOpenUserList(true);
    handleClose(); // Close the menu
    console.log("handleOpenUserList");
  };

  // This is the state to control the EditTaskForm popover visibility
  const [openEditTaskForm, setOpenEditTaskForm] = useState(false);

  const location = useLocation();
  const updatedParams = new URLSearchParams(location.search);
  const navigate = useNavigate();

  // Handler to close the EditTaskForm popover
  const handleCloeEditTaskForm = () => {
    setOpenEditTaskForm(false);
  };

  // Handler to open the EditTaskForm popover
  const handleOpenEditTaskForm = () => {
    // updatedParams.set("taskid", item.id);
    // navigate(`${location.pathname}?${updatedParams.toString()}`);
    setOpenEditTaskForm(true);
    handleClose(); // Close the menu
    console.log("handleopenSubmissionList");
  };

  const dispatct = useDispatch();
  // Handler to delete the task
  const handleDeleteTask = () => {
    console.log("item id", item.id);
    dispatct(deleteTask({ taskId: item.id }));
    console.log("handleDeleteTask");
  };

  // This is the state to control the SubmissionList popover visibility
  const [openSubmissionList, setopenSubmissionList] = useState(false);
  // Handler to close the SubmissionList popover
  const handleCloeSubmissionList = () => {
    setopenSubmissionList(false);
  };
  // Handler to open the SubmissionList popover
  const handleOpenSubmissionList = () => {
    setopenSubmissionList(true);
    handleClose(); // Close the menu
    console.log("handleopenSubmissionList");
  };

  console.log("task card", item);

  // This is the state to control the UserList popover visibility
  const [openSubmitForm, setopenSubmitForm] = useState(false);
  // Handler to close the UserList popover
  const handleCloseSubmitForm = () => {
    setopenSubmitForm(false);
  };
  // Handler to open the UserList popover
  const handleOpenSubmitForm = () => {
    setopenSubmitForm(true);
    handleClose(); // Close the menu
    console.log("handleOpenUserList");
  };

  return (
    <div>
      <div className="card lg:flex justify-between">
        <div className="lg:flex gap-5 items-center space-y-2 w-[90%] lg:w-[70%]">
          <div className="w-[30%]">
            <img
              className="lg:w[7rem] lg:h[7rem] object-cover"
              src={item?.image}
              alt=""
            />
          </div>
          <div className="space-y-5">
            <div className="space-y-2">
              <h1 className="font-bold text-lg">{item?.title}</h1>
              <p className="text-gray-500 text-sm">{item?.description}</p>
            </div>
            <div className="flex flex-grow-2 flex-wrap lg:flex-nowrap items-center justify-center gap-2">
              {item?.tags?.map((item, index) => (
                <span
                  className={`py-1 px-5 rounded-full ${style.techStack}`}
                  key={index}
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
        <div className={``}>
          <IconButton
            id="basic-button"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
          >
            <MoreVertIcon />
          </IconButton>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            {auth.user?.role === "ADMIN" ? (
              <div>
                <MenuItem onClick={handleOpenUserList}>Assigned User</MenuItem>
                <MenuItem onClick={handleOpenSubmissionList}>
                  See Submissions
                </MenuItem>
                <MenuItem onClick={handleOpenEditTaskForm}>Edit</MenuItem>
                <MenuItem onClick={handleDeleteTask}>Delete</MenuItem>
              </div>
            ) : (
              <>
                <MenuItem onClick={handleOpenSubmitForm}>submit</MenuItem>
              </>
            )}
          </Menu>
        </div>
      </div>
      {/* if openUserList is true show UserList */}
      <UserList
        open={openUserList}
        handleClose={handleCloeUserList}
        taskId={item.id}
      />
      <SubmissionList
        open={openSubmissionList}
        handleClose={handleCloeSubmissionList}
      />
      <EditTaskForm
        open={openEditTaskForm}
        handleClose={handleCloeEditTaskForm}
        item={item}
      />
      <TaskSubmit
        open={openSubmitForm}
        handleClose={handleCloseSubmitForm}
        item={item}
      />
    </div>
  );
};

export default TaskCard;
