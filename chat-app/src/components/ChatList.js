import React from 'react';
import PropTypes from 'prop-types';
import ChatListItem from './ChatListItem.js';
import '../assets/scss/ChatList.scss';
import { serverPath } from '../utils/globalConst.js';

const ChatList = ({ name, profile_image, chats, selectedChatIndex, onChatSelected }) => {
    return (
        <div className="ChatList">
            <div className="Header">
                <div className="ProfileImage" style={{ backgroundImage: `url(${serverPath}ProfileImage/${profile_image})` }}></div>
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

ChatList.propTypes = {
    chats: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
            msg: PropTypes.string.isRequired,
            time: PropTypes.string.isRequired,
        })
    ).isRequired,
    selectedChatIndex: PropTypes.number.isRequired,
    onChatSelected: PropTypes.func.isRequired,
};

export default ChatList;
