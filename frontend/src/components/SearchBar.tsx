import React, { useState } from 'react';
import CreatePost from './Create_post.tsx';
import AppHeader from './AppHeader.tsx';
import AppFooter from './AppFooter.tsx';
import ShowPostSummary from './Post_summary.tsx';
import { Link } from 'react-router-dom';
import '../assets/css/AppHeader.css';

function SearchBar() {

    const [searchText, setSearchText] = useState('');
    const searchArray = searchText.split(' ');
    console.log(searchArray)

    //fetch with searchArray
    let feedPost = [{
        "user_id": "4",
        "first_name": "Hamesha",
        "last_name": "Mahato",
        "caption": "Review my paper on Software Engineering",
        "link": "https://www.google.com/",
        "tags": ["C++", "tag2", "tag3", "tag4", "tag5"],
        "date": "12-08-2023"
    },
    {
        "user_id": "5",
        "first_name": "Yo",
        "last_name": "Pool",
        "caption": "Review my paper on Software Engineering",
        "link": "https://www.google.com/",
        "tags": ["C#", "tag2", "tag3", "tag4", "tag5"],
        "date": "12-08-2023"
    },
    {
        "user_id": "6",
        "first_name": "Yo",
        "last_name": "Mahato",
        "caption": "Review my paper on Software Engineering",
        "link": "https://www.google.com/",
        "tags": ["C#", "tag2", "tag3", "tag4", "tag5"],
        "date": "12-08-2023"
    }]



    return (
        <div className='search-box'>
            <input type="text" className="search-bar" placeholder="Search by tags" value={searchText} onChange={(e) => setSearchText(e.target.value)} />
            {/* <Link to="/home">
                <i className="fa fa-search"></i> 
                </Link> */}
             <Link to="/home" state={{ feedPost }}>
                <i className="fa fa-search"></i>
            </Link>
        </div>
    );
}

export default SearchBar;