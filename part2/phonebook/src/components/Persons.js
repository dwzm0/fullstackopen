import Person from "./Person";

const Persons = ({ persons, handleDelete }) => {
  console.log(persons);
  return (
    <ul>
      {persons.map((person) => (
        <Person
          key={person.id}
          person={person}
          handleDelete={() => handleDelete(person.id)}
        />
      ))}
    </ul>
  );
};

export default Persons;
