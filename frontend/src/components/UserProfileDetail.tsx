import React, { useState } from 'react';
import '../assets/css/global.css';
import '../assets/css/UserProfileDetail.css';


function UserProfileDetail() {
    let firstName= String(localStorage.getItem('local_first_name'));
    let lastName= String(localStorage.getItem('local_last_name'));
    let email = String(localStorage.getItem('local_reg_email'));
    let profileObj={
    name: firstName + ' ' + lastName,
    email: email,
    initials:  (firstName[0] + lastName[0]).toUpperCase()
    }

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
                <div className="edit-button">Edit</div>
            </div>
        </section>
    )
}

export default UserProfileDetail;