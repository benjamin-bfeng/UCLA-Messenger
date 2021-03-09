import React from 'react'
import io from 'socket.io-client'
import {listOfCsClassesUndergrad, listOfBeClassesUndergrad,listOfChEClassesUndergrad,
    listOfCNEEClassesUndergrad,listOfECEClassesUndergrad,listOfEngClassesUndergrad,
    listOfMatSciClassesUndergrad,listOfMNEClassesUndergrad} from './classData'

export const CTX = React.createContext();

const listClasses = ["General"].concat(listOfCsClassesUndergrad.map(function(x){return "CS "+x;}))
    .concat(listOfBeClassesUndergrad.map(function(x){return "BIO ENG "+x;}))
    .concat(listOfChEClassesUndergrad.map(function(x){return "CHEM ENG "+x;}))
    .concat(listOfCNEEClassesUndergrad.map(function(x){return "C&EE "+x;}))
    .concat(listOfECEClassesUndergrad.map(function(x){return "ECE "+x;}))
    .concat(listOfEngClassesUndergrad.map(function(x){return "ENG "+x;}))
    .concat(listOfMatSciClassesUndergrad.map(function(x){return "MAT SCI "+x;}))
    .concat(listOfMNEClassesUndergrad.map(function(x){return "MECH&AE "+x;}));

console.log(listClasses);


const initState={};

for (let i =0; i< listClasses.length; i++)
{
    initState[listClasses[i]] =[];
}

console.log(initState);

/*const initState={};

const fetchChatData = async () =>{
    const url = "http://localhost:3001/api/chats";
    const response = await fetch(url);
    const data = await response.text();
    console.log(data);
    for (let i = 0; i< data.length;i++)
    {
        initState[data[i].name] = [];
    }
    console.log(initState);
}

fetchChatData();*/



function reducer(state, action){
    const {user,message,chat} = action.payload;

    switch(action.type)
    {
        case 'RECEIVE_MESSAGE':
            return{
                ...state,
                    [chat]:[
                        ...state[chat],
                        {user, message}
                ]
            };
        default:
            return state;

    }
}

let socket;

function sendChatAction(value){
    socket.emit('chat message', value);
}

export default function Store(props){
    const [allChats, dispatch] = React.useReducer(reducer,initState);

    if(!socket){
        socket = io(':3002');
        socket.on('chat message', function(msg){
            dispatch({type:'RECEIVE_MESSAGE',payload: msg});
        });
    }

    const user = 'aaron' + Math.random(100).toFixed(2);



    return (
        <CTX.Provider value={{allChats, sendChatAction, user}}>
            {props.children}
        </CTX.Provider>
    );
}