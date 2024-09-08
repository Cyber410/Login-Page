import React, { createContext, useState } from "react";
import axios from "axios";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token') || '');

    const register = async (username, password, email) => {
        await axios.post('http://localhost:8000/register', { username, password, email });
    };

    const login = async (username, password) => {
        try {
            const response = await axios.post("http://localhost:8000/login", { username, password });
            const token = response.data.token;
            setToken(token);
            
            localStorage.setItem('token', token); // Store token in localStorage
            const userProfile = await getUserProfile(token);
            setUser(userProfile);
        } catch (error) {
            console.error("Error during login:", error);
        }
    };

    const getUserProfile = async (token) => {
        const response = await axios.get('http://localhost:8000/profile', {
            headers: {
                Authorization: `Bearer ${token}`, // Correct header format
            },
        });
        return response.data;
    };

    const logout = () => {
        setUser(null);
        setToken('');
        localStorage.removeItem('token');
    };

    return (
        <AuthContext.Provider value={{ login, logout, register, user }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthProvider, AuthContext };
