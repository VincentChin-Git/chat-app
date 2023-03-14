import React from 'react';
import ChatListItem from './ChatListItem.js';
import '../assets/scss/ChatList.scss';
import ChangeProfileImage from './ChangeProfileImage.js';

const ChatList = ({ name, user_id, chats, selectedChatIndex, onChatSelected }) => {

    return (
        <div className="ChatList">
            <div className="Header">
                <ChangeProfileImage user_id={user_id} />
                <button className="NewChatButton">New Chat</button>
            </div>
            <div className="Search">
                <input type="text" placeholder="Search" />
                <i className="fa fa-search SearchIcon"></i>
            </div>
            <div className="ChatListItems">
                {chats.map((chat, index) => (
                    <ChatListItem
                        key={index}
                        chat={chat}
                        selected={selectedChatIndex === index}
                        onClick={() => onChatSelected(index)}
                    />
                ))}
            </div>
        </div>
    );
};

export default ChatList;
