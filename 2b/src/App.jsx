import { useState } from "react";
import Filter from "./componenets/filter";
import Phonebook from "./componenets/phonebook";
import Numbers from "./componenets/numbers";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [filter, setFilter] = useState("");

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
