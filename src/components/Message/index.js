import React from 'react';
import { Avatar } from 'antd';

import './Message.scss';

const Message = ({ text, isMyMessage, user: { name, letter, color } }) => {

    return (
        <div className="message">
            {!isMyMessage &&
                < div className="user-avata" >
                    <Avatar style={{ backgroundColor: `${color}` }} >{letter}</Avatar>
                </div >
            }
            <div className={`message-container ${isMyMessage && `right`}`}>
                <span>{name}</span>
                <p>{text}</p>
            </div>
        </div >

    )
}

export default Message;