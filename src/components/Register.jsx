import { useState } from "react";
import { useDispatch } from "react-redux";
import { register } from "@/redux/states/authActions";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const handleEmailOnChange = (value) => {
    setUsername(value);
    setEmail(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(register({ username, email, password }));
  };

  return (
    <div className="login">
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          onChange={(e) => handleEmailOnChange(e.target.value)}
          placeholder="Email"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
