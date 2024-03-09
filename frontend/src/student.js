import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import { useLocation,useNavigate } from 'react-router-dom';
import DownloadDoneIcon from '@mui/icons-material/DownloadDone';
import { Button, Menu, MenuItem } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
function Student() {
  const [tasks, setTasks] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const username = queryParams.get('username');
  const navigate = useNavigate();

  const fetchTasks = async () => {
    try {
      const response = await axios.get(`http://localhost:8081/student/tasks?username=${username}`);
      setTasks(response.data);
    } catch (error) {
      console.error('Fetch error:', error);
    }
  };

  useEffect(() => {
    // Fetch student tasks when the component mounts
    fetchTasks();
  }, [username]); // Add dependencies if needed

  const handleMarkCompleted = async (taskId) => {
    try {
      await axios.post('http://localhost:8081/student/mark-completed', {
        taskId,
      });
      // Refresh the tasks after marking as completed
      fetchTasks();
    } catch (error) {
      console.error('Fetch error:', error);
    }
  };


  const handleFilterChange = (status) => {
    setFilterStatus(status);
  };



  const filteredTasks = tasks.filter((task) => {
    if (filterStatus === 'all') {
      return true;
    }
    return task.status === filterStatus;
  });



  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };


  const handleLogout = () => {
    
    navigate('/login');
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }} className='nav'>
        <Button onClick={handleMenuClick} ><MenuIcon/></Button>

        <div >

          <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
            <MenuItem onClick={() => handleFilterChange('all')}>All tasks</MenuItem>
            <MenuItem onClick={() => handleFilterChange('pending')}>Pending tasks</MenuItem>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
          <span >
            <div style={{ marginLeft: '40px' }}>
              <AccountCircleIcon/>
            </div>
            Welcome!! {username}
          </span>
        </div>
      </div>
      <h1 className='tskn'>{filterStatus === 'pending' ? 'Pending Tasks' : 'Tasks'}</h1>
      <div className='table-container'>
        <table >
          <thead>
            <tr>
              <th>ID</th>
              <th>Task</th>
              <th>Status</th>
              <th>Deadline</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredTasks.map((task) => (
              <tr key={task.task}>
                <td>{task.stud_id}</td>
                <td>{task.task}</td>
                <td>{task.status}</td>
                <td>{task.deadline}</td>
                <td>
                  {task.status === 'pending' && (
                    <button className='mc' onClick={() => handleMarkCompleted(task.task)}>Mark as Completed</button>
                  )}
                  {task.status === 'completed' && (
                    <h1 style={{color: 'green'}}>
                      <DownloadDoneIcon />
                    </h1>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Student;


