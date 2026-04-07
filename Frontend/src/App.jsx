import React from 'react'
import { Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';

export const serverUrl = "http://localhost:9000/api/auth"


function App() {
  return (
    <Routes>
      <Route path='/login' element={<Login/>}></Route>
      <Route path='/signup' element={<Signup/>} ></Route>
    </Routes>
  );
};

export default App
