import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import CommentForm from "./CommentForm";

const CommentView = () => {
  const { id } = useParams();
  const currBlog = useSelector((state) =>
    state.blogs.find((blog) => blog.id === id)
  );

  return (
    <>
      <h3>comments</h3>
      <CommentForm id={id} />
      <ul>
        {currBlog.comments.map((comment, index) => (
          <li key={index}>{comment}</li>
        ))}
      </ul>
      {!currBlog.comments.length && <p>no comments to display</p>}
    </>
  );
};

export default CommentView;
