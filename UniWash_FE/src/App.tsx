import React from 'react';
import './App.css';
import UserDashboard from "./App/Screens/UserDashboard/UserDashboard";
import { Route, Routes } from "react-router";
import Reservations from "./App/Screens/Reservations/Reservations";
import Messages from "./App/Screens/Messages/Messages";
import Login from './App/Screens/Login/Login';

function App() {
  return (
    <div>
      <Routes>
          <Route path = "/" element = {<Login/>}/>
          <Route path = "/dashboard" element = {<UserDashboard/>}/>
          <Route path = "/reservations" element={<Reservations/>}/>
          <Route path = "/messages" element={<Messages/>}/>
      </Routes>
    </div>
  );
}

export default App;
