import React, {useState} from 'react'
import './Login.css'
import { useNavigate, useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

import axios from 'axios'



function Login() {
  const navigate = useNavigate(); // <-- you need this
  const location = useLocation()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")


  //function to login
  async function handleLogin(event) {
    event.preventDefault()

    try{
      //send email and password to nackend
  const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/login`, {
    email, password
  })
  //backend send back a user id
  localStorage.setItem("user_id", res.data.user_id)
  alert("Login successful!");

// get the product id passed from detail page
// const product_id = location.state?.product_id;
  //after loggin go to detail product page again
  if(location.state?.from){
  navigate(location.state.from) 
  } else {
    navigate("/")
  }
    } catch(error){
      console.error("Login error", error.message)

      // Show proper error message to user
    if (error.response && error.response.status === 401) {
      alert("user dosent exists with email or password");
    } else {
      alert("Server error, please try again later");
    }
    }
  }

  return (
    <div className="login-main-container">
  <form className="login-form-container" onSubmit={handleLogin}>
    <h2 className="heading">Login</h2>
    <label for="email">Email</label>
    <input type="email" id="email" placeholder="Enter your email"
    value={email}
    onChange={(event)=> setEmail(event.target.value)}
    required/>

    <label for="password">Password</label>
    <input type="password" id="password" placeholder="Enter your password"
    value={password}
    onChange={(event)=> setPassword(event.target.value)}
    required/>

    <button type="submit" >Login</button>
    <span className="inline-login">
    <p className="lines">we recommed you that first 
      <Link to="/regestered" className="colored"> SignUp</Link>
      if you have'nt registered</p>
      </span>
  </form>
</div>
  )
}

export default Login