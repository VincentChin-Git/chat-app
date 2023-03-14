import React from 'react';
import PropTypes from 'prop-types';
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

ChatListItem.propTypes = {
    chat: PropTypes.shape({
        name: PropTypes.string.isRequired,
        msg: PropTypes.string.isRequired,
        time: PropTypes.string.isRequired,
    }).isRequired,
    selected: PropTypes.bool.isRequired,
    onClick: PropTypes.func.isRequired,
};

export default ChatListItem;
