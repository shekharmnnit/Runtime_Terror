import React from 'react';
import '../assets/css/post_detail.css';
import linkImage from '../assets/file.png';
import Popup from 'reactjs-popup';
import CreatePost from './Create_post.tsx';

function PostDetailContainer({ postContent }) {
    // let obj = [{
    //     "first_name": "Kunal",
    //     "last_name": "Mahato",
    //     "caption": "Review my paper on Software Engineering",
    //     "link": "https://www.google.com/",
    //     "tags": ["C++", "tag2", "tag3", "tag4", "tag5"],
    //     "date": "12-08-2023"
    // }];
    postContent = [postContent];
    return (
        <div className="post-detail-summary-container">
            {postContent && postContent.map((item, index) => (
                <div className="post-detail-summary" key={index}>
                    <div className="post-details">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                            <h4 style={{ display: 'inline' }}>{item.first_name} {item.last_name}</h4>
                            <div>

                                <Popup trigger={<button className="button-create-post" onClick={() => setShow(!show)}><i className="fa-regular fa-pen-to-square icon" style={{ marginLeft: '10px' }}></i></button>} position="center center">

                                    <div>
                                        <div><CreatePost postContent={postContent}/></div>
                                    </div>
                                </Popup>
                                <button>
                                    <i className="fa-solid fa-trash icon" style={{ marginLeft: '10px' }}></i>
                                </button>
                            </div>
                        </div>
                        <p className="caption">{item.caption}</p>
                        <hr />
                        <div className="tags">
                            {item.tags.map((tag, index) => (
                                <span key={index} className="tag-pill">{tag}</span>
                            ))}
                            <div className="date">{item.date}</div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default PostDetailContainer;
