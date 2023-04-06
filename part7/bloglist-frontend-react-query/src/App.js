import { useQuery, useMutation, useQueryClient } from "react-query";
import { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Notification from "./components/Notification";
import ErrorComp from "./components/ErrorComp";
import BlogForm from "./components/BlogForm";
import Togglable from "./components/Togglable";

import { useNotificationDispatch } from "./NotifContext";
import { useLoginValue, useLoginDispatch } from "./LoginContext";

const App = () => {
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogAppUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser({
        type: "SET",
        data: user,
      });
      blogService.setToken(user.token);
    }
  }, []);

  const blogFormRef = useRef();
  const queryClient = useQueryClient();

  const [errorMessage, setErrorMessage] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const setNotif = useNotificationDispatch();
  const user = useLoginValue();
  const setUser = useLoginDispatch();

  const newBlogMutation = useMutation(blogService.create, {
    onSuccess: (newBlog) => {
      const blogs = queryClient.getQueryData("blogs");
      queryClient.setQueryData("blogs", blogs.concat(newBlog));
      setNotif({
        type: "SET",
        data: `a new blog ${newBlog.title} has been added`,
      });
      setTimeout(() => {
        setNotif({ type: "UNSET" });
      }, 5000);
    },
    onError: () => {
      setNotif({
        type: "SET",
        data: "SMTH WRONG",
      });
      setTimeout(() => {
        setNotif({ type: "UNSET" });
      }, 5000);
    },
  });

  const newLikeMutation = useMutation(blogService.like, {
    onSuccess: (updatedBlog) => {
      const blogs = queryClient.getQueryData("blogs");
      queryClient.setQueryData(
        "blogs",
        blogs.map((blog) => (blog.id === updatedBlog.id ? updatedBlog : blog))
      );
    },
  });

  const deleteBlogMutation = useMutation(blogService.deleteBlog, {
    onSuccess: () => {
      queryClient.invalidateQueries("blogs");
    },
  });

  const createBlog = async (blog) => {
    newBlogMutation.mutate(blog);
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username,
        password,
      });
      window.localStorage.setItem("loggedBlogAppUser", JSON.stringify(user));
      blogService.setToken(user.token);
      setUser({ type: "SET", data: user });
      setUsername("");
      setPassword("");
    } catch (exception) {
      setErrorMessage("wrong credentials");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const handleLogOut = () => {
    setUser({ type: "REMOVE" });
    setUsername("");
    setPassword("");
    window.localStorage.clear();
  };

  const addLike = async (blogObject) => {
    newLikeMutation.mutate(blogObject);
  };

  const deleteBlog = async (blogObject) => {
    if (!window.confirm(`delete blog "${blogObject.title}"?`)) return;
    deleteBlogMutation.mutate(blogObject);
    location.reload();
  };

  const result = useQuery("blogs", blogService.getAll, {
    retry: 1,
    refetchOnWindowFocus: false,
  });

  if (result.isLoading) {
    return <div>loading data...</div>;
  }

  if (result.isError) {
    return <div>blogs service not available due to problems in server</div>;
  }

  const blogs = result.data;

  if (user === false) {
    return (
      <div>
        <h2>Log in to application</h2>
        <ErrorComp message={errorMessage} />
        <form onSubmit={handleLogin}>
          <div>
            username
            <input
              id="username"
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
            <input
              id="password"
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button id="login-button" type="submit">
            login
          </button>
        </form>
      </div>
    );
  }
  return (
    <div>
      <h2>blogs</h2>
      <Notification />
      <p>
        {user.name} has loged in <button onClick={handleLogOut}>logout</button>
      </p>
      <Togglable buttonLabel="new blog" ref={blogFormRef}>
        <BlogForm createBlog={createBlog} />
      </Togglable>
      <div className="blogs">
        {blogs
          .sort((a, b) => b.likes - a.likes)
          .map((blog) => (
            <Blog
              key={blog.id}
              blog={blog}
              user={user}
              addLike={addLike}
              deleteBlog={deleteBlog}
            />
          ))}
      </div>
    </div>
  );
};

export default App;
