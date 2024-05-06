import React, { useState } from "react";
import Signin from "./Signin";
import Signup from "./Signup";
import style from "./Auth.module.css";

const Auth = () => {
  const [isRegister, setIsRegister] = useState(false);
  const togglePannel = () => setIsRegister(!isRegister);
  return (
    <div className="flex justify-center h-screen items-center overflow-hidden">
      <div className={`${style.box} lg:max-w-4xl`}>
        <div
          className={`${style.cover} ${isRegister ? style.rotateActive : ""}`}
        >
          <div className={`${style.front}`}>
            <img src="https://images6.alphacoders.com/133/1338694.png" alt="" />
            <div className={`${style.text}`}>
              <span className={`${style.text1}`}>
                Success is built upon well-organized tasks
              </span>
              <span className={`${style.text2} text-xs`}>
                Lets Get Connected
              </span>
            </div>
          </div>
          <div className={`${style.back}`}>
            <img
              src="https://images.pexels.com/photos/346529/pexels-photo-346529.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              alt=""
            />
          </div>
        </div>
        <div className={`${style.forms} h-full`}>
          <div className={`${style.formContent} h-full`}>
            <div className={`${style.loginForm}`}>
              <Signin togglePannel={togglePannel} />
            </div>
            <div className={`${style.signupForm}`}>
              <Signup togglePannel={togglePannel} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
