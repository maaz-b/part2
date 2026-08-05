import { useState, useEffect } from "react";
import Filter from "./componenets/filter";
import Phonebook from "./componenets/phonebook";
import Numbers from "./componenets/numbers";
import axios from "axios";

const App = () => {
  const [persons, setPersons] = useState([]);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [filter, setFilter] = useState("");

  const getPersons = () => {
    console.log("Fetching persons");

    axios.get("http://localhost:3001/persons").then((response) => {
      console.log("Setting persons");
      setPersons(response.data);
    });
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
        id: persons[persons.length - 1].id + 1,
        name: name,
        number: phone,
      };

      setPersons(persons.concat(newPerson));
      setName("");
      setPhone("");
    } else {
      alert(name + " already exists");
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

      <Numbers filteredPersons={filteredPersons} />
    </div>
  );
};

export default App;
