import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './App.css';
import Taskform from "./Taskform";

function Admin() {
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    // Fetch data from the backend when the component mounts
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8081/admin", {
          params: { username: "admin" }, // replace "admin" with the actual admin username
        });
        setTasks(response.data);
        
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchData();
  }, []);


  const handleLogout = () => {
    
    navigate('/login');
  };
  const handleAddTask = (newTask) => {
    window.location.reload();
  };

  return (
    <div>
      <button onClick={handleLogout} className="lg">Logout</button>
      <div className="container">
        
        <h2>Tasks Assigned <button className="add" onClick={() => setShowForm(true)}>Add +</button></h2>
        {showForm && (
          <div className="task-form">
            {/* Include the TaskForm component */}
            <h3>Add Task</h3>
            <Taskform onAddTask={handleAddTask} onClose={() => setShowForm(false)}/>
          </div>
        )}
        
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>User</th>
              <th>Task</th>
              <th>Status</th>
              <th>Deadline</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => (
              <tr key={task.ID}>
                <td>{task.stud_id}</td>
                <td>{task.username}</td>
                <td>{task.task}</td>
                <td>{task.status}</td>
                <td>{task.deadline}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Admin;
