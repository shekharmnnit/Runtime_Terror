import React, { useState } from 'react';
import Post from './Post.tsx';
function Home() {
    const [show, setShow] = useState(true);
    return (
        <section>
            <div>
                <button onClick={() => setShow(!show)}>
                    {show ? "Hide" : "Show"} component
                </button>
                {show ? <Post /> : null}
            </div>
        </section>
    );
}

export default Home;