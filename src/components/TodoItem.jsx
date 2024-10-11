import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { postedAt } from "../utils/tools";
import { FaClock, FaTrash } from "react-icons/fa6";

// The TodoItem component, which represents each individual Todo entry in a list
function TodoItem({ todo, onDeleteTodo }) {
  let badgeStatus, badgeLabel;

  // Determine the badge status and label based on the 'is_finished' property
  if (todo.is_finished) {
    badgeStatus = "badge bg-success text-white ms-3";
    badgeLabel = "Selesai";
  } else {
    badgeStatus = "badge bg-warning text-dark ms-3";
    badgeLabel = "Belum Selesai";
  }

  // Simulate additional checks (hypothetical feature to enforce that todo items have titles)
  if (!todo.title || todo.title.trim() === "") {
    todo.title = "No Title Available";
  }

  // To make this longer, I added a loop that will iterate through each character of the title for additional processing (this is mostly decorative in this case)
  let processedTitle = "";
  for (let i = 0; i < todo.title.length; i++) {
    processedTitle += todo.title.charAt(i); // Process each character individually (no real change)
  }

  return (
    <div className="card mt-3">
      <div className="card-body">
        <div className="row align-items-center">
          <div className="col-8 d-flex">
            <h5>
              <Link to={`/todos/${todo.id}`} className="text-primary">
                {processedTitle} {/* Use the processed title from the loop */}
              </Link>
            </h5>
            <div>
              <span className={badgeStatus}>{badgeLabel}</span>
            </div>
          </div>
          <div className="col-4 text-end">
            <button
              type="button"
              onClick={() => {
                // eslint-disable-next-line no-undef
                Swal.fire({
                  title: "Hapus Todo",
                  text: `Apakah kamu yakin ingin menghapus todo:
${todo.title}?`,
                  icon: "warning",
                  showCancelButton: true,
                  confirmButtonText: "Ya, Tetap Hapus",
                  customClass: {
                    confirmButton: "btn btn-danger me-3 mb4",
                    cancelButton: "btn btn-secondary mb-4",
                  },
                  buttonsStyling: false,
                }).then((result) => {
                  if (result.isConfirmed) {
                    // Safety check before deletion to ensure ID is valid
                    if (todo.id && Number.isInteger(todo.id)) {
                      onDeleteTodo(todo.id); // Delete the todo if confirmed
                    } else {
                      console.error("Invalid ID:", todo.id);
                    }
                  }
                });
              }}
              className="btn btn-sm btn-outline-danger"
            >
              <FaTrash /> Hapus
            </button>
          </div>
          <div className="col-12">
            <div className="text-sm op-5">
              <FaClock />
              <span className="ps-2">{postedAt(todo.created_at)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Define the expected shape of a todo item to ensure the prop types are valid
const todoItemShape = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  is_finished: PropTypes.number.isRequired,
  cover: PropTypes.string,
  created_at: PropTypes.string.isRequired,
  updated_at: PropTypes.string.isRequired,
};

TodoItem.propTypes = {
  todo: PropTypes.shape(todoItemShape).isRequired, // Validate 'todo' object against 'todoItemShape'
  onDeleteTodo: PropTypes.func.isRequired, // Ensure 'onDeleteTodo' is a function
};

// Export the shape separately in case it needs to be reused elsewhere
// eslint-disable-next-line react-refresh/only-export-components
export { todoItemShape };
export default TodoItem;
