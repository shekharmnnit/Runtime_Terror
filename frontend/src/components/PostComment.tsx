import React, { useEffect, useRef, useState } from 'react';
import '../assets/css/global.css';
import '../assets/css/PostComment.css';
import axios from 'axios';
import { convertDate } from '../utils.js';
function PostComment({ postComments, postId }) {


    const [count, setCount] = useState(25);
    const [upvoteStyle, setUpvoteStyle] = useState({ color: '#9D9D9D' });
    const [downvoteStyle, setDownvoteStyle] = useState({ color: '#9D9D9D' });

    const handleUpvote = () => {
        setCount((prevCount) => {
            if (upvoteStyle.color === '#9D9D9D') {
                if (downvoteStyle.color === '#710808') {
                    setDownvoteStyle({ color: '#9D9D9D' });
                    setUpvoteStyle({ color: '#710808' });
                    return prevCount + 2;
                } else {
                    setUpvoteStyle({ color: '#710808' });
                    return prevCount + 1;
                }
            } else {
                setUpvoteStyle({ color: '#9D9D9D' });
                return prevCount - 1;
            }
        });
    }

    const handleDownvote = () => {
        setCount((prevCount) => {
            if (downvoteStyle.color === '#9D9D9D') {
                if (upvoteStyle.color === '#710808') {
                    setUpvoteStyle({ color: '#9D9D9D' });
                    setDownvoteStyle({ color: '#710808' });
                    return prevCount - 2;
                } else {
                    setDownvoteStyle({ color: '#710808' });
                    return prevCount - 1;
                }
            } else {
                setDownvoteStyle({ color: '#9D9D9D' });
                return prevCount + 1;
            }
        });
    }


    var [newComment, setNewComment] = useState('');
    const [comments, setComments] = useState(
        postComments
    );
    const inputRef = useRef<HTMLInputElement | null>(null);

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault(); // Prevent form submission
            handleAddComment(); // Manually call the function
        }
    };




    useEffect(() => {
        // Attach the event listener to the input field
        if (inputRef.current) {
            inputRef.current.addEventListener('keypress', handleKeyPress as any);
        }

        // Remove the event listener when the component unmounts
        return () => {
            if (inputRef.current) {
                inputRef.current.removeEventListener('keypress', handleKeyPress as any);
            }
        };
    }, []);



    const handleAddComment = () => {
        let localFname = (String)(localStorage.getItem('local_first_name'));
        let localLname = (String)(localStorage.getItem('local_last_name'));


        if (newComment.trim() !== '') {
            const currentDate = convertDate(new Date());
            // const commentsOnPost = {
            //     "first_name": localFname,
            //     "last_name": localLname,
            //     "comment": newComment,
            //     "date": currentDate,
            // };
            const newCommentObj = {
                "text": newComment,
            };

            // setComments([...comments, newCommentObj]);

            let localToken = (String)(localStorage.getItem('local_login_token'));
            // console.log(newCommentObj)
            // console.log(postId)
            // console.log(postComments)
            axios.post(localStorage.getItem('apiServerURL') + `api/posts/comment/${postId}`, newCommentObj, {
                headers: {
                    'x-auth-token': localToken
                },
            })
                .then((response) => {
                    console.log("PC "+response.status)
                    if (response.status === 201) {
                        console.log('Commented successfully.');
                        window.location.reload();
                    } else {
                        console.error('Comment failed');
                    }
                })
                .catch((error) => {
                    // setLoading(false);
                    console.error('File upload failed:', error);
                    // Handle network or other errors here.
                });
            window.location.reload();
            setNewComment('');
        }
    }


    return (
        <section>
            <div className="comment">
                <div className="new-comment">
                    <div className="add-comment">
                        <input ref={inputRef} type="text" className="comment-box" placeholder="Add new comment" value={newComment} onChange={(e) => setNewComment(e.target.value)} />
                        <i className="fa-solid fa-plus" onClick={handleAddComment}></i>
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
                <div style={{ height: '29vh', overflow: 'auto' }}>
                    {comments.slice().reverse().map((item, index) => (
                        <div key={index}>
                            <div className="comment-details">
                                <div className="comment-user">
                                    <div>  <h6>{item.commentedByFirstName} {item.commentedByLastName}</h6> </div>
                                    <div className="comment-date">{convertDate(item.lastUpdatedOn)}</div>
                                </div>
                                <div className="comment-text">
                                    <p>{item.commentString}</p>
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