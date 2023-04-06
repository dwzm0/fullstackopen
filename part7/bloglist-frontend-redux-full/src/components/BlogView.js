import CommentView from "./CommentView";
import Button from "./Button";

const BlogView = ({ currBlog, user, handleAddLike, handleDelete }) => {
  if (!currBlog) return null;
  return (
    <div className="flex flex-col gap-3">
      <h1>{currBlog.title}</h1>
      <p>{currBlog.url}</p>
      <div className="flex items-center gap-3">
        <span>likes: {currBlog.likes}</span>
        <Button onClick={() => handleAddLike(currBlog)}>like</Button>
      </div>
      <div className="flex items-center gap-3">
        <p>Added by {currBlog.user.name}</p>
        <span>
          {currBlog.user.username === user.username && (
            <Button onClick={() => handleDelete(currBlog)}>delete</Button>
          )}
        </span>
      </div>
      <CommentView />
    </div>
  );
};

export default BlogView;
