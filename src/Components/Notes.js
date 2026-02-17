import React, { useContext, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import NoteContext from "../Context/notes/NoteContext"
import NoteItem from './NoteItem';

const Notes = () => {
    const context = useContext(NoteContext);
    const navigate = useNavigate();
    const { notes, getNotes } = context;
    useEffect(() => {
        if(localStorage.getItem('token')){
            getNotes();
        }else{
            navigate("/login")
        }
        // eslint-disable-next-line
    }, []);

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Notes Grid */}
            <div className="max-w-7xl mx-auto p-6">
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center">
                        <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mr-3">
                            <i className="fas fa-sticky-note text-white"></i>
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900">Your Notes</h2>
                            <p className="text-sm text-gray-500">{notes.length} {notes.length === 1 ? 'note' : 'notes'}</p>
                        </div>
                    </div>
                    <button
                        onClick={() => navigate('/notes/new-note')}
                        className="px-4 py-2 text-sm font-medium text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition-all duration-200"
                    >
                        New Note <i className="fas fa-plus ml-2"></i>
                    </button>
                </div>

                {notes.length === 0 ? (
                    <div className="text-center py-12">
                        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <i className="fas fa-sticky-note text-gray-400 text-3xl"></i>
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">No notes yet</h3>
                        <p className="text-gray-600 mb-6">Create your first note to get started</p>
                        <button
                            onClick={() => navigate('/notes/new-note')}
                            className="btn-gradient px-6"
                        >
                            <i className="fas fa-plus mr-2"></i>
                            Create Note
                        </button>
                    </div>
                ) : (
                    <div className="flex flex-wrap -mx-3">
                        {notes.map((note) => (
                            <NoteItem key={note._id} note={note} />
                        ))}
                    </div>
                )}
            </div>

            {/* Floating Add Note Button */}
            <button
                onClick={() => navigate('/notes/new-note')}
                className="fixed bottom-8 right-8 w-14 h-14 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-full shadow-lg hover:shadow-xl flex items-center justify-center transition-all duration-300 hover:scale-110 z-40"
                title="Add new note"
            >
                <i className="fas fa-plus text-xl"></i>
            </button>
        </div>
    )
}

export default Notes
