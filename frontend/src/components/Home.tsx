import React, { useState, useEffect } from 'react';
import CreatePost from './Create_post.tsx';
import AppHeader from './AppHeader.tsx';
import AppFooter from './AppFooter.tsx';
import ShowPostSummary from './Post_summary.tsx';
import { useLocation } from 'react-router-dom';
import axios from "axios";

function Home() {
  const [show, setShow] = useState(false);
  const location = useLocation();
  const { state } = location;
  const [feedPost, setFeedPost] = useState<{

  }[]>([]);

  function convertDate(dateTimeString) {
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
        const response = await axios.get(localStorage.getItem('apiServerURL') + "api/posts/fetchAll", {
          headers: {
            'Content-Type': 'application/json'
          },
        },);

        if (!response.data) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        let posts = [{}]
        posts.pop()
        response.data.forEach((post) => {
          let fileTypeHandel = ['PNG', 'JPEG', 'JPG', 'PNG', 'GIF', 'TIFF']
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
        //   feedPost=posts
        // if(postToDisplay.length==0)
        setFeedPost(posts.reverse())
      } catch (error) {
        // Handle errors by updating the state
        //   setError(error);
      } finally {
        // Set loading to false once the API call is complet
      }
    };
    if (state && state.feedPost) {
      setFeedPost(state.feedPost);
      console.log(state.feedPost)
    } else {
      getPost();
      console.log(feedPost)
    }
  }, []);
  console.log(feedPost)
  return (
    <section>
      <div style={{ height: '10vh' }}><AppHeader /></div>
      <div className='feedSection' style={{ backgroundColor: '#E9E9E9', height: '83%', width: '100%', position: 'fixed', margin: '10vh 0vh 0vh 0vh', padding: '1vh 20vh 1vh 20vh', overflow: 'auto' }}>
        <ShowPostSummary feedPost={feedPost} />
      </div>
      <div><AppFooter /></div>
    </section>
  );
}

export default Home;