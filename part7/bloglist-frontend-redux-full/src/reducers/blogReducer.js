import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";

const blogSlice = createSlice({
  name: "blogs",
  initialState: [],
  reducers: {
    createBlog(state, action) {
      state.push(action.payload);
    },
    addLike(state, action) {
      const id = action.payload.id;
      const blogToChange = state.find((n) => n.id === id);
      const changedBlog = {
        ...blogToChange,
        likes: blogToChange.likes + 1,
      };
      return state.map((blog) => (blog.id !== id ? blog : changedBlog));
    },
    appendBlog(state, action) {
      state.push(action.payload);
    },
    setBlogs(state, action) {
      return action.payload;
    },
    deleteBlog(state, action) {
      const id = action.payload.id;
      return state.filter((blog) => blog.id !== id);
    },
    addComment(state, action) {
      const id = action.payload.id;
      const comment = action.payload.comment;
      state.map((blog) => {
        blog.id === id
          ? { ...blog, comments: blog.comments.push(comment) }
          : blog;
      });
      return state;
    },
  },
});

export const { appendBlog, setBlogs, addLike, deleteBlog, addComment } =
  blogSlice.actions;

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    dispatch(setBlogs(blogs));
  };
};

export const createBlog = (content) => {
  return async (dispatch) => {
    const newBlog = await blogService.create(content);
    dispatch(appendBlog(newBlog));
  };
};

export const addNewLike = (obj) => {
  return async (dispatch) => {
    const objToChange = await blogService.like(obj);
    dispatch(addLike(objToChange));
  };
};

export const delBlog = (obj) => {
  return async (dispatch) => {
    await blogService.deleteBlog(obj.id);
    dispatch(deleteBlog(obj));
  };
};

export const addNewComment = (obj) => {
  return async (dispatch) => {
    await blogService.createComment(obj);
    dispatch(addComment(obj));
  };
};

export default blogSlice.reducer;
