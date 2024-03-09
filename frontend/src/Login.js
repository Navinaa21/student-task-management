import React, { useState } from 'react';
import { useNavigate} from 'react-router-dom';
import './App.css';
import axios from 'axios';
function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate=useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
        const response = await axios.post('http://localhost:8081/login', {
            username,
            password,
        });

      const data = response.data;

      if (response.status === 200) {
        const { role } = data;
        console.log(data.message);

        if (role === 'admin') {
          console.log('Redirecting to admin page');
          navigate('/admin');
        } else if (role === 'student') {
          console.log('Redirecting to student page');
          navigate(`/student?id=${username}`);
        } else {
          console.error('Invalid role');
          window.alert('Invalid credentials. Please try again.');
        }
      } else {
        console.error(data.error);
        window.alert('Invalid credentials. Please try again.');
      }

    } catch (error) {
      console.error('Fetch error:', error);
    }
  };

  return (
    <div className="App">
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
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
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
