import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import NoteContext from "../Context/notes/NoteContext"
import NoteItem from './NoteItem';
import AddNote from './AddNote';

const Notes = () => {
    const context = useContext(NoteContext);
    const navigate = useNavigate();
    const { notes, getNotes, editNote } = context;
    useEffect(() => {
        if(localStorage.getItem('token')){
            getNotes();
        }else{
            navigate("/login")
        }
        // eslint-disable-next-line
    }, []);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);
    const [note, setNote] = useState({ id: "", etitle: "", edescription: "", etag: "" })

    const updateNote = (currentNote) => {
        setNote({ id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag });
        setIsModalOpen(true);
    }

    const handleClick = async (e) => {
        setIsUpdating(true);
        try {
            console.log("Updating the Note ...", note);
            await editNote(note.id, note.etitle, note.edescription, note.etag);
            setIsModalOpen(false);
        } catch (error) {
            console.error("Error updating note:", error);
        } finally {
            setIsUpdating(false);
        }
    }
    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }


    return (
        <div className="min-h-screen bg-gray-50">
            <AddNote />
            
            {/* Edit Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-xl shadow-2xl w-full max-w-md animate-slide-up">
                        <div className="flex items-center justify-between p-6 border-b border-gray-200">
                            <h2 className="text-xl font-bold text-gray-900">Edit Note</h2>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="text-gray-400 hover:text-gray-600 transition-colors"
                            >
                                <i className="fas fa-times text-lg"></i>
                            </button>
                        </div>
                        
                        <div className="p-6">
                            <form className="space-y-4">
                                <div>
                                    <label htmlFor="etitle" className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                                        <i className="fas fa-heading mr-2 text-blue-500"></i>
                                        Title
                                    </label>
                                    <input 
                                        type="text" 
                                        className="input-modern" 
                                        id="etitle" 
                                        name="etitle" 
                                        onChange={onChange} 
                                        value={note.etitle} 
                                        minLength={5} 
                                        required 
                                        placeholder="Enter note title"
                                    />
                                </div>
                                
                                <div>
                                    <label htmlFor="edescription" className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                                        <i className="fas fa-align-left mr-2 text-blue-500"></i>
                                        Description
                                    </label>
                                    <textarea 
                                        className="input-modern min-h-[100px] resize-y" 
                                        id="edescription" 
                                        name="edescription" 
                                        onChange={onChange} 
                                        value={note.edescription} 
                                        minLength={5} 
                                        required
                                        placeholder="Enter note description"
                                        rows={4}
                                    />
                                </div>
                                
                                <div>
                                    <label htmlFor="etag" className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                                        <i className="fas fa-tag mr-2 text-blue-500"></i>
                                        Tag
                                    </label>
                                    <input 
                                        type="text" 
                                        className="input-modern" 
                                        id="etag" 
                                        name="etag" 
                                        onChange={onChange} 
                                        value={note.etag}
                                        placeholder="Enter tag (optional)"
                                    />
                                </div>
                            </form>
                        </div>
                        
                        <div className="flex items-center justify-end space-x-3 p-6 border-t border-gray-200">
                            <button 
                                type="button" 
                                className="px-4 py-2 text-gray-700 hover:text-gray-900 transition-colors" 
                                onClick={() => setIsModalOpen(false)}
                            >
                                Cancel
                            </button>
                            <button 
                                disabled={note.etitle.length < 5 || note.edescription.length < 5 || isUpdating} 
                                type="button" 
                                className={`btn-gradient px-6 ${(note.etitle.length < 5 || note.edescription.length < 5 || isUpdating) ? 'opacity-50 cursor-not-allowed transform-none' : ''}`}
                                onClick={handleClick}
                            >
                                {isUpdating ? (
                                    <div className="flex items-center">
                                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                        Updating...
                                    </div>
                                ) : (
                                    <div className="flex items-center">
                                        <i className="fas fa-save mr-2"></i>
                                        Update Note
                                    </div>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Notes Grid */}
            <div className="max-w-7xl mx-auto p-6">
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center">
                        <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mr-3">
                            <i className="fas fa-sticky-note text-white"></i>
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900">Your Notes</h2>
                    </div>
                    <div className="text-sm text-gray-500">
                        {notes.length} {notes.length === 1 ? 'note' : 'notes'}
                    </div>
                </div>
                
                {notes.length === 0 ? (
                    <div className="text-center py-12">
                        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <i className="fas fa-sticky-note text-gray-400 text-3xl"></i>
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">No notes yet</h3>
                        <p className="text-gray-600 mb-6">Create your first note to get started</p>
                        <button 
                            onClick={() => document.getElementById('title').focus()}
                            className="btn-gradient px-6"
                        >
                            <i className="fas fa-plus mr-2"></i>
                            Create Note
                        </button>
                    </div>
                ) : (
                    <div className="flex flex-wrap -mx-3">
                        {notes.map((note) => (
                            <NoteItem key={note._id} updateNote={updateNote} note={note} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default Notes
