import React, { useState } from 'react';
import AppHeader from './AppHeader.tsx';
import '../assets/css/PostPage.css'
import AppFooter from './AppFooter.tsx';
import PostDetailContainer from './Post_detail_container.tsx';
import PostComment from './PostComment.tsx';

function PostPage() {

    let local_first_name = localStorage.getItem('local_first_name');

    //fetch call with ID here
    let postData = {
        postContent: {
            "first_name": "Kunal",
            "last_name": "Mahato",
            "caption": "Review my paper on Machine Learning & SE from PostPage",
            "tags": ["C++", "Java", "Python", "C#", "JavaScript"],
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
        ]
    }


    return (

        <section>
            <div style={{ height: '10vh' }}><AppHeader /></div>
            <div>
                <div className='postContent'>
                    <div className='postContentDetai postBody'>
                        <PostDetailContainer postContent={postData.postContent} />
                    </div>
                    <div className='comment postBody'><PostComment postComments={postData.comments} /> </div>
                </div>
                <div className='documentsView'>
                    <div className='document'>
                        <img src="https://upload.wikimedia.org/wikipedia/commons/6/6c/PDF_icon.svg" alt="A beautiful landscape" />
                    </div>
                </div>
            </div>
            <div><AppFooter /></div>
        </section>
    )
}
export default PostPage;

