import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authUser } from "@/redux/states/authSlice";
import { login } from "@/redux/states/authActions";
import { toast } from "react-toastify";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, isAuthorized } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isAuthorized) {
      navigate("/");
    }
  }, [isAuthorized]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const confirmation = (res) => {
      toast(res.data.message);
      setUsername("");
      setPassword("");

      if (res.data.success) {
        dispatch(authUser(true));
      }
    };

    const dataObj = {
      data: {
        username,
        email: username,
        password,
      },
      callback: confirmation,
    };

    dispatch(login(dataObj));
  };

  return (
    <div className="login">
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="email"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default Login;
