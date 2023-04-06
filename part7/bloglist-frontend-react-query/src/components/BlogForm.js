const BlogForm = ({ createBlog }) => {
  const addBlog = (e) => {
    e.preventDefault();
    const title = e.target.title.value;
    const author = e.target.author.value;
    const url = e.target.url.value;
    e.target.title.value = "";
    e.target.author.value = "";
    e.target.url.value = "";

    createBlog({ title, author, url, likes: 0 });
  };
  return (
    <div>
      <h2>add one more</h2>
      <form onSubmit={addBlog}>
        <div>
          title
          <input
            id="title"
            type="text"
            name="title"
            placeholder="entry title"
          />
        </div>
        <div>
          author
          <input
            id="author"
            type="text"
            name="author"
            placeholder="entry author"
          />
        </div>
        <div>
          url
          <input id="url" type="text" name="url" placeholder="entry url" />
        </div>
        <button id="create-button" type="submit">
          create
        </button>
      </form>
    </div>
  );
};

export default BlogForm;
