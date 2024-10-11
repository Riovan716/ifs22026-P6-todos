import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import TodoList from "../components/TodoList";
import {
  asyncGetTodos,
  asyncDeleteTodo,
  deleteTodoActionCreator,
} from "../states/todos/action";

// HomePage component to display the list of todos
function HomePage() {
  // Use the useSelector hook to access todos and isDeleteTodo from the Redux state
  const { todos = [], isDeleteTodo = false } = useSelector((states) => states);

  // Create a query string object to extract URL parameters
  const queryParams = new URLSearchParams(location.search);
  const is_finished = queryParams.get("is_finished") || ""; // Get the 'is_finished' parameter from the URL

  const dispatch = useDispatch(); // Use the useDispatch hook to dispatch actions to the Redux store

  // useEffect hook to perform side effects when the component mounts or when dependencies change
  useEffect(() => {
    // If a todo item has been successfully deleted
    if (isDeleteTodo) {
      // Display a success message using Swal (SweetAlert)
      // eslint-disable-next-line no-undef
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Todo berhasil dihapus!",
        showConfirmButton: false,
        timer: 700,
      });
      dispatch(deleteTodoActionCreator(false)); // Reset the isDeleteTodo state to false
    }
    // Dispatch an action to fetch todos based on the 'is_finished' filter
    dispatch(asyncGetTodos(is_finished));
  }, [dispatch, isDeleteTodo, is_finished]); // Dependencies array to control when the effect runs

  // Function to handle deleting a todo item
  const onDeleteTodo = (id) => {
    dispatch(asyncDeleteTodo(id)); // Dispatch the async action to delete the todo item
  };

  return (
    <section>
      <div className="container pt-1">
        {/* Render the TodoList component and pass the todos and onDeleteTodo handler as props */}
        <TodoList todos={todos} onDeleteTodo={onDeleteTodo}></TodoList>
      </div>
    </section>
  );
}

export default HomePage;
