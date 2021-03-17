import React from 'react';
import { Room } from '../';
import { Badge, Input } from 'antd';

import './Chat.scss';

const { TextArea } = Input;

const Chat = ({ rooms, userRooms, user }) => {

    userRooms = [...userRooms.values()];
    const [message, setMessage] = React.useState('');

    return (
        <div className="chat-wrapper">
            <div className="chat-container">
                <div className="chat-rooms-container">
                    <div className="chat-rooms-header">
                        <Badge status="success" /><span>{user.name}</span>
                    </div>
                    <hr />
                    <div className="chat-rooms">
                        {userRooms.length > 0 && userRooms.map(room => <Room key={room._id} {...room} />)}
                    </div>
                </div>
                <div className="chat-messages-container">
                    <div className="chat-send">
                        <TextArea
                            placeholder="Enter a message"
                            rows={3}
                            value={message}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Chat;