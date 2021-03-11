import React, {useEffect} from 'react'
import io from 'socket.io-client'
import {listOfCsClassesUndergrad, listOfBeClassesUndergrad,listOfChEClassesUndergrad,
    listOfCNEEClassesUndergrad,listOfECEClassesUndergrad,listOfEngClassesUndergrad,
    listOfMatSciClassesUndergrad,listOfMNEClassesUndergrad} from './localData'
import axios from "axios";
import userServices from '../services/users';

export const CTX = React.createContext();

let initState={
    General: []
};

let nameIdDict={
}

function reducer(state, action){
    const {user,message,chat,id} = action.payload;

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
        default:
            return state;

    }
}

let socket;

function sendChatAction(value){
    console.log("iddddddddd",value.id)
    let userId = null;
    axios.get('http://localhost:3001/api/users/' + value.user)
        .then(response => {
            userId=response.data.id;
            console.log(nameIdDict[value.chat]);
            const msgObj ={
                user: userId,
                message: value.message,
                chat: nameIdDict[value.chat],
                };
                axios.post('http://localhost:3001/api/chats/message/'+nameIdDict[value.chat],
                    msgObj).then(response => {
                    console.log(response.data);
                });
        }
            )



    socket.emit('chat message', value);
}

export default function Store(props){
    const user = props.user;
    console.log("props: ", props);
    useEffect(()=>{
        axios.get('http://localhost:3001/api/chats')
            .then(response=> {
                const chatData = response.data.slice(0, 435);
                axios.get('http://localhost:3001/api/users/' + user)
                    .then(response => {
                        const userCourses = response.data.courses;
                        console.log(chatData);
                        console.log(userCourses);
                        for (let i = 0; i < userCourses.length;i++)
                        {
                            let temp;
                            temp = chatData.find(x=>x._id===userCourses[i]);
                            console.log(temp);
                            initState[temp.name]=temp.messages;
                            console.log(initState);
                            nameIdDict[temp.name]=temp._id;
                        }
                    });
            })
    },[]);
    const [allChats, dispatch] = React.useReducer(reducer,initState);

    if(!socket){
        socket = io(':3002');
        socket.on('chat message', function(msg){
            dispatch({type:'RECEIVE_MESSAGE',payload: msg});
        });
    }



    return (
        <CTX.Provider value={{allChats, sendChatAction, user}}>
            {props.children}
        </CTX.Provider>
    );
}