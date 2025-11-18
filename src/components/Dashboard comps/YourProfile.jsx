import React, { useEffect, useState } from "react";
import "../styles/YourProfile.css";

const YourProfile = ({ email }) => {
  const [startupData, setStartupData] = useState(null);
  const [profileImage, setProfileImage] = useState(null); // Store profile image

  // Fetch the startup data from backend API
  const fetchStartupData = () => {
    fetch("http://localhost:5002/api/startup-basic", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ Email_ID: email }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setStartupData(data.basicdata);
          setProfileImage(data.basicdata.profileImage || null); // Set profile image if available
        } else {
          console.error(data.message);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  useEffect(() => {
    fetchStartupData(); // Fetch startup data when the component mounts
  }, []);

  const handleProfileImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result); // Set new profile image
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <center>
      <div className="tot-cont mt-36 relative ">
        <div className="container">
          <div className="profilecircle">
            {profileImage ? (
              <img src={profileImage} alt="Profile" />
            ) : (
              <span>{email[0].toUpperCase()}</span>
            )}
          </div>
          <div className="profile-actions">
            <input
              type="file"
              accept="image/*"
              id="profileImageUpload"
              onChange={handleProfileImageChange}
              style={{ display: "none" }}
            />
            <button
              className="update-btn"
              onClick={() => document.getElementById("profileImageUpload").click()}
            >
              Update Profile Picture
            </button>
          </div>
          <div className="startupdata">
            {startupData ? (
              <div className="yrpdata">
                <p>
                  <span className="highlight">Company Name: </span>
                  {startupData.companyName}
                </p>
                <p>
                  <span className="highlight">Email: </span>
                  {startupData.Email_ID}
                </p>
                <p>
                  <span className="highlight">Address: </span>
                  {startupData.address}
                </p>
                <p>
                  <span className="highlight">Phone Number: </span>
                  {startupData.phone_number}
                </p>

              </div>
            ) : (
              <p>No data available.</p>
            )}
          </div>
        </div>
      </div>
    </center>
  );
};

export default YourProfile;
