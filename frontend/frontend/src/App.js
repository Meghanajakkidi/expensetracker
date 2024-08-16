import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './Components/Login';
import Signup from './Components/Signup';
import Privateroutes from './Components/Privateroutes';
import Dashboard from './Components/Dashboard';
import Expenselist from './Components/Expenselist';
import Profile from './Components/Profile';
import Createexpense from './Components/Createexpense';
import Users from './Components/Users';
import Changepassword from './Components/Changepassword';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
      <Route path='/login' element = {<Login/>}></Route>
      <Route path='/signup' element = {<Signup/>}></Route>
      <Route element = {<Privateroutes/>}>
      <Route path='/' element = {<Dashboard/>}>
        <Route index element={<Expenselist />} />
      </Route>
      <Route path='/profile' element = {<Profile/>}></Route>
      <Route path='/create-expense' element = {<Createexpense/>}></Route>
      <Route path='/usersList' element = {<Users/>}></Route>
      
      

      <Route path='/change_password' element = {<Changepassword/>}></Route>

      </Route>

      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
