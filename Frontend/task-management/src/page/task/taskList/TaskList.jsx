import React, { useEffect, useRef, useState } from "react";
import TaskCard from "../tsakCard/TaskCard";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllTasks, fetchUsersTasks } from "../../../store/taskSlice";
import { useLocation } from "react-router-dom";
import { getUserProfile } from "../../../store/authSlice";

const TaskList = () => {
  const dispatch = useDispatch();
  const { task, auth } = useSelector((store) => store);

  const [loading, setLoading] = useState(true);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const filterValue = queryParams.get("filter");
  // console.log(filterValue);

  useEffect(() => {
    if (auth.user) {
      if (auth.user?.role === "ADMIN") {
        dispatch(fetchAllTasks({ status: filterValue }));
      } else {
        dispatch(fetchUsersTasks({ status: filterValue }));
      }
      setLoading(false);
    }
  }, [
    filterValue,
    auth.user,
    task.tasks.length,
    task.taskDetails,
    task.usersTask.length,
  ]);

  // useEffect(() => {
  //   if (!task.tasks.length) {
  //     dispatch(fetchAllTasks());
  //   }
  // }, []);

  // console.log("tasklist", task?.tasks[0].status);

  return (
    <>
      {!loading && (
        <div className={`space-y-5 w-[67vw]`}>
          {auth.user?.role === "ADMIN" ? (
            <>
              {task?.tasks?.map((item, index) => (
                <div key={index}>
                  <TaskCard item={item} />
                </div>
              ))}
            </>
          ) : (
            <>
              {task?.usersTask?.map((item, index) => (
                <div key={index}>
                  <TaskCard item={item} />
                </div>
              ))}
            </>
          )}
        </div>
      )}
    </>
  );
};

export default TaskList;
