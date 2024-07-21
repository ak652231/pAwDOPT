import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import './UserProfile.css';

function UserProfile() {
    const [user, setUser] = useState(null);
    const navigate=useNavigate();
    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const token = localStorage.getItem('token');
                const details = await fetch('http://localhost:5000/api/auth/userprofile', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'x-auth-token': token
                    },
                });

                if (!details.ok) {
                    throw new Error('Failed to get user profile');
                }

                const result = await details.json();
                setUser(result);
            } catch (error) {
                console.error('Error fetching user profile:', error);
            }
        };

        fetchUserProfile();
    }, []);

    const handleSubmit=()=>{
        navigate('/editUser');
    };
    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <div className="up-profile-page">
            <Navbar />
            <div className="up-profile-content">
                <h1 className="nuni up-page-title">Your Profile</h1>

                <div className="up-profile-card">
                    <div className="up-profile-header">
                        <div className="up-profile-avatar">
                            {user.name.charAt(0)}
                        </div>
                        <h2 className="nuni up-profile-name">{user.name}</h2>
                        <p className="nuni up-profile-role">{user.role}</p>
                    </div>

                    <div className="up-profile-details">
                        <div className="up-detail-item">
                            <span className="up-detail-label">Email:</span>
                            <span className="up-detail-value">{user.email}</span>
                        </div>
                        <div className="up-detail-item">
                            <span className="up-detail-label">Phone:</span>
                            <span className="up-detail-value">{user.number}</span>
                        </div>
                        <div className="up-detail-item">
                            <span className="up-detail-label">Address:</span>
                            <span className="up-detail-value">{user.address}</span>
                        </div>
                        <div className="up-detail-item">
                            <span className="up-detail-label">Gender:</span>
                            <span className="up-detail-value">{user.gender}</span>
                        </div>
                        <div className="up-detail-item">
                            <span className="up-detail-label">Age:</span>
                            <span className="up-detail-value">{user.age}</span>
                        </div>
                    </div>

                    <button className="up-edit-profile-button nuni" onClick={() => handleSubmit()}>Edit Profile</button>
                </div>

            </div>
        </div>
    );
}

export default UserProfile;