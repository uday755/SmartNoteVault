import React, {useContext, useState} from 'react'
import { useNavigate } from 'react-router-dom';
import NoteContext from '../Context/notes/NoteContext';
import { toast } from 'react-toastify';

const NoteItem = (props) => {
    const context = useContext(NoteContext);
    const { note } = props;
    const { deleteNote, summarizeNote } = context;
    const navigate = useNavigate();
    const [isDeleting, setIsDeleting] = useState(false);
    const [isSummarizing, setIsSummarizing] = useState(false);
    const [summary, setSummary] = useState('');
    const [showView, setShowView] = useState(false);

    const handleDelete = async () => {
        setIsDeleting(true);
        try {
            await deleteNote(note._id);
            toast.success("Note deleted successfully!", {
                style: { background: '#d4edda', color: '#155724' }
            });
        } catch (error) {
            console.error("Error deleting note:", error);
            toast.error("Failed to delete note. Please try again.", {
                style: { background: '#f8d7da', color: '#721c24' }
            });
        } finally {
            setIsDeleting(false);
        }
    }

    const handleSummarize = async () => {
        setIsSummarizing(true);
        setShowView(true);
        try {
            const result = await summarizeNote(note._id);
            setSummary(result);
        } catch (error) {
            console.error("Error summarizing note:", error);
            toast.error("Failed to generate summary. Please try again.", {
                style: { background: '#f8d7da', color: '#721c24' }
            });
        } finally {
            setIsSummarizing(false);
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
            <div className="card-modern p-3 h-full flex flex-col group hover:scale-[1.02] transition-all duration-300">
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
                    <div className="flex items-center space-x-1">
                        <button
                            onClick={() => { setSummary(''); setShowView(true); }}
                            className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-all duration-200"
                            title="View note"
                        >
                            <i className="fas fa-eye text-sm"></i>
                        </button>
                        <button
                            onClick={() => navigate(`/notes/edit/${note._id}`, { state: { note } })}
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

                {/* Summarize with AI Button */}
                <div className="mt-3">
                    <button
                        onClick={handleSummarize}
                        disabled={isSummarizing}
                        className="w-full flex items-center justify-center gap-2 px-3 py-2 text-xs font-medium text-purple-700 bg-purple-50 hover:bg-purple-100 border border-purple-200 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isSummarizing ? (
                            <>
                                <div className="animate-spin rounded-full h-3.5 w-3.5 border-b-2 border-purple-600"></div>
                                Generating Summary...
                            </>
                        ) : (
                            <>
                                <i className="fas fa-magic"></i>
                                Summarize with AI
                            </>
                        )}
                    </button>
                </div>

                {/* Footer */}
                <div className="mt-3 pt-3 border-t border-gray-100">
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

            {/* View Note Dialog */}
            {showView && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onClick={() => setShowView(false)}>
                    <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[85vh] flex flex-col animate-slide-up" onClick={(e) => e.stopPropagation()}>
                        {/* Dialog Header */}
                        <div className="flex items-center justify-between p-5 border-b border-gray-100 shrink-0">
                            <div className="flex-1 mr-4">
                                <h3 className="text-xl font-bold text-gray-900">{note.title}</h3>
                                <div className="flex items-center gap-3 mt-2">
                                    {note.tag && (
                                        <span className="inline-block px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                                            {note.tag}
                                        </span>
                                    )}
                                    <span className="text-xs text-gray-500">
                                        <i className="fas fa-calendar-alt mr-1"></i>
                                        {formatDate(note.date || Date.now())}
                                    </span>
                                    <span className="text-xs text-gray-500">
                                        <i className="fas fa-clock mr-1"></i>
                                        {note.description.split(' ').length} words
                                    </span>
                                </div>
                            </div>
                            <button
                                onClick={() => setShowView(false)}
                                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-all duration-200"
                            >
                                <i className="fas fa-times"></i>
                            </button>
                        </div>

                        {/* Scrollable Content */}
                        <div className="overflow-y-auto flex-1 p-5">
                            {/* Summarize with AI Button */}
                            <button
                                onClick={handleSummarize}
                                disabled={isSummarizing}
                                className="mb-4 flex items-center gap-2 px-4 py-2 text-sm font-medium text-purple-700 bg-purple-50 hover:bg-purple-100 border border-purple-200 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isSummarizing ? (
                                    <>
                                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-purple-600"></div>
                                        Generating Summary...
                                    </>
                                ) : (
                                    <>
                                        <i className="fas fa-magic"></i>
                                        Summarize with AI
                                    </>
                                )}
                            </button>

                            {/* AI Summary (shown above description) */}
                            {summary && (
                                <div className="mb-4 bg-gradient-to-br from-purple-50 to-blue-50 border border-purple-100 rounded-lg p-4">
                                    <div className="flex items-center gap-2 mb-2">
                                        <i className="fas fa-magic text-purple-600 text-sm"></i>
                                        <p className="text-sm font-semibold text-purple-700">AI Summary</p>
                                    </div>
                                    <p className="text-sm text-gray-800 leading-relaxed">{summary}</p>
                                </div>
                            )}

                            {/* Note Description */}
                            <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-wrap">{note.description}</p>
                        </div>

                        {/* Dialog Footer */}
                        <div className="flex items-center justify-end gap-3 p-5 border-t border-gray-100 shrink-0">
                            <button
                                onClick={() => { setShowView(false); navigate(`/notes/edit/${note._id}`, { state: { note } }); }}
                                className="px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-all duration-200"
                            >
                                <i className="fas fa-edit mr-2"></i>
                                Edit
                            </button>
                            <button
                                onClick={() => setShowView(false)}
                                className="px-5 py-2 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-lg transition-all duration-200"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default NoteItem
