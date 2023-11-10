import React, { useState } from 'react';
import '../assets/css/post_summary.css'
import linkImage from '../assets/file.png';
function ShowPostSummary({ feedPost }) {

    if (feedPost == null) {
        feedPost = [{
            "user_id": "1",
            "first_name": "Kunal",
            "last_name": "Mahato",
            "post_id":"12",
            "caption": "Review my paper on Software Engineering",
            "link": "https://www.google.com/",
            "tags": ["C++", "tag2", "tag3", "tag4", "tag5"],
            "date": "12-08-2023"
        },
        {
            "user_id": "2",
            "first_name": "Yo",
            "last_name": "Mahato",
            "caption": "Review my paper on Software Engineering",
            "link": "https://www.google.com/",
            "tags": ["C#", "tag2", "tag3", "tag4", "tag5"],
            "date": "12-08-2023"
        },
        {
            "user_id": "3",
            "first_name": "Yo",
            "last_name": "Mahato",
            "caption": "Review my paper on Software Engineering",
            "link": "https://www.google.com/",
            "tags": ["C#", "tag2", "tag3", "tag4", "tag5"],
            "date": "12-08-2023"
        }]
    }
    // let obj = [{
    //     "first_name": "Kunal",
    //     "last_name": "Mahato",
    //     "caption": "Review my paper on Software Engineering",
    //     "link": "https://www.google.com/",
    //     "tags": ["C++", "tag2", "tag3", "tag4", "tag5"],
    //     "date": "12-08-2023"      
    //   },
    //   {
    //     "first_name": "Yo",
    //     "last_name": "Mahato",
    //     "caption": "Review my paper on Software Engineering",
    //     "link": "https://www.google.com/",
    //     "tags": ["C#", "tag2", "tag3", "tag4", "tag5"],
    //     "date": "12-08-2023"
    //   },
    //   {
    //     "first_name": "Yo",
    //     "last_name": "Mahato",
    //     "caption": "Review my paper on Software Engineering",
    //     "link": "https://www.google.com/",
    //     "tags": ["C#", "tag2", "tag3", "tag4", "tag5"],
    //     "date": "12-08-2023"
    //   }]

    return (

        <div className="post-summary-container">
            {feedPost && feedPost.map((item, index) => (
                <a href={`/post/${item.post_id}`}>
                    <div className="post-summary" key={index}>
                        <div className="post-details">
                            <a href={`/profile/${item.user_id}`}>
                                <h4>{item.first_name} {item.last_name}</h4></a>
                            <p className="caption">{item.caption}</p>
                            <hr />
                            <div className="tags">
                                {item.tags.map((tag, index) => (
                                    <span key={index} className="tag-pill">{tag}</span>
                                ))}
                                <div className="date">{item.date}</div>
                            </div>
                        </div>
                        <div className="link-container">
                            <a href={item.link} className="link">
                                <img src={linkImage} alt="link" className="link-image" />
                            </a>
                        </div>
                    </div>
                </a>
            ))}
        </div>
    )
}

export default ShowPostSummary;