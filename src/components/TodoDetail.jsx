import PropTypes from "prop-types";
import { todoItemShape } from "./TodoItem";
import { postedAt } from "../utils/tools";
import { FaClock } from "react-icons/fa6";

// Functional component for displaying the details of a to-do item
function TodoDetail({ todo }) {
  let badgeStatus, badgeLabel;

  // Determine the badge status and label based on whether the to-do item is finished
  if (todo.is_finished) {
    badgeStatus = "badge bg-success text-white ms-3"; // Green badge for completed tasks
    badgeLabel = "Selesai"; // Label indicating the task is completed
  } else {
    badgeStatus = "badge bg-warning text-dark ms-3"; // Yellow badge for incomplete tasks
    badgeLabel = "Belum Selesai"; // Label indicating the task is not yet completed
  }

  return (
    <div className="card mt-3">
      <div className="card-body">
        <div className="row align-items-center">
          <div className="col-12 d-flex">
            {/* Display the title of the to-do item */}
            <h5>{todo.title}</h5>
            <div>
              {/* Display the badge indicating the status of the to-do item */}
              <span className={badgeStatus}>{badgeLabel}</span>
            </div>
          </div>
          <div className="col-12">
            <div className="text-sm op-5">
              {/* Display the creation date of the to-do item with a clock icon */}
              <FaClock />
              <span className="ps-2">{postedAt(todo.created_at)}</span>
            </div>
          </div>
          <div className="col-12">
            <hr />
            {/* Display the description of the to-do item */}
            {todo.description}
          </div>
        </div>
      </div>
    </div>
  );
}

// Define prop types to ensure that the todo prop matches the shape of a to-do item
TodoDetail.propTypes = {
  todo: PropTypes.shape(todoItemShape).isRequired,
};

export default TodoDetail;
