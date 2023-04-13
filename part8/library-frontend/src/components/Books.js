import { useState } from "react";
import { useQuery } from "@apollo/client";
import { ALL_BOOKS } from "../queries";

import BooksView from "../components/BooksView";

const Books = () => {
  const [genre, setGenre] = useState("");
  const booksRes = useQuery(ALL_BOOKS, { variables: genre });
  console.log(booksRes);

  const books = booksRes.data?.allBooks || [];

  const uniqueGengres = new Set([].concat(...books.map((b) => b.genres)));

  if (booksRes.loading) {
    return <div>loading...</div>;
  }
  return (
    <div>
      <h2>books</h2>
      {genre.genre && (
        <p>
          in genre <b>{genre.genre}</b>
        </p>
      )}
      {[...uniqueGengres].map((genre) => (
        <button onClick={() => setGenre({ genre })} key={genre}>
          {genre}
        </button>
      ))}
      <button onClick={() => setGenre("")}>all genres</button>
      <BooksView books={books} />
    </div>
  );
};

export default Books;
