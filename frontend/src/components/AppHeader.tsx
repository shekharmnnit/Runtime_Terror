
import React, { useState } from 'react';
import '../assets/css/global.css'
import '../assets/css/AppHeader.css';
import { Link } from 'react-router-dom';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import CreatePost from './Create_post.tsx';
// import Post from './Post';



function AppHeader() {

    const [show, setShow] = useState(true);

    let local_first_name = localStorage.getItem('local_first_name');
    return (

        <header className="header">
            <div className="logo-and-title">
                <Link to="/home">
                    <div style={{ display: 'inline-flex' }}>
                        <i className="fa-solid fa-user-pen fa-2x"></i>
                    </div>
                </Link>
                <div>
                    <h1 className="text-logo">REVIEW ME</h1>
                </div>
            </div>
            <div className="search-box">
                <input type="text" className="search-bar" placeholder="Search" />
                <Link to="/home"> <i className="fa fa-search"></i> </Link>
            </div>
            <div>
                <Popup trigger={<button className="button-create-post" onClick={() => setShow(!show)}><i className="fa-solid fa-circle-plus"></i>Create post{/* {show ? "Hide" : "Show"} */}</button>} position="center center">
                    <div>
                        Create Post
                        <div><CreatePost /></div>
                        {/* <button onClick={() => Popup.close()}>Close</button> */}
                    </div>
                </Popup>
                {/* {show ? <Post /> : null} */}
            </div>
            <div>
                <i className="fa-solid fa-bell fa-2x"></i>
            </div>
            {/* <div>
                <Link to="/">  <button className="button-login">
                    Kunal
                    <i class="fa-solid fa-sort-down"></i>
                </button> </Link>
            </div> */}

            <div className="header-dropdown">
                <button className="button-login">
                    {local_first_name}
                    <i className={`fa-solid fa-sort-down`}></i>
                </button>
                <div className="dropdown-content">
                    <a href="#">Link 1</a>
                    <a href="#">Link 2</a>
                    <a href="#">Link 3</a>
                </div>
            </div>

        </header>
    )
}
export default AppHeader;

