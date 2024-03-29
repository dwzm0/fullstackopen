import { useEffect } from "react";
import NewAnecdote from "./components/AnecdoteForm";
import AnecdoteList from "./components/AnecdoteList";
import Filter from "./components/Filter";
import Notification from "./components/Notification";
import { useDispatch } from "react-redux";
import { initializeAnecdotes } from "./reducers/anecdoteReducer";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeAnecdotes());
  }, [dispatch]);

  return (
    <div>
      <h1>Anecdotes</h1>
      <Notification />
      <AnecdoteList />
      <Filter />
      <NewAnecdote />
    </div>
  );
};

export default App;
