import React from 'react';
import { User } from '../';
import { Empty } from 'antd';

import './ChatBlock.scss';

const ChatBlock = ({ isEmpty, name, users, messages }) => {

    users = [...users.values()];

    const [activeUsers, setActiveUsers] = React.useState(false);

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
                    <div className="messages">
                        {isEmpty ?
                            <Empty className="block-empty">Choose a room</Empty> :
                            messages.length > 0 && messages.map((message, index) => <div key={index}>{message.text}</div>
                            )
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default ChatBlock;