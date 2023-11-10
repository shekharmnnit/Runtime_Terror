
import React, { useState } from 'react';
import '../assets/css/global.css'
import '../assets/css/AppHeader.css';
import { Link } from 'react-router-dom';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import CreatePost from './Create_post.tsx';
import SearchBar from './SearchBar.tsx';
// import Post from './Post';
import { clearLocalStorage } from './LocalStorageUtils.tsx';

function handleLogout() {
    clearLocalStorage();
}

function AppHeader() {
    const [showNotificationDropdown, setShowNotificationDropdown] = useState(false);
    const [showGreenNotificationIcon, setShowGreenNotificationIcon] = useState(true);
    function handleNotificationDropdown() {
        clearLocalStorage();
        setShowNotificationDropdown(!showNotificationDropdown)
        setShowGreenNotificationIcon(false)
    }
    const [notificationList, setNotificationList] = useState([{
        name: "apple",
        url: "post"
    },
    {
        name: "man",
        url: "www.fb.com"
    },
    {
        name: "cat",
        url: "https://www.facebook.com/"
    }]);
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
                <SearchBar />
l̥            <div>
                <Popup trigger={<button className="button-create-post" onClick={() => setShow(!show)}><i className="fa-solid fa-circle-plus"></i>Create post{/* {show ? "Hide" : "Show"} */}</button>} position="center center">
                    <div>
                        Create Post
                        <div><CreatePost /></div>
                        {/* <button onClick={() => Popup.close()}>Close</button> */}
                    </div>
                </Popup>
                {/* {show ? <Post /> : null} */}
            </div>
            <div className='notification-dropdown'>
                <i onClick={handleNotificationDropdown} className="fa-solid fa-bell fa-2x notification-icon"></i>
                {showGreenNotificationIcon && <i className="fa-solid fa-circle" style={{ "color": "#58ec09" }}></i>}
                {showNotificationDropdown && <div className="dropdown-content">
                    {notificationList.map((item, index) => (
                        <a href={item.url}>{item.name}</a>
                    ))}
                </div>}
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
                    <a href="/profile">Profile</a>
                    <a href="/" onClick={handleLogout}>Log Out</a>

                </div>
            </div>

        </header>
    )
}
export default AppHeader;

