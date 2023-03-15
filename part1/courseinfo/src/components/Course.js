const Header = ({ course }) => <h1>{course}</h1>;

const Course = ({ course }) => {
  return (
    <div>
      <Header course={course.name} />
      <Content course={course} />
      <Total course={course} />
    </div>
  );
};

const Content = ({ course }) => {
  return (
    <ul>
      {course.parts.map((part) => (
        <Part key={part.id} part={part} />
      ))}
    </ul>
  );
};

const Part = ({ part }) => {
  return (
    <li>
      {part.name} {part.exercises}
    </li>
  );
};

const Total = ({ course }) => {
  const partsArr = course.parts;
  return (
    <p>
      Total of {partsArr.reduce((acc, part) => acc + part.exercises, 0)}{" "}
      exercises
    </p>
  );
};

export default Course;
