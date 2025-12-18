import React, {useState} from 'react'
import './Registered.css'
import { Link } from "react-router-dom";
import axios from 'axios'
import { useNavigate } from "react-router-dom";





function Registered() {
      const navigate = useNavigate();

  
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")


  async function handleClick(event){

    event.preventDefault()
    const payLoad = {name,email, password }

    // console.log(payLoad)
    //sending data to backend 
    try {
      const result = await axios.post(`${import.meta.env.VITE_API_URL}/register/api`, payLoad)
      console.log("user response from backend:", result.data)

      //store in localstorage
      localStorage.setItem("user_id", result.data.user_id)
      alert("Registration successful");
      navigate("/login")
    } catch (error) {
    console.error("registration failed:", error);
    alert("registration failed")
    }

    setEmail(""), setName(""), setPassword("")
  }

  

  return (
    <div className="regester-main-container">
  <form className="regester-form-container" >
    <h2 className="reg-heading">Sign Up</h2>
    <label for="name">Name</label>
    <input onChange={(event)=> setName(event.target.value)} type="name" id="name" placeholder="Enter your Fullname" value={name}
    
    required/>

    <label for="email">Email</label>
    <input onChange={(event)=> setEmail(event.target.value)} type="email" id="email" placeholder="Enter your email" value={email}
    
    required/>

    <label for="password">Password</label>
    <input onChange={(event)=> setPassword(event.target.value)} type="password" id="password" placeholder="Enter your password"
    value={password}
    required/>

    <button onClick={handleClick} type="submit" >SignUp</button>
    <span className="inline-register">
    <p className="reg-lines">we recommed you to 
      <Link to="/login" className="colored-reg">Login</Link>
      if you already registered.</p>
      </span>
  </form>
</div>
  )
}

export default Registered