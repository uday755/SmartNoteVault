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
          "_id": "65b805bcd0c9f9ccf9b62c32",
          "user": "65b6bae5f5b3846d8703f21a",
          "title": "My First title",
          "description": "This is descritption of my first note man ",
          "tag": "Personal",
          "date": "2024-01-29T20:08:28.403Z",
          "__v": 0
        },
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
          "_id": "65b805bcd0c9f9ccf9b62c32",
          "user": "65b6bae5f5b3846d8703f21a",
          "title": "My First title",
          "description": "This is descritption of my first note man ",
          "tag": "Personal",
          "date": "2024-01-29T20:08:28.403Z",
          "__v": 0
        },
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
          "_id": "65b805bcd0c9f9ccf9b62c32",
          "user": "65b6bae5f5b3846d8703f21a",
          "title": "My First title",
          "description": "This is descritption of my first note man ",
          "tag": "Personal",
          "date": "2024-01-29T20:08:28.403Z",
          "__v": 0
        },
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
          "_id": "65b805bcd0c9f9ccf9b62c32",
          "user": "65b6bae5f5b3846d8703f21a",
          "title": "My First title",
          "description": "This is descritption of my first note man ",
          "tag": "Personal",
          "date": "2024-01-29T20:08:28.403Z",
          "__v": 0
        },
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
          "_id": "65b805bcd0c9f9ccf9b62c32",
          "user": "65b6bae5f5b3846d8703f21a",
          "title": "My Second title",
          "description": "This is descritption of my second note ",
          "tag": "Personal",
          "date": "2024-01-29T20:08:28.403Z",
          "__v": 0
        }
      ]

      const [notes, setNotes] = useState(notesInitial)

    return (
        <NoteContext.Provider value={{notes, setNotes}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;