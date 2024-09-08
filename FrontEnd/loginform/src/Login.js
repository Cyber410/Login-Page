import React, { useState, useContext } from "react";
import { AuthContext } from "./Authcontext";
import { Link, useNavigate } from "react-router-dom";
import "./App.css";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const { login } = useContext(AuthContext);
    const navigate = useNavigate(); // Initialize useNavigate

    const handleUsername = (e) => {
        e.preventDefault();
        const value = e.target.value;
        setUsername(value);
    };

    const handlePassword = (e) => {
        e.preventDefault();
        const value = e.target.value;
        setPassword(value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(username, password); // Await login to ensure it completes
            navigate("/profile"); // Redirect to profile page
        } catch (error) {
            console.error("Login failed:", error);
        }
    };

    return (
        <div className="formWrap">
            <form className="form" onSubmit={handleSubmit}>
                <label htmlFor="username">Username:</label>
                <input
                    type="text"
                    id="username"
                    placeholder="Enter your username"
                    onChange={handleUsername}
                    value={username}
                />

                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    placeholder="Enter your password"
                    onChange={handlePassword}
                    value={password}
                />

                <button type="submit">Login</button>
            </form>

            <div className="register">
                Don't Have an Account! <Link to="/register">Register Here</Link>
            </div>
        </div>
    );
};

export default Login;
