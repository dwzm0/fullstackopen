import { useState } from "react";

const Button = (props) => (
  <button onClick={props.handleClick}>{props.text}</button>
);

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const incrementGood = () => {
    setGood(good + 1);
  };

  const incrementNeutral = () => {
    setNeutral(neutral + 1);
  };

  const incrementBad = () => {
    setBad(bad + 1);
  };

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={() => incrementGood()} text="good" />
      <Button handleClick={() => incrementNeutral()} text="neutral" />
      <Button handleClick={() => incrementBad()} text="bad" />
      <h2>statistics</h2>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

const StatisticLine = (props) => {
  return (
    <tr>
      <td>{props.text}</td>
      <td>{props.value}</td>
    </tr>
  );
};

const Statistics = ({ good, neutral, bad }) => {
  if (good === 0 && neutral === 0 && bad === 0) {
    return (
      <>
        <p>No feedback given</p>
      </>
    );
  } else
    return (
      <table>
        <tbody>
          <StatisticLine text="good " value={good} />
          <StatisticLine text="neutral " value={neutral} />
          <StatisticLine text="bad " value={bad} />
          <StatisticLine text="all " value={good + neutral + bad} />
          <StatisticLine
            text="average "
            value={(good - bad) / (good + neutral + bad)}
          />
          <StatisticLine
            text="positive "
            value={(good / (good + bad + neutral)) * 100}
          />
        </tbody>
      </table>
    );
};

export default App;
