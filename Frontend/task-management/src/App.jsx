import "./App.css";
import { ThemeProvider } from "@emotion/react";
import darkTheme from "./theme/darkTheme";
import Navbar from "./page/navbar/Navbar";
import Home from "./page/Home";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllTasks } from "./store/taskSlice";
import { getUserList, getUserProfile } from "./store/authSlice";
import Auth from "./page/auth/Auth";

function App() {
  const dispatch = useDispatch();
  const { task, auth } = useSelector((store) => store);
  const [loading, setLoading] = useState(true);
  const loggedIn = auth?.loggedIn;

  console.log("Logged in", loggedIn);

  // useEffect(() => {
  //   console.log("use effect start");
  //   if (loggedIn) {
  //     console.log("use effect start if");
  //     dispatch(getUserProfile(localStorage.getItem("jwt")));
  //     dispatch(fetchAllTasks());
  //     console.log("loading done");
  //     setLoading(false);
  //   }
  // }, [task.tasks.length, auth.jwt]);

  // if (loading || (task?.loading && auth?.loading))
  //   return <div>Loading...</div>;

  return (
    <ThemeProvider theme={darkTheme}>
      {
        loggedIn && (
          <div>
            <Navbar />
            <Home />
          </div>
        )
        //  : (
        //   <div>Loading.........</div>
        // )
      }
      {!loggedIn && <Auth />}
    </ThemeProvider>
  );
}

export default App;
