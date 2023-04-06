const UserView = ({ currUser }) => {
  if (!currUser) return null;

  return (
    <>
      <h1>{currUser.name}</h1>
      <p>added blogs</p>
      <ul>
        {currUser.blogs.slice().map((blog) => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </>
  );
};

export default UserView;
