import React, { useEffect, useState } from 'react';
import ChatList from '../components/ChatList';
import ChatRoom from '../components/ChatRoom';
import '../assets/scss/HomePage.scss';
import { axiosGet } from '../utils/globalFunc';

const HomePage = ({ user_id, name, contact_no }) => {

    const [state, setState] = useState({
        chats: [],

    })

    useEffect(() => {
        async function getChatList(user_id) {
            let res = await axiosGet(`getChatList/${user_id}`);
            setState(prev => { return { ...prev, chats: res.chat_list } })
        }

        getChatList(user_id);

    }, [user_id])

    return (
        <div className="home-page">
            <ChatList
                user_id={user_id}
                name={name}
                chats={state.chats}
                selectedChatIndex={0}
                onChatSelected={() => { }}
            />
            <ChatRoom />
        </div>
    );
};

export default HomePage;
