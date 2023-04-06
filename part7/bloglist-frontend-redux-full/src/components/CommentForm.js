import { useState } from "react";
import { useDispatch } from "react-redux";
import { addNewComment } from "../reducers/blogReducer";
import Button from "./Button";

const CommentForm = ({ id }) => {
  const dispatch = useDispatch();
  const [comment, setComment] = useState("");

  const addComment = (e) => {
    e.preventDefault();
    setComment("");
    dispatch(addNewComment({ id, comment }));
  };

  return (
    <form onSubmit={addComment}>
      <input
        className="border border-zinc-600"
        id="comment"
        type="text"
        name="comment"
        onChange={({ target }) => setComment(target.value)}
        placeholder="comment as u wish"
      />
      <Button>add comment</Button>
    </form>
  );
};

export default CommentForm;
