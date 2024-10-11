import PropTypes from "prop-types";
import TodoItem, { todoItemShape } from "./TodoItem";

// Functional component to display a list of to-do items
function TodoList({ todos, onDeleteTodo }) {
  return (
    <div>
      {/* Map through the list of todos and render a TodoItem component for each one */}
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} onDeleteTodo={onDeleteTodo} />
      ))}
    </div>
  );
}

// Define prop types to validate the props passed to the TodoList component
TodoList.propTypes = {
  // todos should be an array of objects matching the shape defined by todoItemShape
  todos: PropTypes.arrayOf(PropTypes.shape(todoItemShape)).isRequired,
  // onDeleteTodo should be a function
  onDeleteTodo: PropTypes.func.isRequired,
};

export default TodoList;
