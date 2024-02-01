import './App.css';
import Navbar from './Components/Navbar';
import { Outlet } from 'react-router-dom'
import NoteState from './Context/notes/NoteState';
import Alert from './Components/Alert';

function App() {
  return (
    <>
      <NoteState>
        <Navbar />
        <Alert message ="This is amazing React Library" />
        <div className="container">
        <Outlet />
        </div>
      </NoteState>
    </>
  );
}

export default App;
