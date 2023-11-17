import React, { useState,useEffect } from 'react';
import '../assets/css/post_summary.css'
import linkImage from '../assets/file.png';
import axios from "axios";
function ShowPostSummary({ feedPost}) {

    if (feedPost == null) {
        feedPost = [
        //     {
        //     "user_id": "1",
        //     "first_name": "Kunal",
        //     "last_name": "Mahato",
        //     "post_id":"12",
        //     "caption": "Review my paper on Software Engineering",
        //     "link": "https://www.google.com/",
        //     "tags": ["C++", "tag2", "tag3", "tag4", "tag5"],
        //     "date": "12-08-2023"
        // }
    ]
        // getPost()
        
    }
    const [postToDisplay, setPostToDisplay] = useState(feedPost);

    function convertDate(dateTimeString){
        const dateObject = new Date(dateTimeString);
        // Extract date components
        const year = dateObject.getFullYear();
        const month = String(dateObject.getMonth() + 1).padStart(2, '0'); // Month is zero-based
        const day = String(dateObject.getDate()).padStart(2, '0');
        // Formatted date string
        return `${day}-${month}-${year}`;
    }

    useEffect(() => {
        const getPost = async () => {
            try {
              const response =  await axios.get(localStorage.getItem('apiServerURL') + "api/posts/fetchAll", {
                headers: {
                    'Content-Type': 'application/json'
                },
            },);
              
              if (!response.data) {
                throw new Error(`HTTP error! Status: ${response.status}`);
              }
              let posts=[{}]
              posts.pop()
              response.data.forEach((post)=>{
                posts.push({
                "user_id": post.userId,
                "first_name": post.firstName,
                "last_name": post.lastName,
                "post_id":post._id,
                "caption": post.caption,
                "link": "https://www.google.com/",
                "tags": post.skills,
                "date": convertDate(post.lastUpdatedOn)
                })
              });
            //   feedPost=posts
            // if(postToDisplay.length==0)
              setPostToDisplay(posts)
            } catch (error) {
              // Handle errors by updating the state
            //   setError(error);
            } finally {
              // Set loading to false once the API call is complet
            }
          };
          getPost()
    }, []);
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
            {postToDisplay && postToDisplay.map((item, index) => (
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
                                <img src={localStorage.getItem('apiServerURL')+"api/posts/getFile/1700250920907.png"} alt="link" className="link-image" />
                            </a>
                        </div>
                    </div>
                </a>
            ))}
        </div>
    )
}

export default ShowPostSummary;