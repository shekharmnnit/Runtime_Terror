import React, { useEffect, useState } from 'react';
import AppHeader from './AppHeader.tsx';
import '../assets/css/ProfilePage.css'
import AppFooter from './AppFooter.tsx';
import ShowPostSummary from './Post_summary.tsx';
import UserProfileDetail from './UserProfileDetail.tsx';
import axios from "axios";

function ProfilePage() {

    let path = window.location.pathname;
    console.log(path)
    const alphanumericAfterSlash = /profile\/([a-zA-Z0-9]+)/;
    let match = path.match(alphanumericAfterSlash);
    const profileID= !!match && !!match[1]?match[1]:'1'

    let local_first_name= localStorage.getItem('local_first_name');
    let local_loggedin_userid= localStorage.getItem('local_loggedin_userid');
   
    const [selectedTab, setSelectedTab] = useState('posts');

    const handleTabClick = (tab) => {
        setSelectedTab(tab);
    };

   

    let obj = [{
        "user_id":"1",
        "first_name": "Kunal",
        "last_name": "Mahato",
        "caption": "Review my paper on Software Engineering",
        "link": "https://www.google.com/",
        "tags": ["C++", "tag2", "tag3", "tag4", "tag5"],
        "date": "12-08-2023"      
      },
      {
        "user_id":"2",
        "first_name": "Yo",
        "last_name": "Mahato",
        "caption": "Review my paper on Software Engineering",
        "link": "https://www.google.com/",
        "tags": ["C#", "tag2", "tag3", "tag4", "tag5"],
        "date": "12-08-2023"
      },
      {
        "user_id":"3",
        "first_name": "Yo",
        "last_name": "Mahato",
        "caption": "Review my paper on Software Engineering",
        "link": "https://www.google.com/",
        "tags": ["C#", "tag2", "tag3", "tag4", "tag5"],
        "date": "12-08-2023"
      }]

      let obj2 = [{
        "user_id":"5",
        "first_name": "Laxman",
        "last_name": "Muthe",
        "caption": "Review my paper on Blockchain technology",
        "link": "https://www.google.com/",
        "tags": ["C++", "tag2", "tag3", "tag4", "tag5"],
        "date": "12-08-2023"      
      },
      {
        "user_id":"6",
        "first_name": "Kunal",
        "last_name": "Mahato",
        "caption": "Review my paper on Data Science",
        "link": "https://www.google.com/",
        "tags": ["C#", "tag2", "tag3", "tag4", "tag5"],
        "date": "12-08-2023"
      },
      {
        "user_id":"7",
        "first_name": "Yo",
        "last_name": "Mahato",
        "caption": "Review my paper on Software Engineering",
        "link": "https://www.google.com/",
        "tags": ["C#", "tag2", "tag3", "tag4", "tag5"],
        "date": "12-08-2023"
      }]

      const [feedPost, setFeedPost] = useState<{
       
      }[]>([]);
      const [userProfileBasicDetail, setuserProfileBasicDetail] = useState({
        firstName:'',
        lastName:'',
        email: '',
        skills: [],
        isEditable: true
      });
      function setBasicDetail(userDetails){
        setuserProfileBasicDetail({
          firstName:userDetails.firstName,
          lastName:userDetails.lastName,
          email: userDetails.email,
          skills: userDetails.skills,
          isEditable: local_loggedin_userid == userDetails._id || profileID == '1' ? true : false
        })
      }
      
      useEffect(() => {
        const getPost = async (tabType) => {
          try {
            let localToken = (String)(localStorage.getItem('local_login_token'));
            const response =  await axios.get(localStorage.getItem('apiServerURL') + "api/user/fetchProfile/"+profileID, {
              headers: {
                  'Content-Type': 'application/json',
                  'x-auth-token': localToken
              },
          },);
            
            if (!response.data) {
              throw new Error(`HTTP error! Status: ${response.status}`);
            }
            let posts=[{}]
            posts.pop()
            setBasicDetail(response.data.user)
            let showPostData= tabType =='tab1' ? response.data.createdPosts : response.data.commentedPosts
            showPostData.forEach((post)=>{
              let fileTypeHandel= ['PNG','JPEG','JPG', 'PNG', 'GIF', 'TIFF']
              let file= !!post.fileName &&  fileTypeHandel.includes((post.fileName.split('.')[1]).toUpperCase()
              )? [{
                uri: localStorage.getItem('apiServerURL')+"api/posts/getFile/"+post.fileName,
                fileType:post.fileName.split('.')[1],
                fileName:'file'
              }]
              :[{
                uri: localStorage.getItem('apiServerURL')+"api/posts/getFile/1700604011453.gif",
                fileType:'png',
                fileName:'no file'
              }]
              posts.push({
              "user_id": post.userId,
              "first_name": tabType+"-"+post.firstName,
              "last_name": post.lastName,
              "post_id":post._id,
              "caption": post.caption,
              "link": "https://www.google.com/",
              "tags": post.skills,
              "date": '17-11-2023',
              "docsToView":file
              })
            });
            setFeedPost(posts.reverse())
          } catch (error) {
          } finally {
          }
        };

        if (selectedTab === 'posts') {
          
          getPost('tab1')
            // setFeedPost(obj);
        } else if (selectedTab === 'commentedPosts') {
          getPost('tab2')  
          // setFeedPost(obj2);
        }
    }, [selectedTab]);

    const isContinueAsGuest = local_first_name == 'Guest'|| local_first_name == '' ||local_first_name == null ;
    if (isContinueAsGuest) {
        return (
          <section>
            <div style={{ height: '10vh' }}><AppHeader /></div>
            <div style={{ padding: '20px', textAlign: 'center' }}>
              <h2>Please <a href="/" style={{ color: 'blue' }}>Login</a> to continue browsing.</h2>
            </div>
            <div><AppFooter /></div>
          </section>
        );
      }


    return (

        <section>
            <div style={{ height: '10vh' }}><AppHeader/></div>
            {!isContinueAsGuest && (
            <div>
                <div className='userProfileSection'>
                    <div><UserProfileDetail obj={userProfileBasicDetail}/></div>
                </div>
                <div className='postSection'>
                    
                    <div className="tabContainer">
                        <button
                            className={`tab ${selectedTab === 'posts' ? 'selectedTab' : ''}`}
                            onClick={() => handleTabClick('posts')}
                        >
                            Posts
                        </button>
                        <button
                            className={`tab ${selectedTab === 'commentedPosts' ? 'selectedTab' : ''}`}
                            onClick={() => handleTabClick('commentedPosts')}
                        >
                            Commented posts
                        </button>
                    </div>
                    <div><ShowPostSummary feedPost={feedPost} /></div>
                   
                </div>
            </div>
            )}
            <div><AppFooter/></div>
        </section>
    )
}
export default ProfilePage;

