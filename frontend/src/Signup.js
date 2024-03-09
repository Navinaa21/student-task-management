import React, { useState } from 'react';
import { useNavigate} from 'react-router-dom';
import './App.css';
import axios from 'axios';
function Signup() {
  const [ID, setID] = useState('');  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate=useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
        const response = await axios.post('http://localhost:8081/', {
            ID,
            username,
            password,
        });

      const data = response.data;

      if (response.status === 200) {
        console.log(data.message);
        navigate('/login')
      } else {
        console.error(data.error);
      }
    } catch (error) {
      console.error('Fetch error:', error);
    }
  };

  return (
    <div className="App">
      <h1>Signup</h1>
      <form onSubmit={handleLogin}>
      <label>
          Student id:
          <input type="text" value={ID} onChange={(e) => setID(e.target.value)} />
        </label>
        <br />
        <label>
          Username:
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </label>
        <br />
        <label>
          Password:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <br />
        <button type="submit">Signup</button>
      </form>
    </div>
  );
}

export default Signup;