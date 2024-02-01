import React, { useContext } from 'react'
import NoteContext from "../Context/notes/NoteContext"
import NoteItem from './NoteItem';

const Notes = () => {
    const context = useContext(NoteContext);
    const {notes, setNotes} = context
    return (
        <div className="row mx-3 my-2">
            <h3>Your Notes</h3>
            {notes.map((note) => {
                return <NoteItem note = {note}/>
            })}
        </div>
    )
}

export default Notes
