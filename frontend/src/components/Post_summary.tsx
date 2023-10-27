import React, { useState } from 'react';
import '../assets/css/post_summary.css'
import linkImage from '../assets/file.png';
function ShowPostSummary() {
    let obj = [{
        "first_name": "Kunal",
        "last_name": "Mahato",
        "caption": "Review my paper on Software Engineering",
        "link": "https://www.google.com/",
        "tags": ["C++", "tag2", "tag3", "tag4", "tag5"],
        "date": "12-08-2023"
      }]

    return (

        <div className="post-summary-container">
            {obj.map((item, index) => (
                <div className="post-summary" key={index}>
                    <div className="post-details">
                        <h4>{item.first_name} {item.last_name}</h4>
                        <p className="caption">{item.caption}</p>
                        <hr/>
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
            ))}
        </div>
    )
}

export default ShowPostSummary;