import { Link } from "react-router-dom";

const User = ({ user }) => {
  if (!user) return null;
  return (
    <>
      <tr>
        <td>
          <Link to={user.id}>{user.name}</Link>
        </td>
        <td>{user.blogs.length}</td>
      </tr>
    </>
  );
};

const Users = ({ users }) => {
  return (
    <div>
      <h1>Users</h1>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>blogs created</th>
          </tr>
        </thead>
        <tbody>
          {users.slice().map((user) => (
            <User key={user.id} user={user} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
