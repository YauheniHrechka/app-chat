import React from 'react';
import { Avatar } from 'antd';

import './Room.scss';

const Room = ({ name }) => {
    return (
        <div className="room">
            <div className="room-avatar">
                <Avatar style={{ backgroundColor: `red` }}>{`R`}</Avatar>
            </div>
            <div className="room-description">
                <span>{name}</span>
            </div>
        </div >
    )
}

export default Room;