import React, { useEffect, useState } from 'react';
import AppHeader from './AppHeader.tsx';
import '../assets/css/ProfilePage.css'
import AppFooter from './AppFooter.tsx';
import ShowPostSummary from './Post_summary.tsx';
import UserProfileDetail from './UserProfileDetail.tsx';

function ProfilePage() {

    let local_first_name= localStorage.getItem('local_first_name');

   
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
        first_name: string;
        last_name: string;
        caption: string;
        link: string;
        tags: string[];
        date: string;
      }[]>([]);

      useEffect(() => {
        if (selectedTab === 'posts') {
            setFeedPost(obj);
        } else if (selectedTab === 'commentedPosts') {
            setFeedPost(obj2);
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
                    <div><UserProfileDetail obj={obj}/></div>
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

