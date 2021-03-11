import React from 'react';
import like from "./assets/heart1.png"
import liked from "./assets/heart2.png"
import '../index.css';
import axios from 'axios';

const LikeButton = ({user,msgId}) => {
    const [status,setStatus] = React.useState(like)
    const setLike = () =>{
        if (status === like) {
            axios.put("http://localhost:3001/api/chats/chat/like/"+msgId,user);
            setStatus(liked);
        }
        else
            setStatus(like);
    }
    return (
        <>
            <img
                className={"like-button"}
                src={status}
                alt=""
                onClick={setLike}
            />
        </>
    );
}

export default LikeButton;