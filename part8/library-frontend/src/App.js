import { useState } from "react";
import { useQuery, useApolloClient, useSubscription } from "@apollo/client";
import { ALL_AUTHORS, ALL_BOOKS, BOOK_ADDED } from "./queries";

import Menu from "./components/Menu";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import LoginForm from "./components/LoginForm";
import Recommend from "./components/Recommend";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

const Notify = ({ errorMessage }) => {
  if (!errorMessage) {
    return null;
  }
  return <div style={{ color: "red" }}>{errorMessage}</div>;
};

export const updateCache = (cache, query, bookAdded) => {
  const uniqByName = (a) => {
    let seen = new Set();
    return a.filter((item) => {
      let k = item.title;
      return seen.has(k) ? false : seen.add(k);
    });
  };

  cache.updateQuery(query, ({ allBooks }) => {
    return {
      allBooks: uniqByName(allBooks.concat(bookAdded)),
    };
  });
};

const App = () => {
  const [token, setToken] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const authorsRes = useQuery(ALL_AUTHORS);

  const client = useApolloClient();

  useSubscription(BOOK_ADDED, {
    onData: ({ data }) => {
      const bookAdded = data.data.bookAdded;
      alert(`${bookAdded.title} has been added`);
      updateCache(client.cache, { query: ALL_BOOKS }, bookAdded);
    },
  });

  const notify = (message) => {
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage(null);
    }, 10000);
  };

  const logout = () => {
    setToken(null);
    localStorage.clear();
    client.resetStore();
  };

  if (authorsRes.loading) {
    return <div>loading...</div>;
  }

  return (
    <Router>
      <div>
        <Menu token={token} handleLogOut={logout} />
        <Notify errorMessage={errorMessage} />
        <Routes>
          <Route path="/recommend" element={<Recommend />} />
          <Route
            path="/authors"
            element={
              <Authors authors={authorsRes.data.allAuthors} token={token} />
            }
          />
          <Route path="/" element={<Books />} />
          <Route
            path="/add"
            element={
              token ? (
                <NewBook setAuthor={setErrorMessage} />
              ) : (
                <Navigate replace to="/login" />
              )
            }
          />
          <Route
            path="/login"
            element={<LoginForm setToken={setToken} setError={notify} />}
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
