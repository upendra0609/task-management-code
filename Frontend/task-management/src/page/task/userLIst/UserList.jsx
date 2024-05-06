import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import style from "./UserList.module.css";
import {
  Avatar,
  Button,
  Divider,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getUserList } from "../../../store/authSlice";
import { assignTaskToUser } from "../../../store/taskSlice";

const styles = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  outline: "none",
  p: 2,
};

const UserList = ({ handleClose, open, taskId }) => {
  const dispatch = useDispatch();
  const { auth } = useSelector((store) => store);

  useEffect(() => {
    dispatch(getUserList(localStorage.getItem("jwt")));
  }, []);

  const handleAssignTask = (userId, taskId) => {
    console.log(userId, taskId);
    dispatch(assignTaskToUser({ userId: userId, taskId: taskId }));
  };

  return (
    <div className={""}>
      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={styles}>
            {auth.users?.map((item, index) => (
              <div key={index}>
                <div
                  // key={index}
                  className="flex items-center justify-between w-full"
                >
                  <div className="">
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar src="">
                          {item.firstName?.toUpperCase().charAt(0)}
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        secondary={`@${item.firstName}`}
                        primary={item.firstName + " " + item.lastName}
                      ></ListItemText>
                    </ListItem>
                  </div>
                  <div>
                    <Button
                      className={`${style.customeButton}`}
                      onClick={() => handleAssignTask(item.id, taskId)}
                    >
                      Select
                    </Button>
                  </div>
                </div>
                {index != item.length - 1 && <Divider variant="inset" />}
              </div>
            ))}
          </Box>
        </Modal>
      </div>
    </div>
  );
};

export default UserList;
