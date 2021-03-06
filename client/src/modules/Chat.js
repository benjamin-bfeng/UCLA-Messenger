import React from 'react';
import '../index.css';
import ChatInnards from "./ChatInnards";
import Store from "./Store";


const Chat = () => {
        return (
            <div classname = 'chatInnards'>
                <Store><ChatInnards/></Store>
            </div>
        );
}

export default Chat;