import React from 'react';
import '../index.css';
import ChatInnards from "./ChatInnards";
import Store from "./Store";
import {Redirect} from 'react-router-dom';

const Chat = ({authed,user}) => {
    console.log("chat:",authed)
    return (
        <div className = 'chatInnards'>
        {
        (authed)
        ? <Store user={user}><ChatInnards/></Store>
        : <Redirect to="/"/>}
        </div>);
}

export default Chat;