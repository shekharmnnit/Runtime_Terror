
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
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };
    let local_first_name= localStorage.getItem('local_first_name');
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
                    <div><CreatePost/></div>
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
                <button className="button-login" onClick={toggleDropdown}>
                    {local_first_name}
                    <i className={`fa-solid fa-sort-${isDropdownOpen ? 'up' : 'down'}`}></i>
                 
                </button>
                {isDropdownOpen && (
                <ul >
                <li> Profile</li>
                    <li>Log out</li>
                    {/* <li> <Link to="/">Profile</Link></li>
                    <li><Link to="/">Log out</Link></li> */}
                </ul>
                  )}
            </div>
            
        </header>
    )
}
export default AppHeader;

