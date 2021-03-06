import React from 'react'
import io from 'socket.io-client'

const listOfCsClasses =[
    "1", "19", "30", "31", "32", "33",
    "35L", "M51A", "97", "99", "111", "112",
    "117", "118", "M119", "CM121", "CM122",
    "CM124", "CM130", "130", "131", "132",
    "133", "134", "136", "C137A", "C137B",
    "143", "144", "145", "M146", "M148", "M151B",
    "M152A", "M152B", "161", "168", "170A", "M171L",
    "172", "174A", "174B", "174C", "180", "181",
    "M182", "183", "M184", "CM186", "CM187", "188",
    "188SA", "188SB", "188SC", "192", "M192A", "194",
    "199", "201", "202", "205", "211", "212", "212A",
    "M213A", "M213B", "214", "216", "217A", "217B", "218",
    "219", "CM221", "CM222", "CM224", "M225", "M226", "M229S",
    "230", "231", "232", "233A", "233B", "234", "235", "236",
    "C237A", "C237B", "239", "240A", "240B", "241B", "244A",
    "245", "246", "247", "249", "251A", "251B", "252A", "256A",
    "M258A", "M258C", "258F", "258G", "258H", "259", "260", "261A",
    "262A", "M262C", "262Z", "263", "263A", "263C", "264A", "265A",
    "M266A", "M266B", "267A", "M268", "268S", "269", "C274C",
    "275", "M276A", "280A", "280AP", "280CO", "280D", "280DA",
    "280DP", "280G", "280P", "281A", "M282A", "M282B", "M283A",
    "M283B", "284A", "284C", "284P", "CM286", "CM287", "288S", "289A",
    "289CO", "289L", "289OA", "289P", "289RA", "289SG", "M296A",
    "M296B", "M296C", "M296D", "298", "375", "495", "495B", "497D",
    "497E", "596", "597A", "597B", "597C", "598", "599"
]

export const CTX = React.createContext();

/*
{
    msg {
        from: 'user',
        msg: 'hi',
        topic: 'general'
    }

    state {
        general:[
            {msg},{msg},{msg}, {newmsg}
        ]
        topic2:[
            {msg},{msg},{msg}
        ]

    }

}
 */

const initState={}

for (let i =0; i< listOfCsClasses.length; i++)
{
    initState["CS "+listOfCsClasses[i]] =[];
}

function reducer(state, action){
    const {from,msg,topic} = action.payload;

    switch(action.type)
    {
        case 'RECEIVE_MESSAGE':
            return{
                ...state,
                    [topic]:[
                        ...state[topic],
                        {from, msg}
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
        socket = io(':3001');
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