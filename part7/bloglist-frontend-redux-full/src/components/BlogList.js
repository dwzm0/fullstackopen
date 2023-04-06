import { useSelector } from "react-redux";
import Blog from "./Blog";

const BlogList = ({ user }) => {
  const initBlogs = useSelector((state) => state.blogs);

  return (
    <div>
      {initBlogs
        .slice()
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <Blog key={blog.id} blog={blog} user={user} />
        ))}
    </div>
  );
};

export default BlogList;
