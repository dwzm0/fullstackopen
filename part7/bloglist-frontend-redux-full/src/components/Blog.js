import { Link } from "react-router-dom";

const Blog = ({ blog }) => {
  return (
    <div
      className="border-b-4
    border-sky-200 pt-3"
    >
      <span>
        <Link to={`/blogs/${blog.id}`}>
          {blog.title} {blog.author}
        </Link>
      </span>
    </div>
  );
};

export default Blog;
