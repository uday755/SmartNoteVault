import { useState } from "react"
import NoteContext from "./NoteContext"

const NoteState = (props) => {
  const host = "http://localhost:5000"
  const notesInitial = [];
  const [notes, setNotes] = useState(notesInitial)

  // Get All Notes
  const getNotes = async () => {
    // TODO API Call
    const response = await fetch(`${host}/api/notes/fetchNotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjViNmJhZTVmNWIzODQ2ZDg3MDNmMjFhIn0sImlhdCI6MTcwNjQ3NDI4MX0.8O3AtsClfK0Xlc1WA80bwXfu2minNNxA2SW00IgAvhQ"
      }
    });
    const json = await response.json();
    console.log(json);
    setNotes(json);
  }
  // Add a Note
  const addNote = async (title, description, tag) => {
    // TODO API Call
    const response = await fetch(`${host}/api/notes/addNote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjViNmJhZTVmNWIzODQ2ZDg3MDNmMjFhIn0sImlhdCI6MTcwNjQ3NDI4MX0.8O3AtsClfK0Xlc1WA80bwXfu2minNNxA2SW00IgAvhQ"
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const json = await response.json();
    console.log(json);

    const note =
    {
      "_id": "65b805bcd0c9f9cehcf9b62c32",
      "user": "65b6bae5f5b3846d8703f21a",
      "title": title,
      "description": description,
      "tag": tag,
      "date": "2024-01-29T20:08:28.403Z",
      "__v": 0
    }
    setNotes(notes.concat(note))
    console.log("Added a New Note");
  }
  // Delete Note
  const deleteNote = async (id) => {
    const response = await fetch(`${host}/api/notes/deleteNote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjViNmJhZTVmNWIzODQ2ZDg3MDNmMjFhIn0sImlhdCI6MTcwNjQ3NDI4MX0.8O3AtsClfK0Xlc1WA80bwXfu2minNNxA2SW00IgAvhQ"
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
    // API Call 
    const response = await fetch(`${host}/api/notes/updateNote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjViNmJhZTVmNWIzODQ2ZDg3MDNmMjFhIn0sImlhdCI6MTcwNjQ3NDI4MX0.8O3AtsClfK0Xlc1WA80bwXfu2minNNxA2SW00IgAvhQ"
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const json = await response.json();
    console.log(json);

    let newNotes = JSON.parse(JSON.stringify(notes))
    // Logic to edit in client
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        // newNotes[index]._id = id;
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
    }
    console.log(newNotes);
    setNotes(newNotes);
  }

  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
      {props.children}
    </NoteContext.Provider>
  )
}

export default NoteState;