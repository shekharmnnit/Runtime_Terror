import React, { useState } from 'react';
import AppHeader from './AppHeader.tsx';
import '../assets/css/PostPage.css'
import AppFooter from './AppFooter.tsx';
import PostDetailContainer from './Post_detail_container.tsx';
import PostComment from './PostComment.tsx';
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";

function PostPage() {

    let local_first_name = localStorage.getItem('local_first_name');
    let path = window.location.pathname;
    console.log(path)
    const hasDigits = /\d/.test(path);
    if (hasDigits) {
        const id = path.match(/\d+/g);
        console.log(id)
    }

    const isContinueAsGuest = local_first_name == 'Guest'|| local_first_name == '' ||local_first_name == null ;
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
    
    // let path = window.location.pathname;
    // console.log(path)
    //fetch call with ID here
    let postData = {
        postContent: {
            "first_name": "Kunal",
            "last_name": "Mahato",
            "caption": "Review my paper on Machine Learning & SE from PostPage",
            "tags": ["C++", "Java", "Python", "C#", "OP"],
            "date": "11-02-2023"
        },
        url: "https://www.google.com/",
        comments: [
            {
                "first_name": "Laxman",
                "last_name": "Mahato",
                "comment": "This is a great!",
                "date": "12-08-2023"
            },
            {
                "first_name": "Kunal",
                "last_name": "Srikar",
                "comment": "Appreciate that, great work",
                "date": "12-08-2023"
            }
        ],
        docsToView:[
    
            { 
                uri: localStorage.getItem('apiServerURL')+"api/posts/getFile/1700250920907.png",
                fileType:'jpg',
                fileName:'shekhar'
            },
            { 
                uri: localStorage.getItem('apiServerURL')+"api/posts/getFile/1700251725026.pdf",
                    fileType:'pdf',
                    fileName:'pdf'
            }
            // { uri: require("./example-files/pdf.pdf") }, // Local File
        ]
    }

    let cur_user_id = 1;

    return (

        <section>
            <div style={{ height: '10vh' }}><AppHeader /></div>
            {!isContinueAsGuest && (
            <div>
                <div className='postContent'>
                    <div className='postContentDetai postBody'>
                        <PostDetailContainer postContent={postData.postContent} cur_user_id={cur_user_id} />
                    </div>
                    <div className='comment postBody'><PostComment postComments={postData.comments} /> </div>
                </div>
                <div className='documentsView'>
                    <div className='document'>
                        <DocViewer documents={postData.docsToView} pluginRenderers={DocViewerRenderers}
                        style={{height:'1000px'}} />
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

