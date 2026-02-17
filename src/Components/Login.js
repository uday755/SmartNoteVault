import React, { useState, useEffect, useRef } from 'react'
import { useNavigate, Link } from "react-router-dom";
import { toast } from 'react-toastify';
import { GoogleLogin } from '@react-oauth/google';
import AuthImagePanel from './AuthImagePanel';

const loadingMessages = [
    "Waking up the server...",
    "Warming up the engines...",
    "Almost there, hang tight...",
    "Connecting to the cloud...",
    "Securing your connection...",
    "Just a moment more...",
    "Loading your workspace...",
    "Preparing your notes...",
];

const Login = () => {
    const [credentials, setCredentials] = useState({ email: "", password: "" });
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const [loadingText, setLoadingText] = useState(loadingMessages[0]);
    const intervalRef = useRef(null);

    let navigate = useNavigate()

    useEffect(() => {
        if (isLoading) {
            let index = 0;
            intervalRef.current = setInterval(() => {
                index = (index + 1) % loadingMessages.length;
                setLoadingText(loadingMessages[index]);
            }, 2500);
        } else {
            if (intervalRef.current) clearInterval(intervalRef.current);
            setLoadingText(loadingMessages[0]);
        }
        return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
    }, [isLoading]);
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");
        
        try {
            console.log("Login Request Submitted");
            const response = await fetch(`${process.env.REACT_APP_API_HOST}/api/auth/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email: credentials.email, password: credentials.password })
            });
            const json = await response.json();
            console.log(json);
            
            if (json.success) {
                // Save the auth token and Redirect
                localStorage.setItem('token', json.authToken);
                toast.success("Login successful! Welcome back.", {
                    style: { background: '#d4edda', color: '#155724' }
                });
                navigate("/")
            } else {
                toast.error("Invalid credentials. Please check your email and password.", {
                    style: { background: '#f8d7da', color: '#721c24' }
                });
            }
        } catch (error) {
            console.log("Some Internal Server Error Occured.");
            toast.error("Unable to connect to server. Please try again later.", {
                style: { background: '#f8d7da', color: '#721c24' }
            });
        } finally {
            setIsLoading(false);
        }
    }

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
        if (error) setError(""); // Clear error when user starts typing
    }

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    }

    return (
        <div className="h-screen w-screen flex overflow-hidden fixed inset-0">
            <AuthImagePanel />

            {/* Right Side - Login Form (40%) */}
            <div className="w-full lg:w-2/5 flex items-center justify-center p-4 lg:p-6 bg-white h-screen">
                <div className="max-w-sm w-full">
                    {/* Header */}
                    <div className="text-center mb-6">
                        <div className="mx-auto h-10 w-10 flex items-center justify-center rounded-full bg-slate-900 mb-4">
                            <i className="fas fa-lock text-white"></i>
                        </div>
                        <h2 className="text-2xl font-light text-gray-900 tracking-tight">
                            Welcome back
                        </h2>
                        <p className="mt-1 text-sm text-gray-600">
                            Sign in to your account
                        </p>
                    </div>

                    {/* Error Alert */}
                    {error && (
                        <div className="mb-4 p-3 bg-red-50 border-l-4 border-red-400 rounded-r">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <i className="fas fa-exclamation-circle text-red-400 mr-2 text-sm"></i>
                                    <span className="text-sm text-red-700">{error}</span>
                                </div>
                                <button 
                                    type="button" 
                                    className="text-red-400 hover:text-red-600 transition-colors"
                                    onClick={() => setError("")}
                                >
                                    <i className="fas fa-times text-xs"></i>
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Login Form */}
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                Email address
                            </label>
                            <input 
                                type="email" 
                                className="appearance-none relative block w-full px-3 py-2.5 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-slate-500 focus:z-10 transition-colors text-sm"
                                id="email" 
                                name='email' 
                                value={credentials.email} 
                                onChange={onChange}
                                placeholder="Enter your email"
                                required
                            />
                        </div>
                        
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                                Password
                            </label>
                            <div className="relative">
                                <input 
                                    type={showPassword ? "text" : "password"} 
                                    className="appearance-none relative block w-full px-3 py-2.5 pr-10 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-slate-500 focus:z-10 transition-colors text-sm"
                                    id="password" 
                                    name='password' 
                                    value={credentials.password} 
                                    onChange={onChange}
                                    placeholder="Enter your password"
                                    required
                                />
                                <button
                                    type="button"
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                                    onClick={togglePasswordVisibility}
                                >
                                    <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'} text-sm`}></i>
                                </button>
                            </div>
                        </div>

                        <div className="pt-2">
                            <button 
                                type="submit" 
                                className={`group relative w-full flex justify-center py-2.5 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-slate-900 hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500 transition-colors ${isLoading || !credentials.email || !credentials.password ? 'opacity-50 cursor-not-allowed' : ''}`}
                                disabled={isLoading || !credentials.email || !credentials.password}
                            >
                                {isLoading ? (
                                    <div className="flex flex-col items-center">
                                        <div className="flex items-center">
                                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                            Signing in...
                                        </div>
                                        <span className="text-xs text-gray-300 mt-1 animate-pulse">{loadingText}</span>
                                    </div>
                                ) : (
                                    'Sign in'
                                )}
                            </button>
                        </div>
                    </form>

                    {/* Divider */}
                    <div className="mt-4 flex items-center">
                        <div className="flex-grow border-t border-gray-300"></div>
                        <span className="mx-3 text-sm text-gray-500">or</span>
                        <div className="flex-grow border-t border-gray-300"></div>
                    </div>

                    {/* Google Sign-In */}
                    <div className="mt-4 flex justify-center">
                        <GoogleLogin
                            onSuccess={async (credentialResponse) => {
                                try {
                                    const response = await fetch(`${process.env.REACT_APP_API_HOST}/api/auth/google`, {
                                        method: "POST",
                                        headers: { "Content-Type": "application/json" },
                                        body: JSON.stringify({ credential: credentialResponse.credential })
                                    });
                                    const json = await response.json();
                                    if (json.success) {
                                        localStorage.setItem('token', json.authToken);
                                        toast.success("Login successful! Welcome back.", {
                                            style: { background: '#d4edda', color: '#155724' }
                                        });
                                        navigate("/");
                                    } else {
                                        toast.error(json.error || "Google sign-in failed.", {
                                            style: { background: '#f8d7da', color: '#721c24' }
                                        });
                                    }
                                } catch (error) {
                                    console.error("Google sign-in error:", error);
                                    toast.error("Unable to connect to server. Please try again later.", {
                                        style: { background: '#f8d7da', color: '#721c24' }
                                    });
                                }
                            }}
                            onError={() => {
                                toast.error("Google sign-in failed. Please try again.", {
                                    style: { background: '#f8d7da', color: '#721c24' }
                                });
                            }}
                            text="signin_with"
                            shape="rectangular"
                            width="350"
                        />
                    </div>

                    {/* Footer */}
                    <div className="mt-6">
                        <div className="text-center">
                            <span className="text-sm text-gray-600">
                                Don't have an account?{' '}
                                <Link 
                                    to="/createUser" 
                                    className="font-medium text-slate-900 hover:text-slate-700 transition-colors"
                                >
                                    Sign up
                                </Link>
                            </span>
                        </div>
                        
                        <div className="mt-3 flex items-center justify-center text-xs text-gray-500">
                            <i className="fas fa-shield-alt mr-1"></i>
                            <span>Your data is secure and encrypted</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login