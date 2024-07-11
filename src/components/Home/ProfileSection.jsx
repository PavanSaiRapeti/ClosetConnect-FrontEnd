import React from 'react';

const ProfileSection = () => {
  return (
    <div className="profile-section">
      <h2 className="text-2xl font-bold mb-4">Your Profile</h2>
      <div className="profile-info">
        <p><strong>Name:</strong> John Doe</p>
        <p><strong>Email:</strong> johndoe@example.com</p>
        <p><strong>Joined:</strong> 2022-01-01</p>
      </div>
    </div>
  );
};

export default ProfileSection;
