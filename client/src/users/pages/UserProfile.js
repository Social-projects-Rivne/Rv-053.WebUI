import React from 'react';
import { useParams } from 'react-router-dom';

import UserInfo from './../components/UserInfo/UserInfo';
import UserCategories from './../components/UserCategories/UserCategories';
import './UserProfile.css';

const userInfo = [
    {
        id: 'u1',
        name: 'Sasha',
        surname: 'Kravets',
        email: 'sasakravec663@gmail.com'
    },
    {
        id: 'u2',
        name: 'Marina',
        surname: 'Franko',
        email: 'marinafranko@gmail.com'
    }
]

const UserProfile = () => {

    const userId = useParams().userId;
    const loadedUser = userInfo.find( user => user.id === userId )
    return(
        <div className="profile-container">
            <section className="profile_inner">
                <UserInfo item={loadedUser}/>
                <UserCategories />
                <div className="profile-events"></div>
            </section>
        </div>
    )
}

export default UserProfile;