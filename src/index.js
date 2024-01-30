import React from 'react';
import ReactDOM from 'react-dom/client';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import './index.css';
import App from './App';
import Home from './Components/Home';
import About from './Components/About';

const router = createBrowserRouter([
  {
    path : '/',
    element : <App/>,
    children : [
      {
          path:"", element : <Home/>
      },
      {
          path:"about" , element : <About/>
      }
    ]
    
  }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router = {router} />
  </React.StrictMode>
);