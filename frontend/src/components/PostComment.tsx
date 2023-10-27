import React, { useState } from 'react';
import '../assets/css/global.css';
import '../assets/css/PostComment.css';


function PostComment() {


    const [count, setCount] = useState(25);
    const [upvoteStyle, setUpvoteStyle] = useState({ color: '#9D9D9D' });
    const [downvoteStyle, setDownvoteStyle] = useState({ color: '#9D9D9D' });

    const handleUpvote = () => {
        setCount((prevCount) => {
            if (upvoteStyle.color === '#9D9D9D') {
                setUpvoteStyle({ color: '#710808' });
                setDownvoteStyle({ color: '#9D9D9D' });
                return prevCount + 1;
            } else {
                setUpvoteStyle({ color: '#9D9D9D' });
                return prevCount - 1;
            }
        });
    }

    const handleDownvote = () => {
        setCount((prevCount) => {
            if (downvoteStyle.color === '#9D9D9D') {
                setDownvoteStyle({ color: '#710808' });
                setUpvoteStyle({ color: '#9D9D9D' });
                return prevCount - 1;
            } else {
                setDownvoteStyle({ color: '#9D9D9D' });
                return prevCount + 1;
            }
        });
    }

    let obj = [{
        "first_name": "Kunal",
        "last_name": "Mahato",
        "comment": "This is a great paper!",
        "date": "12-08-2023"
    }, {
        "first_name": "Kunal",
        "last_name": "Mahato",
        "comment": "This is a great paper!",
        "date": "12-08-2023"
    }]


    return (
        <section>
            <div className="comment">
                <div className="new-comment">
                    <div className="add-comment">
                        <input type="text" className="comment-box" placeholder="Add new comment" />
                        <i className="fa-solid fa-plus"></i>
                    </div>

                    <div className="upvote-downvote">
                        <i
                            className="fa-solid fa-circle-arrow-up"
                            style={upvoteStyle}
                            onClick={handleUpvote}
                        ></i>
                        <i
                            className="fa-solid fa-circle-arrow-down"
                            style={downvoteStyle}
                            onClick={handleDownvote}
                        ></i>
                        <div>{count}</div>
                    </div>
                </div>
                <div>
                    {obj.map((item, index) => (
                        <div key={index}>
                            <div className="comment-details">
                                <div className="comment-user">
                                    <div>  <h6>{item.first_name} {item.last_name}</h6> </div>
                                    <div className="comment-date">{item.date}</div>
                                </div>
                                <div className="comment-text">
                                    <p>{item.comment}</p>
                                </div>

                            </div>

                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default PostComment;