import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from "react-router-dom"

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    let location = useLocation();
    const navigate = useNavigate();
    
    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    }

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    }

    const isActive = (path) => location.pathname === path;

    return (
        <nav className="navbar-modern sticky top-0 z-50 w-full">
            <div className="w-full px-4 sm:px-6 lg:px-8">
                <div className="flex items-center h-16">
                    {/* Logo */}
                    <div className="flex items-center mr-8">
                        <Link to="/" className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center">
                                <i className="fas fa-sticky-note text-white text-sm"></i>
                            </div>
                            <span className="text-xl font-semibold text-slate-900">SmartNoteVault</span>
                        </Link>
                    </div>

                    {/* Desktop Navigation - Left aligned */}
                    <div className="hidden md:flex items-center space-x-6">
                        <Link
                            to="/"
                            className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                                isActive('/') 
                                    ? 'bg-blue-100 text-blue-700 shadow-sm' 
                                    : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                            }`}
                        >
                            <i className="fas fa-home mr-2"></i>
                            Home
                        </Link>
                        <Link
                            to="/about"
                            className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                                isActive('/about') 
                                    ? 'bg-blue-100 text-blue-700 shadow-sm' 
                                    : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                            }`}
                        >
                            <i className="fas fa-info-circle mr-2"></i>
                            About
                        </Link>
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden ml-auto">
                        <button
                            onClick={toggleMenu}
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100 transition-colors"
                        >
                            <i className={`fas ${isMenuOpen ? 'fa-times' : 'fa-bars'} text-lg`}></i>
                        </button>
                    </div>

                    {/* Logout button for authenticated users - right aligned */}
                    {localStorage.getItem('token') && (
                        <div className="hidden md:block ml-auto">
                            <button
                                onClick={handleLogout}
                                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-md transition-colors shadow-sm"
                            >
                                <i className="fas fa-sign-out-alt mr-2"></i>
                                Logout
                            </button>
                        </div>
                    )}
                </div>

                {/* Mobile Navigation Menu */}
                {isMenuOpen && (
                    <div className="md:hidden">
                        <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t border-gray-100 shadow-lg">
                            <Link
                                to="/"
                                className={`block px-3 py-2 rounded-md text-base font-medium transition-all duration-200 ${
                                    isActive('/') 
                                        ? 'bg-blue-100 text-blue-700' 
                                        : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                                }`}
                                onClick={() => setIsMenuOpen(false)}
                            >
                                <i className="fas fa-home mr-2"></i>
                                Home
                            </Link>
                            <Link
                                to="/about"
                                className={`block px-3 py-2 rounded-md text-base font-medium transition-all duration-200 ${
                                    isActive('/about') 
                                        ? 'bg-blue-100 text-blue-700' 
                                        : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                                }`}
                                onClick={() => setIsMenuOpen(false)}
                            >
                                <i className="fas fa-info-circle mr-2"></i>
                                About
                            </Link>
                            
                            {/* Mobile Logout for authenticated users */}
                            {localStorage.getItem('token') && (
                                <div className="pt-4 border-t border-gray-200">
                                    <button
                                        onClick={() => {
                                            handleLogout();
                                            setIsMenuOpen(false);
                                        }}
                                        className="block w-full text-center px-3 py-2 bg-red-600 hover:bg-red-700 text-white font-medium rounded-md transition-colors"
                                    >
                                        <i className="fas fa-sign-out-alt mr-2"></i>
                                        Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </nav>
    )
}

export default Navbar
