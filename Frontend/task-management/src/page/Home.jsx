import React from "react";
import Sidebar from "./sidebar/Sidebar";
import TaskList from "./task/taskList/TaskList";
import style from "./Home.module.css";

const Home = () => {
  return (
    <div className={`${style.home} lg:flex px-5 lg:px-20 pt-[2.9vh]`}>
      <div className={`${style.sidebar} hidden lg:block w-[25vw] relative`}>
        <Sidebar />
      </div>
      <div
        className={`${style.mainContent} right-side-part w-full flex justify-center mb-10`}
      >
        <TaskList />
      </div>
    </div>
  );
};

export default Home;
