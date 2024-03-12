import { useState } from "react"
import NoteContext from "./NoteContext"

const NoteState = (props) => {
  const host = "https://smartnotevault-backend.onrender.com"
  const notesInitial = [];
  const [notes, setNotes] = useState(notesInitial)

  // Get All Notes
  const getNotes = async () => {
    // TODO API Call
    const response = await fetch(`${host}/api/notes/fetchNotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      }
    });
    const json = await response.json();
    // console.log(json);
    setNotes(json);
  }
  // Add a Note
  const addNote = async (title, description, tag) => {
    // TODO API Call
    const response = await fetch(`${host}/api/notes/addNote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const note = await response.json();
    setNotes(notes.concat(note))
    // console.log(note);
    // console.log("Added a New Note");
  }
  // Delete Note
  const deleteNote = async (id) => {
    const response = await fetch(`${host}/api/notes/deleteNote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      }
    });
    const json = response.json();
    console.log(json);

    console.log("Deleting the note with ID : " + id);
    const newNotes = notes.filter((note) => { return note._id !== id });
    setNotes(newNotes);
  }


  // Edit Note
  const editNote = async (id, title, description, tag) => {
    try {

      // API Call 
      const response = await fetch(`${host}/api/notes/updateNote/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem('token')
        },
        body: JSON.stringify({ title, description, tag }),
      });
      const json = await response.json();
      console.log(json);

      let newNotes = JSON.parse(JSON.stringify(notes))
      // var newNotes = JSON.stringify(notes);
      // Logic to edit in client
      for (let index = 0; index < newNotes.length; index++) {
        const element = newNotes[index];
        if (element._id === id) {
          newNotes[index].title = title;
          newNotes[index].description = description;
          newNotes[index].tag = tag;
          break;
        }
      }
      console.log(newNotes);
      setNotes(newNotes);
    } catch (error) {
      console.log("Not Able the Update Notes at this Moment , Have Patience we will up the API soon")
    }
  }

  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
      {props.children}
    </NoteContext.Provider>
  )
}

export default NoteState;