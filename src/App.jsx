import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUserInfo } from "@/redux/states/authActions";
import { authUser } from "@/redux/states/authSlice";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import NavBar from "./components/NavBar";

import "./App.css";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const dispatch = useDispatch();
  const isAuthorized = useSelector((state) => state.auth.isAuthorized);

  useEffect(() => {
    const accessToken = document.cookie
      .split("; ")
      .find((row) => row.startsWith("access_token="))
      ?.split("=")[1];

    if (accessToken) {
      dispatch(authUser(true));
    }
  }, []);

  useEffect(() => {
    if (isAuthorized) {
      dispatch(getUserInfo());
    }
  }, [isAuthorized]);

  return (
    <>
      <ToastContainer />
      <NavBar />
      <div className="container">
        <Outlet />
      </div>
    </>
  );
}

export default App;
