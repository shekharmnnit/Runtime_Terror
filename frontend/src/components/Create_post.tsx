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

function CreatePost({ postContent }) {

    const [justifyActive, setJustifyActive] = useState('tab1');

    let emptyObj = [{
        "caption": "",
        "tags": ["", "", "", "", ""],
    }];
    if (postContent == null) {
        postContent = emptyObj;
    }
    // console.log(postContent[0]);
    const [caption, setCaption] = useState(postContent[0].caption)
    const [tag1, setTag1] = useState(postContent[0].tags[0])
    const [tag2, setTag2] = useState(postContent[0].tags[1])
    const [tag3, setTag3] = useState(postContent[0].tags[2])
    const [tag4, setTag4] = useState(postContent[0].tags[3])
    const [tag5, setTag5] = useState(postContent[0].tags[4])
    let local_first_name = localStorage.getItem('local_first_name');
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
        console.warn(obj)
    }

    return (
        <div>
            <div>
                <textarea className='w-100' value={caption} onChange={(e) => setCaption(e.target.value)} placeholder='Enter Caption' style={{ backgroundColor: '#D9D9D9' }} />
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

        </div>

    )
};
export default CreatePost;