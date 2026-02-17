import React from 'react'

const AuthImagePanel = () => {
    return (
        <div className="hidden lg:flex lg:w-3/5 relative overflow-hidden">
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{
                    backgroundImage: 'url(/notes-img.avif)',
                }}
            >
                {/* Overlay */}
                <div className="absolute inset-0 bg-slate-900 bg-opacity-40"></div>

                {/* Content over image */}
                <div className="relative z-10 flex flex-col justify-center h-full px-8 xl:px-12 text-white">
                    <div className="max-w-lg">
                        <h1 className="text-4xl xl:text-5xl font-bold mb-6 leading-tight">
                            <span className="text-blue-950">Smarter Notes</span><br />
                            <span className="text-blue-950 italic">Supercharged by AI</span>
                        </h1>
                        <p className="text-lg xl:text-xl font-medium text-white text-opacity-70 mb-8 leading-relaxed">
                            SmartNoteVault helps you capture, organize, and access your ideas from anywhere.
                            Simple, secure, and always available.
                        </p>
                        <div className="flex flex-col space-y-4 text-sm xl:text-base">
                            <div className="flex items-start text-white">
                                <div className="w-7 h-7 bg-blue-500 rounded-full flex items-center justify-center mr-3 mt-0.5 shrink-0">
                                    <i className="fas fa-magic text-white text-xs"></i>
                                </div>
                                <div>
                                    <span className="font-semibold text-blue-800">AI-Powered Summaries</span>
                                    <p className="text-sm text-gray-300 mt-0.5">Instantly summarize your notes with Gemini AI in one click</p>
                                </div>
                            </div>
                            <div className="flex items-start text-white">
                                <div className="w-7 h-7 bg-blue-500 rounded-full flex items-center justify-center mr-3 mt-0.5 shrink-0">
                                    <i className="fas fa-shield-alt text-white text-xs"></i>
                                </div>
                                <div>
                                    <span className="font-semibold text-blue-800">Secure & Private</span>
                                    <p className="text-sm text-gray-300 mt-0.5">JWT authentication with encrypted data storage to keep your notes safe</p>
                                </div>
                            </div>
                            <div className="flex items-start text-white">
                                <div className="w-7 h-7 bg-blue-500 rounded-full flex items-center justify-center mr-3 mt-0.5 shrink-0">
                                    <i className="fas fa-sync-alt text-white text-xs"></i>
                                </div>
                                <div>
                                    <span className="font-semibold text-blue-800">Always Synced</span>
                                    <p className="text-sm text-gray-300 mt-0.5">Cloud-based storage ensures your notes are always up to date</p>
                                </div>
                            </div>
                            <div className="flex items-start text-white">
                                <div className="w-7 h-7 bg-blue-500 rounded-full flex items-center justify-center mr-3 mt-0.5 shrink-0">
                                    <i className="fas fa-mobile-alt text-white text-xs"></i>
                                </div>
                                <div>
                                    <span className="font-semibold text-blue-800">Any Device</span>
                                    <p className="text-sm text-gray-300 mt-0.5">Fully responsive design — access your notes from desktop, tablet, or mobile</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AuthImagePanel
