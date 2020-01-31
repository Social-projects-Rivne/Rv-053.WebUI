import React from 'react';
import { NavLink } from 'react-router-dom';



const UserInfo = (props) => {
    return(
            <div className="profile-top">
                <div className="profile-avatar">
                    {!props.item.avatarUrl ? <span>Add photo</span> : <img src="/" alt=""/>}
                </div>
                <div className="profile-info">
                <div className="profile-name">{props.item.name} {props.item.surname}</div>
                    <div className="profile-email">{props.item.email} </div>
                    <div className="profile_btn">
                        <NavLink to="/" className="profile_btn-item">Add event</NavLink>
                        <NavLink to="/" className="profile_btn-item">Edit profile</NavLink>
                    </div>
                </div>
            </div>                

    )
}

export default UserInfo;