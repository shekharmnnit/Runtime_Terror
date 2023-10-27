import React, { useState } from 'react';
import AppHeader from './AppHeader.tsx';
import '../assets/css/ProfilePage.css'
import AppFooter from './AppFooter.tsx';



function ProfilePage() {

    let local_first_name= localStorage.getItem('local_first_name');
    return (

        <section>
            <div style={{ height: '10vh' }}><AppHeader/></div>
            <div>
                <div className='userProfileSection'>
                    
                </div>
                <div className='postSection'>

                </div>
            </div>
            <div><AppFooter/></div>
        </section>
    )
}
export default ProfilePage;

