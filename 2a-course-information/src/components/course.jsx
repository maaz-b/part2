const Header = (props) => {
  return <h2>{props.course}</h2>;
};

const Part = (props) => {
  return (
    <p>
      {props.part} {props.exercise}
    </p>
  );
};

const Total = (props) => {
  return <p>total of {props.exercises} exercises</p>;
};

const Content = ({ parts }) => {
  return (
    <>
      {parts.map((part) => (
        <Part key={part.id} part={part.name} exercise={part.exercises} />
      ))}
    </>
  );
};

const Course = ({ course }) => {
  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total
        exercises={course.parts.reduce((sum, next) => sum + next.exercises, 0)}
      />
    </div>
  );
};

export default Course;
