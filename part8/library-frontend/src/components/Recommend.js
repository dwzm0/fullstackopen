import { useQuery } from "@apollo/client";
import { ALL_BOOKS, GET_ME } from "../queries";

import BooksView from "./BooksView";

const Recommend = () => {
  const userInfo = useQuery(GET_ME);
  console.log(userInfo);

  const genre = userInfo.data?.me?.favouriteGenre;

  console.log(genre);

  const genreBooks = useQuery(ALL_BOOKS, {
    variables: {
      genre: genre,
    },
  });

  console.log(genreBooks);

  const books = genreBooks.data?.allBooks || [];

  return (
    <>
      <BooksView books={books} />
    </>
  );
};

export default Recommend;
