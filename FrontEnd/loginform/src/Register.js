import React, {useState,useContext } from "react";
import {AuthContext} from "./Authcontext";
import {Link} from "react-router-dom";
import "./App.css";



const Register=(()=>{

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const { register} =useContext(AuthContext);


    const handleUsername=((e)=>{
        e.preventDefault();
        const value=e.target.value;
        setUsername(value);
        console.log(value);
    });

    const handlePassword=((e)=>{
        e.preventDefault();
        const value=e.target.value;
        setPassword(value);
        console.log(value);
    });

    const handleEmail=((e)=>{
        e.preventDefault();
        const value=e.target.value;
        setEmail(value);
        console.log(value);
    });

    const handleSubmit = async (e) => {
      e.preventDefault();
      console.log('Submitting form...');
      await register(username, password, email)
      .then(()=>{
        setUsername("");
        setPassword("");
      })
      
    };
    

    return(
        <div className="formWrap">
            <form className="form" onSubmit={handleSubmit}>
                <label htmlFor="username">Username:</label>
                <input type="text" id="username" placeholder="Enter your username" onChange={handleUsername}></input>

                <label htmlFor="password">Password:</label>
                <input type="password" id="password" placeholder="Enter your password" onChange={handlePassword}></input>

                <label htmlFor="email">Email:</label>
                <input type="text" id="email" placeholder="Enter your Email" onChange={handleEmail}></input>

                <button type="submit">Register</button> 
            </form>



            <div className="login">
        Already have an account? <Link to="/login">Login here</Link>
      </div>


        </div>
    )

})

export default Register;