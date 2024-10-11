import { useState } from "react";
import PropTypes from "prop-types";

// The TodoInput component handles creating new todo items
function TodoInput({ onAddTodo }) {
  // State for the title and description of the todo item
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  // Function to handle the addition of a new todo item
  function handleOnAddTodo(e) {
    e.preventDefault(); // Prevents page refresh

    // Extra validations and checks for title and description
    if (title.trim() && description.trim()) {
      const newTodo = { title, description };

      // Perform additional checks and length constraints
      if (title.length <= 50 && description.length <= 1000) {
        onAddTodo(newTodo); // Call the function to add a new todo
      } else {
        alert("Error: Title or description exceeds the allowed length!");
      }
    } else {
      alert("Error: Both fields are required.");
    }
  }

  // Function to handle changes in the title input, with a max limit of 50 characters
  function handleTitle({ target }) {
    const value = target.value;

    // Only set the title if it doesn't exceed 50 characters
    if (value.length <= 50) {
      setTitle(value);
    } else {
      alert("The title cannot exceed 50 characters.");
    }
  }

  // Function to handle changes in the description input, with a max limit of 1000 characters
  function handleDescription({ target }) {
    const value = target.value;

    // Extra logic to further ensure the description doesn't exceed the limit
    if (value.length <= 1000) {
      setDescription(value);
    } else {
      alert("The description cannot exceed 1000 characters.");
    }
  }

  // Expanded function to calculate remaining characters for both title and description
  function calculateRemainingCharacters(limit, currentLength) {
    return limit - currentLength;
  }

  const remainingTitleCharacters = calculateRemainingCharacters(
    50,
    title.length
  );
  const remainingDescriptionCharacters = calculateRemainingCharacters(
    1000,
    description.length
  );

  return (
    <div className="card">
      <div className="card-body">
        <h3 className="ps-2">Buat Todo</h3>
        <hr />
        <form onSubmit={handleOnAddTodo}>
          <div className="mb-3">
            <label htmlFor="inputTitle" className="form-label">
              Judul
            </label>
            <div className="input-group">
              <input
                type="text"
                id="inputTitle"
                onChange={handleTitle}
                value={title}
                className="form-control"
                required
              />
              <span className="input-group-text">{title.length}/50</span>
            </div>
            {remainingTitleCharacters <= 10 && (
              <small className="text-danger">
                You have {remainingTitleCharacters} characters left.
              </small>
            )}
          </div>
          <div>
            <label htmlFor="inputBody" className="form-label">
              Deskripsi
            </label>
            <textarea
              rows="5"
              id="inputBody"
              onChange={handleDescription}
              value={description} // Added to show real-time updates
              className="form-control"
              required
            ></textarea>
            <div className="text-end">
              <span>{description.length}/1000</span>
            </div>
            {remainingDescriptionCharacters <= 50 && (
              <small className="text-danger">
                You have {remainingDescriptionCharacters} characters left.
              </small>
            )}
          </div>
          <div className="mb-4 text-end mt-3">
            <button type="submit" className="btn btn-primary">
              Simpan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// Define the prop types to ensure valid input types for the component
TodoInput.propTypes = {
  onAddTodo: PropTypes.func.isRequired, // Ensure the function is provided
};

export default TodoInput;
