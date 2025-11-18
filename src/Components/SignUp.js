import React, { useState } from 'react'
import { useNavigate, Link } from "react-router-dom";

const SignUp = () => {
  const [credentials, setCredentials] = useState({ name: "", email: "", password: "", cpassword: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  let navigate = useNavigate()
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    // Validate passwords match
    if (credentials.password !== credentials.cpassword) {
      setError("Passwords do not match");
      setIsLoading(false);
      return;
    }

    const { name, email, password } = credentials;
    try {
      console.log("Create User Request Submitted");
      const response = await fetch(`https://smartnotevault-backend.onrender.com/api/auth/createUser`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ name, email, password })
      });

      const json = await response.json();
      console.log(json);
      if (json.success) {
        // Save the auth token and Redirect
        localStorage.setItem('token', json.authToken);
        navigate("/");
      } else {
        setError("User already exists with this email address");
      }
    } catch (error) {
      console.log("Some Internal Server Error Occured.");
      setError("Unable to connect to server. Please try again later.");
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

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  }

  return (
    <div className="h-screen w-screen flex overflow-hidden fixed inset-0">
      {/* Left Side - Image (60%) */}
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
                <span className="text-blue-400">Start your</span><br />
                <span className="text-blue-400">journey</span>
              </h1>
              <p className="text-lg xl:text-xl font-medium text-white mb-8 leading-relaxed">
                Join thousands of users who trust SmartNoteVault to keep their thoughts organized. 
                Create your account and start capturing ideas today.
              </p>
              <div className="flex flex-col space-y-3 text-sm xl:text-base">
                <div className="flex items-center text-white font-semibold">
                  <div className="w-7 h-7 bg-blue-500 rounded-full flex items-center justify-center mr-3">
                    <i className="fas fa-users text-white text-xs"></i>
                  </div>
                  <span>10k+ Users</span>
                </div>
                <div className="flex items-center text-white font-semibold">
                  <div className="w-7 h-7 bg-blue-500 rounded-full flex items-center justify-center mr-3">
                    <i className="fas fa-star text-white text-xs"></i>
                  </div>
                  <span>5-Star Rated</span>
                </div>
                <div className="flex items-center text-white font-semibold">
                  <div className="w-7 h-7 bg-blue-500 rounded-full flex items-center justify-center mr-3">
                    <i className="fas fa-rocket text-white text-xs"></i>
                  </div>
                  <span>Fast Setup</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - SignUp Form (40%) */}
      <div className="w-full lg:w-2/5 flex items-center justify-center p-4 lg:p-6 bg-white h-screen overflow-y-auto">
        <div className="max-w-sm w-full my-2">
          {/* Header */}
          <div className="text-center mb-5">
            <div className="mx-auto h-10 w-10 flex items-center justify-center rounded-full bg-slate-900 mb-3">
              <i className="fas fa-user-plus text-white"></i>
            </div>
            <h2 className="text-2xl font-light text-gray-900 tracking-tight">
              Create your account
            </h2>
            <p className="mt-1 text-sm text-gray-600">
              Join SmartNoteVault today
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

          {/* Sign Up Form */}
          <form onSubmit={handleSubmit} className="space-y-3">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Full name
              </label>
              <input 
                type="text" 
                className="appearance-none relative block w-full px-3 py-2.5 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-slate-500 focus:z-10 transition-colors text-sm"
                id="name" 
                name="name" 
                value={credentials.name}
                onChange={onChange}
                placeholder="Enter your full name"
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email address
              </label>
              <input 
                type="email" 
                className="appearance-none relative block w-full px-3 py-2.5 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-slate-500 focus:z-10 transition-colors text-sm"
                id="email" 
                name="email" 
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
                  name="password" 
                  value={credentials.password}
                  onChange={onChange}
                  placeholder="Create a password"
                  minLength={5}
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
              <p className="mt-1 text-xs text-gray-500">Minimum 5 characters</p>
            </div>

            <div>
              <label htmlFor="cpassword" className="block text-sm font-medium text-gray-700 mb-1">
                Confirm password
              </label>
              <div className="relative">
                <input 
                  type={showConfirmPassword ? "text" : "password"} 
                  className="appearance-none relative block w-full px-3 py-2.5 pr-10 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-slate-500 focus:z-10 transition-colors text-sm"
                  id="cpassword" 
                  name="cpassword" 
                  value={credentials.cpassword}
                  onChange={onChange}
                  placeholder="Confirm your password"
                  minLength={5}
                  required
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                  onClick={toggleConfirmPasswordVisibility}
                >
                  <i className={`fas ${showConfirmPassword ? 'fa-eye-slash' : 'fa-eye'} text-sm`}></i>
                </button>
              </div>
            </div>

            <div className="pt-2">
              <button 
                type="submit" 
                className={`group relative w-full flex justify-center py-2.5 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-slate-900 hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500 transition-colors ${isLoading || !credentials.name || !credentials.email || !credentials.password || !credentials.cpassword ? 'opacity-50 cursor-not-allowed' : ''}`}
                disabled={isLoading || !credentials.name || !credentials.email || !credentials.password || !credentials.cpassword}
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Creating account...
                  </div>
                ) : (
                  'Create account'
                )}
              </button>
            </div>
          </form>

          {/* Footer */}
          <div className="mt-5">
            <div className="text-center">
              <span className="text-sm text-gray-600">
                Already have an account?{' '}
                <Link 
                  to="/login" 
                  className="font-medium text-slate-900 hover:text-slate-700 transition-colors"
                >
                  Sign in
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

export default SignUp
