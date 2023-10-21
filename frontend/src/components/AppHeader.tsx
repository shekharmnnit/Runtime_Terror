
import React, { useState } from 'react';
import '../assets/css/global.css'
import '../assets/css/AppHeader.css';
import { Link } from 'react-router-dom';
// import Post from './Post';



function AppHeader() {

    const [show, setShow] = useState(true);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };
    return (

        <header className="header">
            <div className="logo-and-title">
                <Link to="/">
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
                <Link to="/"> <i className="fa fa-search"></i> </Link>
            </div>
            <div>
                <button className="button-create-post" onClick={() => setShow(!show)}>
                    <i className="fa-solid fa-circle-plus"></i>
                    Create post
                    {show ? "Hide" : "Show"}

                </button>
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
            <div>
                <button className="button-login" onClick={toggleDropdown}>
                    Kunal
                    <i className={`fa-solid fa-sort-${isDropdownOpen ? 'up' : 'down'}`}></i>
                </button>
                {isDropdownOpen && (
                    <div className="dropdown-content">
                        <Link to="/">Profile</Link>
                        <Link to="/">Log out</Link>

                    </div>
                )}
            </div>
        </header>
    )
}
export default AppHeader;

