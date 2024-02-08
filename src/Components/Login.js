import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";


const Login = () => {
    const [credentials, setCredentials] = useState({ email: "", password: "" });
    // let history = useHistory();
    let navigate = useNavigate()
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log("Login Request Submitted");
            const response = await fetch(`http://localhost:5000/api/auth/login`, {
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
                navigate("/")
            } else {
                alert("Invalid Credentials");
            }
        } catch (error) {
            console.log("Some Internal Server Error Occured.")
        }
    }

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }


    return (
        <div>
            <h3 className='text-success'>Please Authnticate with your Registered Credentials </h3>
            <div className="container">
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email Address</label>
                        <input type="email" className="form-control" id="email" name='email' value={credentials.email} onChange={onChange} aria-describedby="emailHelp" />
                        {/* <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div> */}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="password" className="form-control" id="password" name='password' value={credentials.password} onChange={onChange} />
                    </div>
                    <button type="submit" className="btn btn-primary mx-1">Login</button>
                    <button type="submit" className="btn btn-danger" >Forgot Password ?</button>
                    <h6 className='mx-2 my-2 text-danger'>Your privacy is protected by responsible data practices.</h6>
                </form>
            </div>
        </div>
    )
}

export default Login