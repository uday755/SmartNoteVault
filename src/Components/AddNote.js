import React, { useState } from 'react'
import NoteContext from "../Context/notes/NoteContext"
import { useContext } from 'react'

const AddNote = () => {
    const context = useContext(NoteContext);
    const { addNote } = context;
    const [note, setNote] = useState({title : "", description : "", tag:""})
    const [isLoading, setIsLoading] = useState(false);
    
    const handleClick = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            await addNote(note.title, note.description, note.tag || "General");
            setNote({title : "", description : "", tag:""});
        } catch (error) {
            console.error("Error adding note:", error);
        } finally {
            setIsLoading(false);
        }
    }
    
    const onChange = (e) => {
        setNote({...note, [e.target.name] : e.target.value})
    }
    
    return (
        <div className="max-w-4xl mx-auto p-6">
            <div className="card-modern p-6 mb-8">
                <div className="flex items-center mb-6">
                    <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg flex items-center justify-center mr-3">
                        <i className="fas fa-plus text-white"></i>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900">Add a New Note</h2>
                </div>
                
                <form className="space-y-6">
                    <div>
                        <label htmlFor="title" className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                            <i className="fas fa-heading mr-2 text-blue-500"></i>
                            Title
                        </label>
                        <input 
                            type="text" 
                            className="input-modern" 
                            id="title" 
                            name="title" 
                            value={note.title} 
                            onChange={onChange} 
                            placeholder="Enter note title"
                            minLength={5} 
                            required 
                        />
                        <p className="text-xs text-gray-500 mt-1">Minimum 5 characters</p>
                    </div>
                    
                    <div>
                        <label htmlFor="description" className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                            <i className="fas fa-align-left mr-2 text-blue-500"></i>
                            Description
                        </label>
                        <textarea 
                            className="input-modern min-h-[120px] resize-y" 
                            id="description" 
                            name="description" 
                            value={note.description} 
                            onChange={onChange} 
                            placeholder="Write your note content here..."
                            minLength={5} 
                            required
                            rows={4}
                        />
                        <p className="text-xs text-gray-500 mt-1">Minimum 5 characters</p>
                    </div>
                    
                    <div>
                        <label htmlFor="tag" className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                            <i className="fas fa-tag mr-2 text-blue-500"></i>
                            Tag (Optional)
                        </label>
                        <input 
                            type="text" 
                            className="input-modern" 
                            id="tag" 
                            name="tag" 
                            value={note.tag} 
                            onChange={onChange} 
                            placeholder="e.g., Work, Personal, Ideas"
                        />
                        <p className="text-xs text-gray-500 mt-1">Help organize your notes</p>
                    </div>
                    
                    <div className="flex justify-end">
                        <button 
                            disabled={note.title.length < 5 || note.description.length < 5 || isLoading} 
                            type="submit" 
                            className={`btn-gradient px-8 ${(note.title.length < 5 || note.description.length < 5 || isLoading) ? 'opacity-50 cursor-not-allowed transform-none' : ''}`}
                            onClick={handleClick}
                        >
                            {isLoading ? (
                                <div className="flex items-center">
                                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                    Adding Note...
                                </div>
                            ) : (
                                <div className="flex items-center">
                                    <i className="fas fa-plus mr-2"></i>
                                    Add Note
                                </div>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddNote
