import React, { useState } from 'react';
import AppHeader from './AppHeader.tsx';
import '../assets/css/PostPage.css'
import AppFooter from './AppFooter.tsx';
import ShowPostContent from './Post_detail_container.tsx';
import PostComment from './PostComment.tsx';

function PostPage() {

    let local_first_name= localStorage.getItem('local_first_name');

  
    return (

        <section>
            <div style={{ height: '10vh' }}><AppHeader/></div>
            <div>
                <div className='postContent'>
                    <div className='postContentDetai postBody'>
                    <ShowPostContent/>
                    </div>
                    <div className='comment postBody'><PostComment/> </div>
                </div>
                <div className='documentsView'>
                    <div className='document'>
                        <img src="https://upload.wikimedia.org/wikipedia/commons/6/6c/PDF_icon.svg" alt="A beautiful landscape"/>
                    </div>
                </div>
            </div>
            <div><AppFooter/></div>
        </section>
    )
}
export default PostPage;

