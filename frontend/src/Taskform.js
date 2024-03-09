// TaskForm.js
import './App.css';
import React, { useState } from "react";
import axios from "axios";
import CloseIcon from '@mui/icons-material/Close';
function TaskForm({ onAddTask, onClose }) {
  const [name, setName] = useState("");
  const [ID, setID] = useState("");
  const [task, setTask] = useState("");
  const [deadline, setDeadline] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:8081/admin/add-task", {
        ID,
        name,
        task,
        deadline,
      });

      onAddTask(response.data);
      onClose(); // Close the modal after submission
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  return (
    <div className="modal">
      <div className="card task-form">
      <button className="close-button" onClick={onClose}>
        <CloseIcon/>
        </button>
        <h3>Add Task</h3>
        <form onSubmit={handleSubmit}>
        
          <label>
            Student id:
            <input type="text" value={ID} onChange={(e) => setID(e.target.value)} required />
          </label>
          <label>
            Name:
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
          </label>
          <label>
            Task:
            <input type="text" value={task} onChange={(e) => setTask(e.target.value)} required />
          </label>
          <label>
            Deadline:
            <input type="date" value={deadline} onChange={(e) => setDeadline(e.target.value)} required />
          </label>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default TaskForm;

