import React, { useEffect, useState } from 'react';
import AppHeader from './AppHeader.tsx';
import '../assets/css/PostPage.css'
import AppFooter from './AppFooter.tsx';
import PostDetailContainer from './Post_detail_container.tsx';
import PostComment from './PostComment.tsx';
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { convertDate } from '../utils.js';
function PostPage() {
    const navigate = useNavigate();
    let [postData, setPostData] = useState(null);
    let [postId, setPostId] = useState(null);
    let local_first_name = localStorage.getItem('local_first_name');
    let path = window.location.pathname;
    console.log(path)
    const alphanumericAfterSlash = /post\/([a-zA-Z0-9]+)/;

    const match = path.match(alphanumericAfterSlash);
    useEffect(() => {
        const fetchData = async () => {
            // console.log('Match ' + match);
            if (match && match[1]) {
                const postId = match[1];
                console.log(postId);
                setPostId(postId)
                try {
                    const response = await axios.get(localStorage.getItem('apiServerURL') + `api/posts/fetch/${postId}`, {
                        headers: {
                            'Content-Type': 'application/json'
                        },
                    });

                    let temp = response.data
                    console.log(temp);
                    // let cur_user_id = response.data.userId
                    let fileTypeHandel = ['PNG', 'JPEG', 'JPG', 'PNG', 'GIF', 'TIFF', 'PDF','TXT','DOCX']
                    let fileName = response.data.fileName;
                    let file = !!fileName && fileTypeHandel.includes((fileName.split('.')[1]).toUpperCase()) ? [{
                        uri: localStorage.getItem('apiServerURL') + "api/posts/getFile/" + fileName,
                        fileType: fileName.split('.')[1],
                        fileName: fileName,
                        fileHandel:true
                    }] : [{
                        uri: localStorage.getItem('apiServerURL') + "api/posts/getFile/" + fileName,
                        fileType: fileName.split('.')[1],
                        fileName: fileName,
                        fileHandel:false
                    }]
                    let postDataResponse = {
                        postContent: {
                            "first_name": response.data.firstName,
                            "last_name": response.data.lastName,
                            "caption": response.data.caption,
                            "tags": response.data.skills,
                            "date": convertDate(response.data.lastUpdatedOn),
                            "userid": response.data.userId
                        },
                        comments: response.data.comments,
                        upvotes: response.data.upvotes,
                        downvotes: response.data.downvotes,
                        docsToView: file
                    }
                    // console.log(postDataResponse.upvotes)
                    setPostData(postDataResponse)
                    // { uri: require("./example-files/pdf.pdf") }, // Local File
                } catch (error) {
                    window.alert('Error fetching post')
                    console.error('Error fetching post:', error);
                    navigate("/home");
                }
            }
        };
        fetchData();
    }, []);

    const isContinueAsGuest = local_first_name == 'Guest' || local_first_name == '' || local_first_name == null;
    if (isContinueAsGuest) {
        return (
            <section>
                <div style={{ height: '10vh' }}><AppHeader /></div>
                <div style={{ padding: '20px', textAlign: 'center' }}>
                    <h2>Please <a href="/" style={{ color: 'blue' }}>Login</a> to continue browsing.</h2>
                </div>
                <div><AppFooter /></div>
            </section>
        );
    }

    console.log(path)
    if (postData === null) {
        return (
            <section>
                <div style={{ height: '10vh' }}><AppHeader /></div>
                <div style={{ padding: '20px', textAlign: 'center' }}>
                    <h2>Loading...</h2>
                </div>
                <div><AppFooter /></div>
            </section>
        );
    }


    let cur_user_id = 1;

    return (

        <section>
            <div style={{ height: '10vh' }}><AppHeader /></div>
            {!isContinueAsGuest && (
                <div>
                    <div className='postContent'>
                        <div className='postContentDetai postBody'>
                            <PostDetailContainer postContent={postData.postContent} postId={postId} />
                        </div>
                        <div className='comment postBody'><PostComment postComments={postData.comments} postId={postId} upvotes={postData.upvotes} downvotes={postData.downvotes} /> </div>
                    </div>
                    <div className='documentsView'>
                        <div className='document' style={{ height: '78vh', width: '98%'  }}>
                            {postData.docsToView[0].fileHandel && <DocViewer documents={postData.docsToView} pluginRenderers={DocViewerRenderers}
                                style={{ height: '10px' }} />}
                                {!postData.docsToView[0].fileHandel && <iframe src={postData.docsToView[0].uri} style={{ height: '78vh', width: '98%'  }}></iframe>}
                            {/* <img src="https://upload.wikimedia.org/wikipedia/commons/6/6c/PDF_icon.svg" alt="A beautiful landscape" /> */}
                        </div>
                    </div>
                </div>
            )}
            <div><AppFooter /></div>
        </section>
    )
}
export default PostPage;

