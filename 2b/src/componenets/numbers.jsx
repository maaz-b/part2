const Numbers = ({ filteredPersons }) => {
  return (
    <div>
      <h1>Numbers</h1>
      <ul>
        {filteredPersons.map((person) => {
          return (
            <li key={person.id}>
              {person.name} {person.number}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Numbers;
