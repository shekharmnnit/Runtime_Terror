import React, { useState } from 'react';
import Post from './Post.tsx';
import AppHeader from './AppHeader.tsx';
import AppFooter from './AppFooter.tsx';

function Home() {
    const [show, setShow] = useState(true);
    return (
        <section>
            <AppHeader/>
            <div>
                <button onClick={() => setShow(!show)}>
                    {show ? "Hide" : "Show"} component
                </button>
                {show ? <Post /> : null}
            </div>
            <AppFooter/>
        </section>
    );
}

export default Home;