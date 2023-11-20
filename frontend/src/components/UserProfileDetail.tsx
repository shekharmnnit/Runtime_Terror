import React, { useState } from 'react';
import '../assets/css/global.css';
import '../assets/css/UserProfileDetail.css';
import EditProfileDetail from './EditProfileDetail.tsx';
import Popup from 'reactjs-popup';
import axios from 'axios';

function UserProfileDetail({ obj }) {

    let profileObj = {
        name: obj.firstName +' '+obj.lastName,
        firstName: obj.firstName,
        lastName: obj.lastName,
        email: obj.email,
        skills: obj.skills,
        isEditable: obj.isEditable,
        initials: (obj.firstName[0] + obj.lastName[0]),
    };
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleEditClick = () => {
        setIsModalOpen(!isModalOpen); // Toggle the modal state

    };

    function saveProfile(param){
        let localToken = (String)(localStorage.getItem('local_login_token'));
        let userID = (String)(localStorage.getItem('local_loggedin_userid'));

        const editProfileObj = {
            "firstName": param.firstName,
            "lastName": param.lastName,
            "skills": param.tags,
        };

        axios.post(localStorage.getItem('apiServerURL') + `api/user/updateProfile`, editProfileObj, {
          headers: {
              'x-auth-token': localToken,
              'Content-Type': 'application/json',
          },
          })
          .then((response) => {
              console.log("PC "+response.status)
              if (response.status === 201) {
                  console.log('Edit Profile Updated successfully.');
                  window.location.reload();
              } else {
                  console.error('Edit Profile failed');
              }
          })
          .catch((error) => {
              // setLoading(false);
              console.error('Edit Profile failed:', error);
              // Handle network or other errors here.
          });
    }

    const handleClosePopup = () => {
        setIsModalOpen(false);
    };

    return (
        <section>
            <div className="user-detail">
                <div className="user-image" >
                    <div className="user-initials"> {profileObj.initials}</div>    
                </div>
                <div>
                <div className="user-profile-details">
                    {profileObj.name} <br></br>
                </div>
                <div className="user-profile-details">
                    {profileObj.email}
                </div>
                <div className="user-profile-details">
                    Skills: {profileObj.skills.filter(skill => skill.trim() !== '').join(', ')}
                </div>
                {profileObj.isEditable &&<button className="edit-button" onClick={handleEditClick}>
                    Edit
                </button>}
                </div>
                <Popup
                    open={isModalOpen}
                    closeOnDocumentClick
                    onClose={handleClosePopup} // Close the modal when clicking outside
                    className="custom-popup-class"
                >
                    <EditProfileDetail
                        userDetails={{
                            firstName:profileObj.firstName,
                            lastName:profileObj.lastName,
                            tags: profileObj.skills, // Add the tags from localStorage or your data source
                        }}
                        onSave={(param) => {
                            // Handle save logic here
                            handleClosePopup(); // Close the modal after saving
                            saveProfile(param)
                        }}
                    />
                </Popup>
            </div>         
        </section>
    )
}

export default UserProfileDetail;