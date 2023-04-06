import { useEffect, useRef } from "react";
import Notification from "./components/Notification";
import BlogForm from "./components/BlogForm";
import Togglable from "./components/Togglable";
import BlogList from "./components/BlogList";
import LoginForm from "./components/LoginForm";
import Users from "./components/Users";
import UserView from "./components/UserView";
import BlogView from "./components/BlogView";
import Navigation from "./components/Navigation";
import { useDispatch, useSelector } from "react-redux";
import { initializeBlogs } from "./reducers/blogReducer";
import { setUserOut } from "./reducers/userReducer";
import { initializeUsers } from "./reducers/usersReducer";
import { addNewLike, delBlog } from "./reducers/blogReducer";
import { Routes, Route, useMatch } from "react-router-dom";

const App = () => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth);
  const initUsers = useSelector((state) => state.users);
  const initBlogs = useSelector((state) => state.blogs);

  useEffect(() => {
    dispatch(initializeBlogs());
  }, [dispatch]);

  useEffect(() => {
    dispatch(initializeUsers());
  }, [dispatch]);

  const blogFormRef = useRef();

  const handleLogOut = () => {
    dispatch(setUserOut());
    window.localStorage.clear();
  };

  const userMatch = useMatch("/users/:id");
  const viewUser = userMatch
    ? initUsers.find((user) => user.id === userMatch.params.id)
    : null;

  const handleAddLike = (blog) => {
    dispatch(addNewLike(blog));
  };

  const handleDelete = (blog) => {
    if (!window.confirm(`delete blog "${blog.title}"?`)) return;
    dispatch(delBlog(blog));
  };
  const blogMatch = useMatch("/blogs/:id");

  const viewBlog = blogMatch
    ? initBlogs.find((blog) => blog.id === blogMatch.params.id)
    : null;

  if (user === null) {
    return (
      <div>
        <LoginForm />
      </div>
    );
  }
  return (
    <div className="flex flex-col items-center gap-5 font-mono">
      <div>
        <Navigation userName={user.name} handleLogOut={handleLogOut} />
        <Notification />
        <Togglable buttonLabel="new blog" ref={blogFormRef}>
          <BlogForm />
        </Togglable>
      </div>
      <Routes>
        <Route path="/" element={<BlogList user={user} />} />
        <Route path="/users/:id" element={<UserView currUser={viewUser} />} />
        <Route
          path="/blogs/:id"
          element={
            <BlogView
              currBlog={viewBlog}
              handleAddLike={handleAddLike}
              handleDelete={handleDelete}
              user={user}
            />
          }
        />
        <Route path="/users" element={<Users users={initUsers} />} />
      </Routes>
    </div>
  );
};

export default App;
