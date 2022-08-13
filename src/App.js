import React from 'react'

import './App.css';
import { AllRoutes } from './Routes'
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <>
    <AllRoutes />
    <ToastContainer 
      autoClose={3000}
      // theme='white'
      position="top-right"/>
    </>
  );
}

export default App;
