import React, { useState } from 'react';
import CreatePost from './Create_post.tsx';
import AppHeader from './AppHeader.tsx';
import AppFooter from './AppFooter.tsx';
import ShowPostSummary from './Post_summary.tsx';
import { useLocation } from 'react-router-dom';

function Home() {
    const [show, setShow] = useState(false);
    const location = useLocation();
    const { state } = location;
    const feedPost = state ? state.feedPost : null;
    console.log(feedPost)
    return (
        <section>
            <div style={{ height: '10vh' }}><AppHeader/></div>
            <div className='feedSection' style={{ backgroundColor: '#E9E9E9',height:'83%', width:'100%', position: 'fixed',margin:'10vh 0vh 0vh 0vh', padding:'1vh 20vh 1vh 20vh' ,overflow:'auto' }}>
                <ShowPostSummary feedPost={feedPost}/>
            </div>
            <div><AppFooter/></div>
        </section>
    );
}

export default Home;