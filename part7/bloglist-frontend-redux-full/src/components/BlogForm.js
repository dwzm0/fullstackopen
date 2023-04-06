import { useState } from "react";
import { useDispatch } from "react-redux";
import { createBlog } from "../reducers/blogReducer";
import { setNotificationForAdd } from "../reducers/notificationReducer";
import Button from "./Button";

const BlogForm = () => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const addNote = (e) => {
    e.preventDefault();
    const blog = {
      title,
      author,
      url,
    };
    setTitle("");
    setAuthor("");
    setUrl("");
    dispatch(createBlog(blog));
    dispatch(setNotificationForAdd(blog.title, 5000));
  };
  return (
    <div className="flex flex-col items-center gap-1">
      <h2 className="p-2 text-xl capitalize">add one more</h2>
      <form className="flex flex-col gap-2" onSubmit={addNote}>
        <div className="flex justify-between">
          title
          <input
            className="border border-zinc-600	"
            id="title"
            type="text"
            value={title}
            name="title"
            onChange={({ target }) => setTitle(target.value)}
            placeholder="entry title"
          />
        </div>
        <div className="flex justify-between">
          author
          <input
            className="border border-zinc-600 "
            id="author"
            type="text"
            value={author}
            name="author"
            onChange={({ target }) => setAuthor(target.value)}
            placeholder="entry author"
          />
        </div>
        <div className="flex justify-between">
          url
          <input
            className="border border-zinc-600 "
            id="url"
            type="text"
            value={url}
            name="url"
            onChange={({ target }) => setUrl(target.value)}
            placeholder="entry url"
          />
        </div>
        <div className="flex flex-col py-2">
          <Button>create</Button>
        </div>
      </form>
    </div>
  );
};

export default BlogForm;
