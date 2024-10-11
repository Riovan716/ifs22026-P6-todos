import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { asyncDetailTodo } from "../states/todos/action";
import TodoDetail from "../components/TodoDetail";

function TodoDetailPage() {
  const { id } = useParams();
  const { detailTodo = null } = useSelector((states) => states);
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Tambahkan useNavigate untuk navigasi ke halaman edit

  useEffect(() => {
    if (id) {
      dispatch(asyncDetailTodo(id));
    }
  }, [id, dispatch]);

  return (
    <section>
      <div className="container pt-1">
        {detailTodo != null ? (
          <div
            style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
          >
            <TodoDetail todo={detailTodo} />
            <button
              className="btn btn-primary"
              onClick={() => navigate(`/todos/${id}/edit`)} // Navigasi ke halaman edit
              style={{ alignSelf: "center" }} // Letakkan tombol di tengah
            >
              Edit
            </button>
          </div>
        ) : null}
      </div>
    </section>
  );
}

export default TodoDetailPage;
