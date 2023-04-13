import { Link } from "react-router-dom";

const Menu = ({ token, handleLogOut }) => {
  const padding = {
    paddingRight: 5,
  };
  return (
    <div>
      <Link style={padding} to="/">
        books
      </Link>
      <Link style={padding} to="/authors">
        authors
      </Link>
      {token ? (
        <>
          <Link style={padding} to="/add">
            add
          </Link>
          <Link style={padding} to="/recommend">
            recommend
          </Link>
          <Link onClick={handleLogOut} style={padding} to="/login">
            logout
          </Link>
        </>
      ) : (
        <Link style={padding} to="/login">
          login
        </Link>
      )}
    </div>
  );
};

export default Menu;
