import React, { useState } from 'react';
import CreatePost from './Create_post.tsx';
import AppHeader from './AppHeader.tsx';
import AppFooter from './AppFooter.tsx';
import ShowPostSummary from './Post_summary.tsx';
import { Link, useNavigate } from 'react-router-dom';
import '../assets/css/AppHeader.css';
import axios from "axios";
import { convertDate } from '../utils.js';

function SearchBar() {
    const navigate = useNavigate();
    const [searchText, setSearchText] = useState('');
    const searchArray = searchText.split(' ');
    const [feedPost, setFeedPost] = useState<{
    }[]>([]);

    let searchObj = {
        "skill": searchText
    }

    console.log(searchObj)

    async function searchRes() {
        try {
            const response = await axios.post(localStorage.getItem('apiServerURL') + "api/posts/searchBySkill", searchObj, {
                headers: {
                    'Content-Type': 'application/json'
                },
            });
            console.log(response)
            if (!response.data) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            let posts = [{}]
            posts.pop()
            response.data.forEach((post) => {
                let fileTypeHandel = ['PNG', 'JPEG', 'JPG', 'PNG', 'GIF', 'TIFF', 'PDF']
                let file = !!post.fileName && fileTypeHandel.includes((post.fileName.split('.')[1]).toUpperCase()
                ) ? [{
                    uri: localStorage.getItem('apiServerURL') + "api/posts/getFile/" + post.fileName,
                    fileType: post.fileName.split('.')[1],
                    fileName: 'file'
                }]
                    : [{
                        uri: localStorage.getItem('apiServerURL') + "api/posts/getFile/1700250920907.png",
                        fileType: 'png',
                        fileName: 'no file'
                    }]
                posts.push({
                    "user_id": post.userId,
                    "first_name": post.firstName,
                    "last_name": post.lastName,
                    "post_id": post._id,
                    "caption": post.caption,
                    "link": "https://www.google.com/",
                    "tags": post.skills,
                    "date": convertDate(post.lastUpdatedOn),
                    "docsToView": file
                })
            });
            setFeedPost(posts);
            navigate(
                "/home",
                {
                    state: {
                        feedPost: posts.reverse()
                    }
                }
            );

        } catch (error) {
            console.log("Error in search", error)
        }
    }

    return (
        <div className='search-box'>
            <input type="text" className="search-bar" placeholder="Search by tags" value={searchText} onChange={(e) => setSearchText(e.target.value)} />
            {/* <Link to="/home">
                <i className="fa fa-search"></i> 
                </Link> */}
            <i className="fa fa-search" style={{ cursor: 'pointer' }} onClick={searchRes}></i>
        </div>
    );
}

export default SearchBar;
