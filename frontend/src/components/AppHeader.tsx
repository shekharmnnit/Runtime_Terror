
import React, { useState } from 'react';
import '../assets/css/global.css'
import '../assets/css/AppHeader.css';
import { Link } from 'react-router-dom';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import CreatePost from './Create_post.tsx';
import SearchBar from './SearchBar.tsx';
// import Post from './Post';
import { clearLocalStorage } from './LocalStorageUtils.tsx';
import axios from "axios";

function handleLogout() {
    clearLocalStorage();
}

function AppHeader() {
    const [showNotificationDropdown, setShowNotificationDropdown] = useState(false);
    const [showGreenNotificationIcon, setShowGreenNotificationIcon] = useState(true);
    const [newNotificationCount, setNewNotificationCount] = useState(0);
    
    async function getProfileDetails(){
        let localToken = (String)(localStorage.getItem('local_login_token'));
        const profileResponse = await axios.get(localStorage.getItem('apiServerURL') + "api/user/fetchProfile/1", {
          headers: {
            'x-auth-token': localToken,
            'Content-Type': 'application/json'
          },
        });
        let newNotificationCount = profileResponse.data.user.notifications.length-profileResponse.data.user.notificationsShowedTillNow
        setNewNotificationCount(newNotificationCount)
      }

    async function getNotification(){
        let localToken = (String)(localStorage.getItem('local_login_token'));
        axios.get(localStorage.getItem('apiServerURL') + `api/posts/notifications`, {
            headers: {
                'x-auth-token': localToken
            },
        }).then((response) => {
                console.log("PC " + response.status)
                if (response.status === 201) {
                    console.log(' successfully.');
                    let notificationsRemaining= response.data.notificationsRemaining
                    response.data.notifications.map((notif)=>{
                        notif['message']= 'commenterName'+' '+notif.operation +" on "+ notif.postCaption+ " " + 'post'
                        notif['url']= 'post/'+notif.postId
                        if(notificationsRemaining>0){
                            notif['color']='red'
                            notificationsRemaining--
                        }else notif['color']='black'
                    })
                    setNotificationList(response.data.notifications)
                } else {
                    console.error(' failed');
                }
            }).catch((error) => {
                console.error('failed:', error);
            });
    }
    async function handleNotificationDropdown() {
        // clearLocalStorage();
        await getNotification()
        setShowNotificationDropdown(!showNotificationDropdown)
        setShowGreenNotificationIcon(false)
    }
    const [notificationList, setNotificationList] = useState([{
        name: "apple",
        url: "post",
        message:"",
        color:""
    },
    ]);
    const [show, setShow] = useState(true);
    

    let local_first_name = localStorage.getItem('local_first_name');
    if(local_first_name==null || local_first_name==''){
        localStorage.setItem('local_first_name','Guest')
        local_first_name='Guest'
    }
    const isContinueAsGuest = local_first_name == 'Guest'|| local_first_name == '' ||local_first_name == null ;
    getProfileDetails()
    return (

        <header className="header">
            <div className="logo-and-title">
                <Link to="/home">
                    <div style={{ display: 'inline-flex' }}>
                        <i className="fa-solid fa-user-pen fa-2x"></i>
                    </div>
                </Link>
                <div>
                    <h1 className="text-logo">REVIEW ME</h1>
                </div>
            </div>
                <SearchBar />
                 <div className='button-bell-login-div'>
                        {!isContinueAsGuest && (
                        <div>
                                <Popup trigger={<button className="button-create-post" onClick={() => setShow(!show)}><i className="fa-solid fa-circle-plus"></i>Create post</button>} position="center center">
                                <div>
                                    <h5 className="create-post">CREATE POST</h5>
                                    <div><CreatePost /></div>
                                </div>
                                </Popup>
                        </div>
                        )}
                        {!isContinueAsGuest && (
                        <div className='notification-dropdown'>
                                <i onClick={handleNotificationDropdown} className="fa-solid fa-bell fa-2x notification-icon"></i>
                                {/* {showGreenNotificationIcon && <i className="fa-solid fa-circle" style={{ "color": "#58ec09" }}></i>} */}
                                {newNotificationCount>0 && <b style={{color:'white'}}>{newNotificationCount}</b>}
                                {showNotificationDropdown && <div className="dropdown-content">
                                    {notificationList.map((item, index) => (
                                        <a href={item.url} style={{color:item.color}}>{item.message}</a>
                                    ))}
                                </div>}
                            </div>
                            )}

                        <div className="header-dropdown">
                            <button className="button-login">
                                {local_first_name}
                                <i className={`fa-solid fa-sort-down`}></i>
                            </button>
                            {!isContinueAsGuest && <div className="dropdown-content">
                                <a href="/profile">Profile</a>
                                <a href="/" onClick={handleLogout}>Log Out</a>
                            </div>}
                            {isContinueAsGuest && <div className="dropdown-content">
                                <a href="/">Login</a>
                            </div>}

                        </div>
                    </div>
        </header>
    )
}
export default AppHeader;