import React, { useState } from 'react';
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

function CreatePost() {
    const [justifyActive, setJustifyActive] = useState('tab1');
    const [caption, setCaption] = useState('')
    const [tag1, setTag1] = useState('')
    const [tag2, setTag2] = useState('')
    const [tag3, setTag3] = useState('')
    const [tag4, setTag4] = useState('')
    const [tag5, setTag5] = useState('')
    return (
        <div>
            <div className='w-50'>
                        <MDBInput wrapperClass='mb-4' value={caption} onChange={(e) => setCaption(e.target.value)} type='text' placeholder='Enter Caption' style={{ backgroundColor: '#D9D9D9' }} />
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
                <MDBInput wrapperClass='mb-4' type='file' style={{ backgroundColor: '#D9D9D9' }} />
                <div className="text-center">
                    <button className="btn btn-primary" style={{ backgroundColor: '#710808', borderColor: '#710808' }}>POST</button>
                </div>
            </div>

        </div>

    )
};
export default CreatePost;