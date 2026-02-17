import React, { useState, useContext, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import NoteContext from "../Context/notes/NoteContext"
import { toast } from 'react-toastify'

const EditNote = () => {
    const context = useContext(NoteContext);
    const { editNote } = context;
    const navigate = useNavigate();
    const location = useLocation();
    const currentNote = location.state?.note;

    const [note, setNote] = useState({ title: "", description: "", tag: "" });
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (!currentNote) {
            navigate('/');
            return;
        }
        setNote({
            title: currentNote.title,
            description: currentNote.description,
            tag: currentNote.tag || ""
        });
    }, [currentNote, navigate]);

    const handleClick = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            await editNote(currentNote._id, note.title, note.description, note.tag);
            toast.success("Note updated successfully!", {
                style: { background: '#d4edda', color: '#155724' }
            });
            navigate('/');
        } catch (error) {
            console.error("Error updating note:", error);
            toast.error("Failed to update note. Please try again.", {
                style: { background: '#f8d7da', color: '#721c24' }
            });
        } finally {
            setIsLoading(false);
        }
    }

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-4xl mx-auto p-6">
                {/* Back Button & Header */}
                <div className="flex items-center mb-6">
                    <button
                        onClick={() => navigate('/')}
                        className="p-2 text-gray-500 hover:text-gray-800 hover:bg-gray-200 rounded-lg transition-all duration-200 mr-3"
                        title="Back to notes"
                    >
                        <i className="fas fa-arrow-left text-lg"></i>
                    </button>
                    <div className="flex items-center">
                        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center mr-3">
                            <i className="fas fa-edit text-white"></i>
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900">Edit Note</h2>
                    </div>
                </div>

                <div className="card-modern p-6">
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
                                className="input-modern min-h-[200px] resize-y"
                                id="description"
                                name="description"
                                value={note.description}
                                onChange={onChange}
                                placeholder="Write your note content here..."
                                minLength={5}
                                required
                                rows={8}
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

                        <div className="flex items-center justify-end space-x-3 pt-4 border-t border-gray-100">
                            <button
                                type="button"
                                className="px-6 py-2 text-gray-700 hover:text-gray-900 transition-colors"
                                onClick={() => navigate('/')}
                            >
                                Cancel
                            </button>
                            <button
                                disabled={note.title.length < 5 || note.description.length < 5 || isLoading}
                                type="submit"
                                className={`btn-gradient px-8 ${(note.title.length < 5 || note.description.length < 5 || isLoading) ? 'opacity-50 cursor-not-allowed' : ''}`}
                                onClick={handleClick}
                            >
                                {isLoading ? (
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
                    </form>
                </div>
            </div>
        </div>
    )
}

export default EditNote
