import './App.css';
import Navbar from './Components/Navbar';
import { Outlet } from 'react-router-dom'
import NoteState from './Context/notes/NoteState';

function App() {
  return (
    <>
      <NoteState>
        <Navbar />
        <Outlet />
      </NoteState>
    </>
  );
}

export default App;
