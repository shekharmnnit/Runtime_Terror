import React, { useState } from 'react';
import CreatePost from './Create_post.tsx';
import AppHeader from './AppHeader.tsx';
import AppFooter from './AppFooter.tsx';

function Home() {
    const [show, setShow] = useState(false);
    return (
        <section>
            <div style={{ height: '10vh' }}><AppHeader/></div>
            <div>
                <button onClick={() => setShow(!show)}>
                    {show ? "Create" : "Create"} Post
                </button>
                {show ? <CreatePost /> : null}
            </div>
            <div><AppFooter/></div>
        </section>
    );
}

export default Home;