import React from 'react'

import './App.css';
import { Routes } from './Routes'
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <>
    <Routes />
    <ToastContainer 
      autoClose={3000}
      theme='dark'
      position="bottom-right"/>
    </>
  );
}

export default App;
