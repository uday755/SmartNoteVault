import { useState } from "react"
import NoteContext from "./NoteContext"

const NoteState = (props) => {
  const notesInitial = [
    {
      "_id": "65b805bcd0c9f9ccf9b62c32",
      "user": "65b6bae5f5b3846d8703f21a",
      "title": "My First title",
      "description": "This is descritption of my first note man ",
      "tag": "Personal",
      "date": "2024-01-29T20:08:28.403Z",
      "__v": 0
    },
    {
      "_id": "65b805bcd0c9f9ccf9b62sc32",
      "user": "65b6bae5f5b3846d8703f21a",
      "title": "My First title",
      "description": "This is descritption of my first note man ",
      "tag": "Personal",
      "date": "2024-01-29T20:08:28.403Z",
      "__v": 0
    },
    {
      "_id": "65b805bcd0c9df9ccf9b62c32",
      "user": "65b6bae5f5b3846d8703f21a",
      "title": "My First title",
      "description": "This is descritption of my first note man ",
      "tag": "Personal",
      "date": "2024-01-29T20:08:28.403Z",
      "__v": 0
    },
    {
      "_id": "65b805bcd0dc9f9ccf9b62c32",
      "user": "65b6bae5f5b3846d8703f21a",
      "title": "My First title",
      "description": "This is descritption of my first note man ",
      "tag": "Personal",
      "date": "2024-01-29T20:08:28.403Z",
      "__v": 0
    },
    {
      "_id": "65b805bcd0cd9fe9ccf9b62c32",
      "user": "65b6bae5f5b3846d8703f21a",
      "title": "My First title",
      "description": "This is descritption of my first note man ",
      "tag": "Personal",
      "date": "2024-01-29T20:08:28.403Z",
      "__v": 0
    },
    {
      "_id": "65b805bccxd0c9f9ccf9b62c32",
      "user": "65b6bae5f5b3846d8703f21a",
      "title": "My First title",
      "description": "This is descritption of my first note man ",
      "tag": "Personal",
      "date": "2024-01-29T20:08:28.403Z",
      "__v": 0
    },
    {
      "_id": "65b805bcd0c9f9xcvccf9b62c32",
      "user": "65b6bae5f5b3846d8703f21a",
      "title": "My First title",
      "description": "This is descritption of my first note man ",
      "tag": "Personal",
      "date": "2024-01-29T20:08:28.403Z",
      "__v": 0
    },
    {
      "_id": "65b805bcd0c9fxcv9ccf9b62c32",
      "user": "65b6bae5f5b3846d8703f21a",
      "title": "My First title",
      "description": "This is descritption of my first note man ",
      "tag": "Personal",
      "date": "2024-01-29T20:08:28.403Z",
      "__v": 0
    },
    {
      "_id": "65b805bcd0werc9f9ccf9b62c32",
      "user": "65b6bae5f5b3846d8703f21a",
      "title": "My First title",
      "description": "This is descritption of my first note man ",
      "tag": "Personal",
      "date": "2024-01-29T20:08:28.403Z",
      "__v": 0
    },
    {
      "_id": "65b805bcd0cwe9f9ccf9b62c32",
      "user": "65b6bae5f5b3846d8703f21a",
      "title": "My Second title",
      "description": "This is descritption of my second note ",
      "tag": "Personal",
      "date": "2024-01-29T20:08:28.403Z",
      "__v": 0
    }
  ]

  const [notes, setNotes] = useState(notesInitial)

  // Add a Note
  const addNote = (title, description, tag) => {
    // TODO API Call
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
  const deleteNote = () => {

  }
  // Edit Note
  const editNote = () => {

  }
  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote }}>
      {props.children}
    </NoteContext.Provider>
  )
}

export default NoteState;