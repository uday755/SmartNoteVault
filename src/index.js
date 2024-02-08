import React from 'react';
import ReactDOM from 'react-dom/client';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import './index.css';
import App from './App';
import Home from './Components/Home';
import About from './Components/About';
import SignUp from './Components/SignUp';
import Login from './Components/Login';

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
      },
      {
        path:"createUser", element : <SignUp/>
      },
      {
        path : "login", element:<Login/>
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