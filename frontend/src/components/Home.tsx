import React, { useState } from 'react';
import CreatePost from './Create_post.tsx';
import AppHeader from './AppHeader.tsx';
import AppFooter from './AppFooter.tsx';
import ShowPostSummary from './Post_summary.tsx';

function Home() {
    const [show, setShow] = useState(false);
    return (
        <section>
            <div style={{ height: '10vh' }}><AppHeader/></div>
            <div className='feedSection' style={{ backgroundColor: '#E9E9E9',height:'83%', width:'80%', position: 'fixed',margin:'10vh 0vh 0vh 16vh',overflow:'auto' }}>
                <ShowPostSummary/>
            </div>
            <div><AppFooter/></div>
        </section>
    );
}

export default Home;