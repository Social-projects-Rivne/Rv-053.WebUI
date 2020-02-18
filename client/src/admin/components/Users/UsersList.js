import React, { useState } from 'react';

import UserItem from './UserItem';

const UsersList = props => {
  const [users, setUsers] = useState([
    {
      id: 1,
      name: 'Vasilianiand',
      surname: 'Pupkinson Amadare',
      email: 'example@example.com',
      phone: '+3806663827636',
      avatar: '',
      birthday: '1980-02-17',
      sex: 'male',
      role: 'Moderator',
      user_status: { status: 'inactive' }
    },
    {
      id: 2,
      name: 'Vasilian',
      surname: 'Pupkinson',
      email: 'example@example.com',
      phone: '+3806663827636',
      avatar: '',
      birthday: '1980-02-17',
      sex: 'male',
      role: 'Admin',
      user_status: { status: 'active' }
    },
    {
      id: 3,
      name: 'Vasilian',
      surname: 'Pupkinson',
      email: 'ww.webui.crecker.example@example.com',
      phone: '+3806663827636',
      avatar: '',
      birthday: '1980-02-12',
      sex: 'male',
      role: 'User',
      user_status: { status: 'banned' }
    },
    {
      id: 4,
      name: 'Illian',
      surname: 'Qualginski',
      email: 'chototam.vashche@example.com',
      phone: '+3806856555575',
      avatar: '/src/img/avatar/illia.jpg',
      birthday: '1980-02-12',
      sex: 'male',
      role: 'Admin',
      user_status: { status: 'active' }
    }
  ]);

  return (
    <ul className="list-group">
      {users.map(user => (
        <UserItem key={user.id} userInfo={user} />
      ))}
    </ul>
  );
};

export default UsersList;
