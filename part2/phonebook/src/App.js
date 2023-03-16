import { useState, useEffect } from "react";
import axios from "axios";
import Filter from "./components/Filter";
import Form from "./components/PersonForm";
import Persons from "./components/Persons";
import Notification from "./components/Notification";
import Errormsg from "./components/Errormsg";
import personsService from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newSearch, setNewSearch] = useState("");
  const [message, setMessage] = useState(null);
  const [errorMsg, setErrorMessage] = useState(null);

  useEffect(() => {
    personsService.getAll().then((initialPersons) => {
      setPersons(initialPersons);
    });
  }, []);

  const addPersone = (e) => {
    e.preventDefault();
    const personeObject = {
      name: newName,
      number: newNumber,
    };
    for (let i = 0; i < persons.length; i++) {
      if (
        JSON.stringify(persons[i].name) === JSON.stringify(newName) &&
        JSON.stringify(persons[i].number) === JSON.stringify(newNumber)
      ) {
        setNewName("");
        setNewNumber("");
        return alert(`${newName} is already added to phonebook`);
      }
      if (
        JSON.stringify(persons[i].name) === JSON.stringify(newName) &&
        JSON.stringify(persons[i].number) !== JSON.stringify(newNumber)
      ) {
        if (window.confirm("Do you want to update the number?")) {
          const changedPersone = { ...persons[i], number: newNumber };
          setNewName("");
          setNewNumber("");
          return personsService
            .updateNumber(persons[i].id, changedPersone)
            .then((returnedPersone) => {
              setPersons(
                persons.map((person) =>
                  person.id !== persons[i].id ? person : returnedPersone
                )
              );
            })
            .catch((error) => {
              setErrorMessage(
                `Information of ${persons[i].name} has already been removed from the server.`
              );
              setTimeout(() => {
                setErrorMessage(null);
              }, 2000);
            });
        } else {
          setNewName("");
          setNewNumber("");
          return;
        }
      }
    }

    personsService.create(personeObject).then((returnedPersone) => {
      setPersons(persons.concat(returnedPersone));
      setNewName("");
      setNewNumber("");
    });
    setMessage(`Added ${personeObject.name}`);
    setTimeout(() => {
      setMessage(null);
    }, 2000);
  };

  const handelPersoneChange = (e) => {
    setNewName(e.target.value);
  };

  const handelPersoneNumChange = (e) => {
    setNewNumber(e.target.value);
  };

  const filterBook = (e) => {
    setNewSearch(e.target.value);
    let regexp = new RegExp(`^${newSearch}`, "gi");
    setPersons(persons.filter((person) => person.name.match(regexp)));
  };

  const handleDelete = (id) => {
    if (window.confirm("Do you want do delete?")) {
      personsService.deletePersone(id).then((returnedPersones) => {
        setPersons(
          persons.map((person) =>
            person.id !== id ? person : returnedPersones
          )
        );
        window.location.reload();
      });
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />
      <Errormsg message={errorMsg} />
      <Filter value={newSearch} handleChange={filterBook} />
      <h2>add a new</h2>
      <Form
        handleSubmit={addPersone}
        value={[newName, newNumber]}
        handleChange={[handelPersoneChange, handelPersoneNumChange]}
      />
      <h2>Numbers</h2>
      <Persons persons={persons} handleDelete={handleDelete} />
    </div>
  );
};

export default App;
