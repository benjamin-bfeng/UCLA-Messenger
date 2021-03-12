import React, {useEffect, useState} from 'react'
import io from 'socket.io-client'
import axios from "axios";
import userServices from '../services/users';

export const CTX = React.createContext();

let initState={
    General: []
};

let nameIdDict={
}

function reducer(state, action){
    const {user,message,chat,id,chatName,...rest} = action.payload;
    switch(action.type)
    {
        case 'RECEIVE_MESSAGE':
            return{
                ...state,
                    [chat]:[
                        ...state[chat],
                        {user, message, id}
                ]
            };
        case 'LOADED':
            return{...state};
        case 'NEW_CHAT':
            return{...state, [chatName]: []}
        default:
            return state;

    }
}

let socket;

function sendChatAction(value){
    let userId = null;
    axios.get('http://localhost:3001/api/users/' + value.user)
        .then(response => {
            userId=response.data.id;
            const msgObj ={
                user: userId,
                message: value.message,
                chat: nameIdDict[value.chat],
                };
                axios.post('http://localhost:3001/api/chats/message/'+nameIdDict[value.chat],
                    msgObj).then(response => {
                });
        }
            )
    socket.emit('chat message', value);
}



export default function Store(props){
    const user = props.user;
    const [loaded,setLoaded]=useState(false);
    const [courses,setCourses] = useState([]);
    const [allChats, dispatch] = React.useReducer(reducer,initState);
    const [newChat,setNewChat] = React.useState(false);
    useEffect(()=>{
        if(!loaded)
        {
            axios.get('http://localhost:3001/api/chats')
                .then(response => {
                    const chatData = response.data.slice(0, 435);
                    axios.get('http://localhost:3001/api/users/' + user)
                        .then(response => {
                            const userCourses = response.data.courses;
                            setCourses(userCourses);
                            for (let i = 0; i < userCourses.length; i++) {
                                let temp;
                                temp = chatData.find(x => x._id === userCourses[i]);
                                initState[temp.name] = temp.messages;
                                nameIdDict[temp.name] = temp._id;
                            }
                            setLoaded(true);
                            dispatch({type: 'LOADED', payload: loaded});
                        });
                })
        }
        else{

        }
    },[courses]);
    function addChatAction(val)
    {
        setNewChat(true);
        let result_array = [];
        let arr = courses.concat(val);
        let len = arr.length;
        let assoc = {};

        while (len--) {
            let item = arr[len];

            if (!assoc[item]) {
                result_array.unshift(item);
                assoc[item] = true;
            }
        }
        if(result_array.sort().join(',') !== courses.sort().join(',')){
            let putArray = [];
            for (let i=0;i <result_array.length;i++) {
                axios.get('http://localhost:3001/api/chats/chat/'+result_array[i])
                    .then(response=>{
                        putArray.push(response.data.name)
                        if(result_array[i]===val[0]){
                            const chatData = response.data;
                            const chatName = chatData.name;
                            const chatMessages = chatData.messages;
                            nameIdDict[chatData.name] = chatData._id;
                            dispatch({type: 'NEW_CHAT', payload: {chatName,chatMessages}});
                        }
                        if(putArray.length===result_array.length) {
                            axios.get('http://localhost:3001/api/users/' + user).then(response => {
                                const id = response.data.id;
                                userServices.updateUserCourses(id, putArray);
                                setCourses(result_array);
                            });
                        }
                    });

            }
        }
    }


    if(!socket){
        socket = io(':3002');
        socket.on('chat message', function(msg){
            dispatch({type:'RECEIVE_MESSAGE',payload: msg});
        });
    }



    return (
        <CTX.Provider value={{allChats, sendChatAction, addChatAction, user, loaded}}>
            {props.children}
        </CTX.Provider>
    );
}