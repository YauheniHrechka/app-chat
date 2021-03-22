import React from 'react';
import { NavLink, Switch, Route } from 'react-router-dom';
import { ChatBlock, Room } from '../';
import { Badge, Input } from 'antd';
import { Context } from '../../context';

import './Chat.scss';

const { TextArea } = Input;

const Chat = ({ rooms, userRooms, user }) => {

    userRooms = [...userRooms.values()];
    const dispatch = React.useContext(Context);

    const [activeRoomId, setActiveRoomId] = React.useState('');
    const [message, setMessage] = React.useState('');
    const chatMessagesRef = React.useRef();

    const onMessageChange = (e) => setMessage(e.target.value)

    const onKeyDown = (e) => {
        if (e.code === 'Enter') {
            e.preventDefault();
            onSendMessage();
        }
    }

    const onSendMessage = () => {
        if (activeRoomId === '') return;
        setMessage('');
    }

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
                        <Route exact path='/' render={() => <ChatBlock chatMessagesRef={chatMessagesRef} isEmpty user={user} users={[]} name={''} messages={[]} />} />
                        {userRooms.map(room =>
                            <Route key={room._id} exact path={`/chat/${room.name}`} render={() => <ChatBlock chatMessagesRef={chatMessagesRef} isEmpty={false} user={user} {...room} />} />
                        )}
                    </Switch>
                    <div className="chat-send">
                        <TextArea
                            onChange={onMessageChange}
                            onKeyDown={onKeyDown}
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