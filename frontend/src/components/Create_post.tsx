import React, { useState } from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import {
    MDBContainer,
    MDBTabs,
    MDBTabsItem,
    MDBTabsLink,
    MDBTabsContent,
    MDBTabsPane,
    MDBBtn,
    MDBIcon,
    MDBInput,
    MDBCheckbox
}
    from 'mdb-react-ui-kit';
import axios from 'axios';

function CreatePost() {
    const [justifyActive, setJustifyActive] = useState('tab1');
    const [caption, setCaption] = useState('')
    const [tag1, setTag1] = useState('')
    const [tag2, setTag2] = useState('')
    const [tag3, setTag3] = useState('')
    const [tag4, setTag4] = useState('')
    const [tag5, setTag5] = useState('')
    let local_first_name = localStorage.getItem('local_first_name');
    const [showPostBox, setShow] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };
    const handleFileUpload = () => {
        if (selectedFile) {
            console.log('Uploading file:', selectedFile);
            const formData = new FormData();
            formData.append('postfile', selectedFile);
            axios.post('YOUR_API_ENDPOINT', formData)
                .then((response) => {
                    // setLoading(false);
                    if (response.status === 200) {
                        console.log('File uploaded successfully.');
                        // Handle the API's response here, if needed.
                    } else {
                        console.error('File upload failed.');
                        // Handle error cases here.
                    }
                })
                .catch((error) => {
                    // setLoading(false);
                    console.error('File upload failed:', error);
                    // Handle network or other errors here.
                });

        } else {
            console.log('No file selected.');
        }
    };

    async function postRequest() {
        handleFileUpload()
        let obj = [{
            "caption": caption,
            "tags": [tag1, tag2, tag3, tag4, tag5]
        }]
        alert("Post created successfully.");
        setShow(!showPostBox)
        console.warn(obj)
    }

    return (
        <div>
            <div>
                <textarea className='w-100' value={caption} onChange={(e) => setCaption(e.target.value)} type='text' placeholder='Enter Caption' style={{ backgroundColor: '#D9D9D9' }} />
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div style={{ marginRight: '10px' }}>
                        <MDBInput wrapperClass='mb-4' value={tag1} onChange={(e) => setTag1(e.target.value)} type='text' placeholder='Tag 1' style={{ backgroundColor: '#D9D9D9' }} />
                    </div>
                    <div style={{ marginRight: '10px' }}>
                        <MDBInput wrapperClass='mb-4' value={tag2} onChange={(e) => setTag2(e.target.value)} placeholder='Tag 2' type='text' style={{ backgroundColor: '#D9D9D9' }} />
                    </div>
                    <div style={{ marginRight: '10px' }}>
                        <MDBInput wrapperClass='mb-4' value={tag3} onChange={(e) => setTag3(e.target.value)} placeholder='Tag 3' type='text' style={{ backgroundColor: '#D9D9D9' }} />
                    </div>
                    <div style={{ marginRight: '10px' }}>
                        <MDBInput wrapperClass='mb-4' value={tag4} onChange={(e) => setTag4(e.target.value)} placeholder='Tag 4' type='text' style={{ backgroundColor: '#D9D9D9' }} />
                    </div>
                    <MDBInput wrapperClass='mb-4' value={tag5} onChange={(e) => setTag5(e.target.value)} placeholder='Tag 5' type='text' style={{ backgroundColor: '#D9D9D9' }} />
                </div>
                <MDBInput wrapperClass='mb-4' type='file' style={{ backgroundColor: '#D9D9D9' }} onChange={handleFileChange} />
                <div className="text-center">
                    <button className="btn btn-primary" onClick={postRequest} style={{ backgroundColor: '#710808', borderColor: '#710808' }}>POST</button>
                </div>
            </div>

            {showPostBox && <div style={{ height: '114px', width: "50%", border: "solid 3px", margin: "8px" }}>
                <div style={{ height: '28px', border: "solid" }}>
                    {local_first_name}
                </div>
                <div style={{ height: '60px', border: "solid" }}>
                    {caption}
                </div>
                <div style={{ height: '24px', border: "solid" }}>
                    {tag1}     {tag2}    {tag3}  {tag4} {tag5}
                </div>
            </div>}

        </div>

    )
};
export default CreatePost;