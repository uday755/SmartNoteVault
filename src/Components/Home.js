import React from 'react'

const Home = () => {
  return (
    <div>
      <div className="container mx-3 my-2">
        <h3>Add a New Note</h3>
        <form className='my-3'>
          <div className="mb-3">
            <label for="exampleInputEmail1" class="form-label">Email address</label>
            <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
            <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
          </div>
          <div className="mb-3">
            <label for="exampleInputPassword1" class="form-label">Password</label>
            <input type="password" class="form-control" id="exampleInputPassword1" />
          </div>
          <div className="mb-3 form-check">
            <input type="checkbox" class="form-check-input" id="exampleCheck1" />
            <label class="form-check-label" for="exampleCheck1">Check me out</label>
          </div>
          <button type="submit" class="btn btn-primary">Submit</button>
        </form>
      </div>
      <div className="container mx-3 my-2">
        <h3>Your Notes</h3>
      </div>
    </div>
  )
}

export default Home
