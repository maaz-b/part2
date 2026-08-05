import { useState, useEffect } from "react";
import Filter from "./componenets/filter";
import Phonebook from "./componenets/phonebook";
import Numbers from "./componenets/numbers";
import personService from "./services/axios_service";

const App = () => {
  const [persons, setPersons] = useState([]);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [filter, setFilter] = useState("");

  const getPersons = () => {
    console.log("Fetching persons");

    personService.getAll().then((data) => {
      console.log("Setting persons");
      setPersons(data);
    });
  };

  const onDeletePerson = (id) => {
    if (window.confirm("Are you sure you want to delete the entry?")) {
      console.log("Deleting functions");
      personService.deletePerson(id).then(() => {
        const newPersons = persons.filter((person) => !(person.id === id));
        setPersons(newPersons);
      });
    }
  };

  useEffect(getPersons, []);

  const onNameChange = (event) => {
    setName(event.target.value);
  };

  const onPhoneChange = (event) => {
    setPhone(event.target.value);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    if (!persons.some((person) => person.name === name)) {
      const newPerson = {
        name: name,
        number: phone,
      };

      personService.createPerson(newPerson).then((data) => {
        setPersons(persons.concat(data));
      });

      console.log("Person added");

      setName("");
      setPhone("");
    } else {
      if (
        window.confirm(
          "The person already exists, do you want to update the number?",
        )
      ) {
        const id = persons.find((person) => person.name === name).id;
        const newPerson = {
          name: name,
          number: phone,
        };

        personService.editPerson(id, newPerson).then((data) => {
          const newPersons = persons.map((person) =>
            person.id === id ? data : person,
          );
          setPersons(newPersons);
        });
        console.log("Person edited");
      }
      setName("");
      setPhone("");
    }
  };

  const onSearchChange = (event) => {
    setFilter(event.target.value);
  };

  const filteredPersons = !(filter === "")
    ? persons.filter((person) =>
        person.name.toLowerCase().includes(filter.toLowerCase()),
      )
    : persons;

  return (
    <div>
      <Filter filter={filter} onSearchChange={onSearchChange} />

      <Phonebook
        onSubmit={onSubmit}
        onNameChange={onNameChange}
        onPhoneChange={onPhoneChange}
        name={name}
        phone={phone}
      />

      <Numbers
        filteredPersons={filteredPersons}
        onDeletePerson={onDeletePerson}
      />
    </div>
  );
};

export default App;
