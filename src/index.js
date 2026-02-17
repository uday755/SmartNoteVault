import React from 'react';
import ReactDOM from 'react-dom/client';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import './index.css';
import App from './App';
import Home from './Components/Home';
import About from './Components/About';
import SignUp from './Components/SignUp';
import Login from './Components/Login';
import AddNote from './Components/AddNote';
import EditNote from './Components/EditNote';

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
      },
      {
        path : "notes/new-note", element:<AddNote/>
      },
      {
        path : "notes/edit/:id", element:<EditNote/>
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