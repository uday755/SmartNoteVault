import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [credentials, setCredentials] = useState({ name: "", email: "", password: "", cpassword: "" });

  // let history = useHistory();
  let navigate = useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password } = credentials;
    try {
      console.log("Create User Request Submitted");
      const response = await fetch(`http://localhost:5000/api/auth/createUser`, {

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
        console.log("User Exists Already");
      }


    } catch (error) {
      console.log("Some Internal Server Error Occured.")
    }
  }

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }


  return (
    <div className='container'>
      <h3 className='text-success'>Create an Account to Continue ... </h3>
      <div className="container">

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Name</label>
            <input type="text" className="form-control" onChange={onChange} id="name" name="name" aria-describedby="emailHelp" />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input type="email" className="form-control" onChange={onChange} id="email" name="email" aria-describedby="emailHelp" />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" className="form-control" onChange={onChange} id="password" minLength={5} required name="password" />
          </div>
          <div className="mb-3">
            <label htmlFor="cpassword" className="form-label">Confirm Password</label>
            <input type="password" className="form-control" onChange={onChange} id="cpassword" minLength={5} required name='cpassword' />
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
        
      </div>

    </div>
  )
}

export default SignUp
