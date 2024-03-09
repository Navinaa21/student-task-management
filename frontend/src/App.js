import Admin from "./Admin.js";
import Login from "./Login.js";
import Signup from "./Signup.js";
import Student from "./student.js";
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import {  ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
function App() {
  return (
    <div>
    <ToastContainer />
    <BrowserRouter>
    <Routes>
      <Route path='/student' element={<Student/>}></Route>
      <Route path='/login' element={<Login/>}></Route>
      <Route path='/admin' element={<Admin/>}></Route>
      <Route path='/' element={<Signup/>}></Route>
    </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
