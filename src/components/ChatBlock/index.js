import React from 'react';
import { Empty } from 'antd';

import './ChatBlock.scss';

const ChatBlock = ({ isEmpty, name, users }) => {

    users = [...users.values()];

    return (
        <>
            <div className="chat-header">
                <div className="chat-title-header">
                    <span>{name}</span>
                </div>
                {!isEmpty &&
                    <div className="chat-users-header">
                        <span>{`users (${users.length})`}</span>
                    </div>
                }
            </div>
            <div className="chat-messages">
                <div className="block-chat-messages">
                    <div className="messages">
                        {isEmpty &&
                            <Empty className="block-empty">Choose a room</Empty>
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default ChatBlock;