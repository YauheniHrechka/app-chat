import React from 'react';
import { Message, User } from '../';
import { Empty } from 'antd';

import './ChatBlock.scss';

const ChatBlock = ({ chatMessagesRef, isEmpty, name, user, users, messages }) => {

    users = [...users.values()];
    const [activeUsers, setActiveUsers] = React.useState(false);

    React.useEffect(() => {
        chatMessagesRef.current.scrollTo(0, 99999999999);
    });

    return (
        <>
            <div className="chat-header">
                <div className="chat-title-header">
                    <span>{name}</span>
                </div>
                {!isEmpty &&
                    <div className="chat-users-header">
                        <span onClick={() => setActiveUsers(!activeUsers)}>{`users (${users.length})`}</span>
                    </div>
                }
            </div>
            <div className="chat-messages">
                <div className="block-chat-messages">
                    {!isEmpty &&
                        <div className={`users ${activeUsers && `active-users`}`}>
                            {users.map((user, index) => <User key={index} {...user} />)}
                        </div>
                    }
                    <div ref={chatMessagesRef} className="messages">
                        {isEmpty ?
                            <Empty className="block-empty">Choose a room</Empty> :
                            messages.map((message, index) =>
                                <Message
                                    key={index}
                                    isMyMessage={user._id === message.user._id}
                                    {...message}
                                />
                            )
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default ChatBlock;