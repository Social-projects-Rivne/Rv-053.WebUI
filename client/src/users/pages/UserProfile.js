import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import UserInfo from './../components/UserInfo';
import CategoriesList from './../components/CategoriesList';
import FollowedEventList from './../components/ProfileEvents/FollowedEventList';
import CreatedEventList from './../components/ProfileEvents/CreatedEventList';
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

    const [ userDataState, setUserDataState ] = useState({userData:[]})

    useEffect(() => {
        const userData = await axios.get();
        setUserDataState({userData: userData})
    },[])

    return(
        <div className="profile-container">
            <section className="profile_inner">
                <UserInfo item={userDataState.userData}/>
                <CategoriesList />
                <div className="profile-followed_events">
                    <FollowedEventList />
                </div>
                <div className="profile-created_events">
                    <CreatedEventList />
                </div>
            </section>
        </div>
    )
}

export default UserProfile;