import React, { useState } from 'react';
import '../assets/css/global.css';
import '../assets/css/UserProfileDetail.css';
import EditProfileDetail from './EditProfileDetail.tsx';
import Popup from 'reactjs-popup';

function UserProfileDetail({ obj }) {

    let firstName = String(localStorage.getItem('local_first_name'));
    let lastName = String(localStorage.getItem('local_last_name'));
    let email = String(localStorage.getItem('local_reg_email'));
    let path = window.location.pathname;
    console.log(path);
    const hasDigits = /\d/.test(path);
    if (hasDigits) {
        const id = path.match(/\d+/g);
        if (obj) {
            obj.map((item, index) => {
                if (parseInt(item.user_id) === parseInt(id)) {
                    firstName = item.first_name;
                    lastName = item.last_name;
                }
            });
        }
    }
    let profileObj = {
        name: firstName + ' ' + lastName,
        email: email,
        initials: (firstName[0] + lastName[0]).toUpperCase()
    };
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleEditClick = () => {
        setIsModalOpen(!isModalOpen); // Toggle the modal state
    };

    const handleClosePopup = () => {
        setIsModalOpen(false);
    };


    return (
        <section>
            <div className="user-detail">
                <div className="user-image" >
                    {profileObj.initials}
                </div>
                <div className="user-profile-details">
                    {profileObj.name} <br></br>
                </div>
                <div className="user-profile-details">
                    {profileObj.email}
                </div>
                <button className="edit-button" onClick={handleEditClick}>
                    Edit
                </button>
                <Popup
                    open={isModalOpen}
                    closeOnDocumentClick
                    onClose={handleClosePopup} // Close the modal when clicking outside
                    className="custom-popup-class"
                >
                    <EditProfileDetail
                        userDetails={{
                            firstName,
                            lastName,
                            tags: [], // Add the tags from localStorage or your data source
                        }}
                        onSave={() => {
                            // Handle save logic here
                            handleClosePopup(); // Close the modal after saving
                        }}
                    />
                </Popup>
            </div>         
        </section>
    )
}

export default UserProfileDetail;