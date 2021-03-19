import React from 'react';
import { Avatar, Badge } from 'antd';

import './User.scss';

const User = ({ name, letter, color, online }) => {
    return (
        <div className="user">
            <div className="user-avatar">
                <Badge dot status={online ? `success` : `dangerouse`}>
                    <Avatar size="small" style={{ backgroundColor: `${color}` }}>{letter}</Avatar>
                </Badge>
            </div>
            <div className="user-description">
                <span>{name}</span>
            </div>
        </div >
    )
}

export default User;