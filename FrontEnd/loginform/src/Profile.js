import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Profile = () => {
    const [user, setUser] = useState(null);
    const token = localStorage.getItem('token'); // Retrieve token from localStorage

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const response = await axios.get('http://localhost:8000/profile', {
                    headers: {
                        Authorization: `Bearer ${token}`, // Use Bearer token format
                    }
                });
                setUser(response.data); // Update local state with user profile data
            } catch (error) {
                console.error('Error fetching user profile:', error);
            }
        };

        fetchUserProfile();
    }, [token]);

    if (!user) return <div>Loading...</div>;

    return (
        <div>
            <h1>Profile</h1>
            <p>Username: {user.username}</p>
            <p>Email: {user.email}</p>
            {/* Render other user profile details */}
        </div>
    );
};

export default Profile;
