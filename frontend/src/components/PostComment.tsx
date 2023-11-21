import React, { useEffect, useRef, useState } from 'react';
import '../assets/css/global.css';
import '../assets/css/PostComment.css';
import axios from 'axios';
import { convertDate } from '../utils.js';
function PostComment({ postComments, postId, upvotes, downvotes }) {

    // let count = upvotes.length - downvotes.length
    const [count, setCount] = useState(upvotes.length - downvotes.length);
    const [upvoteCount, setUpvoteCount] = useState(upvotes.length);
    const [downvoteCount, setDownvoteCount] = useState(downvotes.length);
    // console.log(count)
    let initColor = '#9D9D9D'
    let activeColor = '#710808'
    let localToken = (String)(localStorage.getItem('local_login_token'));
    let localUserId = localStorage.getItem('local_loggedin_userid');
    const [upvoteStyle, setUpvoteStyle] = useState({ color: initColor });
    const [downvoteStyle, setDownvoteStyle] = useState({ color: initColor });

    useEffect(() => {
        if (upvotes.includes(localUserId)) {
            setUpvoteStyle({ color: activeColor });
        }
        if (downvotes.includes(localUserId)) {
            setDownvoteStyle({ color: activeColor });
        }
    }, [upvotes, downvotes, localUserId]);


    const handleUpvote = async () => {
        if (upvoteStyle.color === initColor) {
            try {
                const response = await axios.post(
                    `${localStorage.getItem('apiServerURL')}api/posts/upvote/${postId}`, {},
                    {
                        headers: {
                            'x-auth-token': localToken,
                            'Content-Type': 'application/json'
                        },
                    }
                );

                if (response.status === 200) {
                    console.log('Upvoted successfully.');

                    setUpvoteStyle({ color: activeColor });
                    setDownvoteStyle({ color: initColor });

                    window.location.reload()
                }
            } catch (error) {
                console.error('Upvote failed:', error);
            }
        } else {
            try {
                const response = await axios.post(
                    `${localStorage.getItem('apiServerURL')}api/posts/upvote/${postId}`,
                    {},
                    {
                        headers: {
                            'x-auth-token': localToken,
                            'Content-Type': 'application/json'
                        },
                    }
                );

                if (response.status === 200) {
                    console.log('Upvote removed successfully.');

                    setUpvoteStyle({ color: initColor });

                    window.location.reload()
                }
            } catch (error) {
                console.error('Removing upvote failed:', error);
            }
        }
    };

    const handleDownvote = async () => {
        if (downvoteStyle.color === initColor) {
            try {
                const response = await axios.post(
                    `${localStorage.getItem('apiServerURL')}api/posts/downvote/${postId}`,
                    {},
                    {
                        headers: {
                            'x-auth-token': localToken,
                            'Content-Type': 'application/json'
                        },
                    }
                );

                if (response.status === 200) {
                    console.log('Downvoted successfully.');


                    setUpvoteStyle({ color: initColor });
                    setDownvoteStyle({ color: activeColor });

                    window.location.reload()
                }
            } catch (error) {
                console.error('Downvote failed:', error);
            }
        } else {
            try {
                const response = await axios.post(
                    `${localStorage.getItem('apiServerURL')}api/posts/downvote/${postId}`, {},
                    {
                        headers: {
                            'x-auth-token': localToken,
                            'Content-Type': 'application/json'
                        },
                    }
                );

                if (response.status === 200) {
                    console.log('Downvote removed successfully.');
                    setDownvoteStyle({ color: initColor });

                    window.location.reload()
                }
            } catch (error) {
                console.error('Removing downvote failed:', error);
            }
        }
    };


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
                    console.log("PC " + response.status)
                    if (response.status === 200) {
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
                        <div>{upvoteCount}</div>
                        <i
                            className="fa-solid fa-circle-arrow-down"
                            style={downvoteStyle}
                            onClick={handleDownvote}
                        ></i>
                        <div>{downvoteCount}</div>
                    </div>
                </div>
                <div style={{ height: '29vh', overflow: 'auto' }}>
                    {comments.slice().map((item, index) => (
                        <div key={index}>
                            <div className="comment-details">
                                <div className="comment-user">
                                    <div>  <a href={`/profile/${item.commentedUserId}`}><h6>{item.commentedByFirstName} {item.commentedByLastName}</h6></a> </div>
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