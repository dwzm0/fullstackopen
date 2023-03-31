import { useDispatch, useSelector } from "react-redux";
import { updateVote } from "../reducers/anecdoteReducer";
import { setNotif } from "../reducers/notificationReducer";

const Anecdote = ({ anecdote, handleClick }) => {
  return (
    <li>
      {anecdote.content} <button onClick={handleClick}>vote</button>
      <p>has {anecdote.votes} votes </p>
    </li>
  );
};

const AnecdoteList = () => {
  const dispatch = useDispatch();
  const filteredAnecdotes = useSelector(({ anecdotes, filter }) => {
    console.log(anecdotes);
    console.log(filter);
    if (filter.length > 0) {
      return anecdotes.filter((anecdote) =>
        anecdote.content.toLowerCase().includes(filter.toLowerCase())
      );
    } else return anecdotes;
  });

  const handleAddVote = (anecdote) => {
    dispatch(updateVote(anecdote));
    dispatch(setNotif(anecdote.content, 5000));
  };
  return (
    <div>
      <ul>
        {filteredAnecdotes
          .slice()
          .sort((a, b) => b.votes - a.votes)
          .map((anecdote) => (
            <Anecdote
              key={anecdote.id}
              anecdote={anecdote}
              handleClick={() => handleAddVote(anecdote)}
            />
          ))}
      </ul>
    </div>
  );
};

export default AnecdoteList;
