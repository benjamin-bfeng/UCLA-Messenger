import React from 'react';
import like from "./assets/heart1.png"
import liked from "./assets/heart2.png"
import '../index.css';

const LikeButton = () => {
    const [status,setStatus] = React.useState(like)
    const setLike = () =>{
        if (status === like)
            setStatus(liked);
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