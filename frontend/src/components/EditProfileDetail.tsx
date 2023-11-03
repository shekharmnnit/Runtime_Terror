import React, { useState } from 'react';

import '../assets/css/global.css'
import '../assets/css/EditProfileDetail.css';

function EditProfileDetail({ userDetails, onSave }) {
  const [firstName, setFirstName] = useState(userDetails.firstName);
  const [lastName, setLastName] = useState(userDetails.lastName);
  const [tag1, setTag1] = useState(userDetails.tags[0]);
  const [tag2, setTag2] = useState(userDetails.tags[1]);
  const [tag3, setTag3] = useState(userDetails.tags[2]);
  const [tag4, setTag4] = useState(userDetails.tags[3]);
  const [tag5, setTag5] = useState(userDetails.tags[4]);

  const handleSave = () => {
    const updatedUserDetails = {
      firstName,
      lastName,
      tags: [tag1, tag2, tag3, tag4, tag5],
    };

    // Call the onSave function to save the updated details
    onSave(updatedUserDetails);
  };

  return (
    <div className='edit-details'>
      <h4>Edit User Details</h4>
      <div className='input-group'>
      <label>First Name:</label>
      <input
        type="text"
        value={firstName}
        placeholder='First Name'
        onChange={(e) => setFirstName(e.target.value)}
      />
      <br />
      </div>
      <div className='input-group'>
      <label>Last Name:</label>
      <input
        type="text"
        value={lastName}
        placeholder='Last Name'
        onChange={(e) => setLastName(e.target.value)}
      />
      <br />
      </div>
      <div className = 'skills-tag'>
      <div className='input-group'>
      <label>Tag 1:</label>
      <input
        type="text"
        value={tag1}
        placeholder='Tag 1'
        onChange={(e) => setTag1(e.target.value)}
      />
      <br />
      </div>
      <div className='input-group'>
      <label>Tag 2:</label>
      <input
        type="text"
        value={tag2}
        placeholder='Tag 2'
        onChange={(e) => setTag2(e.target.value)}
      />
      <br />
      </div>
      <div className='input-group'>
      <label>Tag 3:</label>
      <input
        type="text"
        value={tag3}
        placeholder='Tag 3'
        onChange={(e) => setTag3(e.target.value)}
      />
      <br />
      </div>
      <div className='input-group'>
      <label>Tag 4:</label>
      <input
        type="text"
        value={tag4}
        placeholder='Tag 4'
        onChange={(e) => setTag4(e.target.value)}
      />
      <br />
      </div>
      <div className='input-group'>
      <label>Tag 5:</label>
      <input
        type="text"
        value={tag5}
        placeholder='Tag 5'
        onChange={(e) => setTag5(e.target.value)}
      />
      <br />
      </div>
      </div>
      <div>
      <button onClick={handleSave}>Save</button>
      
      </div>
    </div>
  );
}

export default EditProfileDetail;
