import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Home from './Pages/Home';
import AddBook from './Pages/addBook';
import Login from './Pages/login';
import Register from './Pages/register';

function privateRoute( {children, roleRequired}) {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');
  return token && role === roleRequired ? children : <Navigate to="/login" />;

}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/api/books' element={<Home />} />
        <Route path='/add' element= {
          <privateRoute roleRequired = 'admin'>
            <AddBook />
          </privateRoute>
        } />
        <Route path = '/login' element = {<Login />} />
        <Route path = '/register' element = {<Register />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;