import React from 'react';
import { NavLink, Switch, Route } from 'react-router-dom';
import { ChatBlock, Room } from '../';
import { Badge, Input } from 'antd';

import './Chat.scss';

const { TextArea } = Input;

const Chat = ({ rooms, userRooms, user }) => {

    userRooms = [...userRooms.values()];

    const [activeRoomId, setActiveRoomId] = React.useState('');
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
                        <NavLink exact to='/'></NavLink>
                        {userRooms.length > 0 && userRooms.map(room =>
                            <NavLink
                                key={room._id}
                                exact
                                to={`/chat/${room.name}`}
                                activeClassName="active-room"
                                onClick={() => setActiveRoomId(room._id)}
                            >
                                <Room {...room} />
                            </NavLink>
                        )}
                    </div>
                </div>
                <div className="chat-messages-container">
                    <Switch>
                        <Route exact path='/' render={() => <ChatBlock isEmpty users={[]} name={''} />} />
                        {userRooms.map(room =>
                            <Route key={room._id} exact path={`/chat/${room.name}`} render={() => <ChatBlock isEmpty={false} {...room} />} />
                        )}
                    </Switch>
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