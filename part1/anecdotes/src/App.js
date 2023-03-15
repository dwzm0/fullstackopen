import { useState } from "react";

const Header = (props) => <h1>{props.text}</h1>;

const Anecdote = (props) => <p>{props.text}</p>;

const Button = (props) => (
  <button onClick={props.handleClick}>{props.text}</button>
);

const Votes = (props) => <p>has {props.votes} votes</p>;

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ];

  const [selected, setSelected] = useState(0);
  const [points, setPoint] = useState(Array(anecdotes.length).fill(0));
  const [top, setTop] = useState();
  const [currentVotes, setVotes] = useState(0);

  const randomSelect = () => {
    const randomNum = Math.floor(Math.random() * (anecdotes.length - 0) + 0);
    setSelected(randomNum);
    setVotes(points[randomNum]);
  };
  const vote = () => {
    const copy = points;
    copy[selected] += 1;
    setPoint(copy);
    setTop(points.slice().indexOf(Math.max(...points)));
    setVotes(points[selected]);
  };

  return (
    <div>
      <Header text="Anecdote of the day" />
      <Anecdote text={anecdotes[selected]} />
      <Votes votes={currentVotes} />
      <Button handleClick={vote} text="vote please" />
      <Button handleClick={randomSelect} text="next anecdote" />
      <Header text="Anecdote with most votes" />
      <Anecdote text={anecdotes[top]} />
    </div>
  );
};

export default App;
