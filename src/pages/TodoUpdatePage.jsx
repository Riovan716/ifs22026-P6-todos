import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import {
  asyncDetailTodo,
  asyncUpdateTodo,
  updateTodoActionCreator,
} from "../states/todos/action";
import Swal from "sweetalert2"; // Import Swal

const TodoUpdatePage = () => {
  const { id } = useParams(); // mendapatkan ID dari URL
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Mengambil detail todo dari state
  const todo = useSelector((state) => state.detailTodo);
  const isUpdateTodo = useSelector((state) => state.isUpdateTodo);

  // Menyimpan form data di state
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    is_finished: false, // Initialize is_finished
  });

  // Mengambil detail todo saat halaman dimuat
  useEffect(() => {
    dispatch(asyncDetailTodo(id));
  }, [dispatch, id]);

  // Mengisi form dengan data todo yang sudah ada
  useEffect(() => {
    if (todo) {
      setFormData({
        title: todo.title,
        description: todo.description,
        is_finished: todo.is_finished, // Set is_finished from existing todo
      });
    }
  }, [todo]);

  // Jika todo berhasil diupdate, navigasikan ke homepage
  useEffect(() => {
    if (isUpdateTodo) {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Todo berhasil diupdate!",
        showConfirmButton: false,
        timer: 700,
      });
      navigate("/"); // Arahkan ke homepage setelah update
      dispatch(updateTodoActionCreator(false)); // Reset status update
    }
  }, [isUpdateTodo, navigate, dispatch]);

  // Fungsi untuk menangani perubahan input form
  const handleChange = (e) => {
    const { name, type, checked, value } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value, // Handle checkbox input
    });
  };

  // Fungsi untuk menangani submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(asyncUpdateTodo({ id, ...formData }));
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.message || "Something went wrong!",
      });
    }
  };

  return (
    <div
      style={{
        maxWidth: "600px",
        margin: "0 auto",
        padding: "20px",
        backgroundColor: "#f9f9f9",
        borderRadius: "8px",
        boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
      }}
    >
      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>Edit Todo</h1>
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column" }}
      >
        <div style={{ marginBottom: "20px" }}>
          <label
            htmlFor="title"
            style={{
              display: "block",
              marginBottom: "8px",
              fontWeight: "bold",
            }}
          >
            Title:
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "4px",
              border: "1px solid #ccc",
              fontSize: "16px",
            }}
          />
        </div>
        <div style={{ marginBottom: "20px" }}>
          <label
            htmlFor="description"
            style={{
              display: "block",
              marginBottom: "8px",
              fontWeight: "bold",
            }}
          >
            Description:
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "4px",
              border: "1px solid #ccc",
              fontSize: "16px",
              resize: "vertical",
            }}
          />
        </div>
        <div style={{ marginBottom: "20px" }}>
          <label
            htmlFor="is_finished"
            style={{
              display: "flex",
              alignItems: "center",
              fontWeight: "bold",
            }}
          >
            <input
              type="checkbox"
              id="is_finished"
              name="is_finished"
              checked={formData.is_finished}
              onChange={handleChange}
              style={{ marginRight: "10px" }}
            />
            Finished
          </label>
        </div>
        <button
          type="submit"
          style={{
            padding: "10px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Update Todo
        </button>
      </form>
    </div>
  );
};

export default TodoUpdatePage;
