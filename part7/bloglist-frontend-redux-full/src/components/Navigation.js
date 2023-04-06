import { Link } from "react-router-dom";
import Button from "./Button";

const Navigation = ({ userName, handleLogOut }) => {
  return (
    <div className="flex flex-row items-center gap-5 p-2">
      <span className="text-lg">
        <Link to="/">blogs</Link>
      </span>
      <span className="text-lg">
        <Link to="/users">users</Link>
      </span>
      <span>{userName} has loged in</span>
      <Button onClick={handleLogOut}>logout</Button>
    </div>
  );
};

export default Navigation;
