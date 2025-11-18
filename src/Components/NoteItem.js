import React, {useContext, useState} from 'react'
import NoteContext from '../Context/notes/NoteContext';

const NoteItem = (props) => {
    const context = useContext(NoteContext);
    const { note, updateNote } = props;
    const { deleteNote } = context;
    const [isDeleting, setIsDeleting] = useState(false);
    
    const handleDelete = async () => {
        setIsDeleting(true);
        try {
            await deleteNote(note._id);
        } catch (error) {
            console.error("Error deleting note:", error);
        } finally {
            setIsDeleting(false);
        }
    }

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'short', 
            day: 'numeric' 
        });
    }

    return (
        <div className="w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 p-3">
            <div className="card-modern p-5 h-full flex flex-col group hover:scale-105 transition-all duration-300">
                {/* Header */}
                <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 mb-1 line-clamp-2">
                            {note.title}
                        </h3>
                        {note.tag && (
                            <span className="inline-block px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                                {note.tag}
                            </span>
                        )}
                    </div>
                    
                    {/* Action Buttons */}
                    <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        <button
                            onClick={() => updateNote(note)}
                            className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200"
                            title="Edit note"
                        >
                            <i className="fas fa-edit text-sm"></i>
                        </button>
                        <button
                            onClick={handleDelete}
                            disabled={isDeleting}
                            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200 disabled:opacity-50"
                            title="Delete note"
                        >
                            {isDeleting ? (
                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-red-600"></div>
                            ) : (
                                <i className="fas fa-trash text-sm"></i>
                            )}
                        </button>
                    </div>
                </div>

                {/* Content */}
                <div className="flex-1">
                    <p className="text-gray-600 text-sm leading-relaxed line-clamp-4">
                        {note.description}
                    </p>
                </div>

                {/* Footer */}
                <div className="mt-4 pt-3 border-t border-gray-100">
                    <div className="flex items-center justify-between text-xs text-gray-500">
                        <span className="flex items-center">
                            <i className="fas fa-calendar-alt mr-1"></i>
                            {formatDate(note.date || Date.now())}
                        </span>
                        <span className="flex items-center">
                            <i className="fas fa-clock mr-1"></i>
                            {note.description.split(' ').length} words
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NoteItem
