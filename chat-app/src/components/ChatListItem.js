import React from 'react';
import '../assets/scss/ChatListItem.scss';
import { serverPath } from '../utils/globalConst';

const ChatListItem = ({ chat, selected, onClick }) => {
    return (
        <div className={`ChatListItem ${selected ? 'Selected' : ''}`} onClick={onClick}>
            <div className="Avatar" style={{ backgroundImage: `url(${serverPath}${chat.image})` }} ></div>
            <div className="Details">
                <div className="Name">{chat.name}</div>
                <div className="LastMessage">{chat.msg}</div>
            </div>
            <div className="Time">{chat.time}</div>
        </div>
    );
};

export default ChatListItem;
