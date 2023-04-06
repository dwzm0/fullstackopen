import { useState } from "react";
import ErrorComp from "./ErrorComp";
import { logInUser } from "../reducers/userReducer";
import { useDispatch } from "react-redux";
import Button from "./Button";

const LoginForm = () => {
  const dispatch = useDispatch();

  const [errorMessage, setErrorMessage] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      await dispatch(
        logInUser({
          username,
          password,
        })
      );
      setUsername("");
      setPassword("");
    } catch (exception) {
      setErrorMessage("wrong credentials");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  return (
    <div className="flex flex-col items-center font-mono">
      <h2 className="py-3 text-xl">Log in to application</h2>
      <ErrorComp message={errorMessage} />
      <form className="flex flex-col gap-5 py-3" onSubmit={handleLogin}>
        <div className="flex gap-3">
          username
          <input
            className="border border-zinc-600 "
            id="username"
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div className="flex gap-3">
          password
          <input
            className="border border-zinc-600 "
            id="password"
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <div className="flex flex-col items-center">
          <Button>login</Button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
