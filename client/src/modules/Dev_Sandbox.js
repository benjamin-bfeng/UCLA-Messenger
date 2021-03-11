import React from 'react';
import '../index.css';
import axios from "axios";
import {
    listOfBeClassesUndergrad,
    listOfChEClassesUndergrad,
    listOfCNEEClassesUndergrad,
    listOfCsClassesUndergrad,
    listOfECEClassesUndergrad,
    listOfEngClassesUndergrad,
    listOfMatSciClassesUndergrad,
    listOfMNEClassesUndergrad
} from "./localData";


const listClasses = listOfCsClassesUndergrad.map(function(x){return "CS "+x;})
    .concat(listOfBeClassesUndergrad.map(function(x){return "BIO ENG "+x;}))
    .concat(listOfChEClassesUndergrad.map(function(x){return "CHEM ENG "+x;}))
    .concat(listOfCNEEClassesUndergrad.map(function(x){return "C&EE "+x;}))
    .concat(listOfECEClassesUndergrad.map(function(x){return "ECE "+x;}))
    .concat(listOfEngClassesUndergrad.map(function(x){return "ENG "+x;}))
    .concat(listOfMatSciClassesUndergrad.map(function(x){return "MAT SCI "+x;}))
    .concat(listOfMNEClassesUndergrad.map(function(x){return "MECH&AE "+x;}));


const Test = () => {
/*    for (let i = 0; i < listClasses.length;i++)
    {axios.post('http://localhost:3001/api/chats',
            {name: listClasses[i]
            })};*/
    return (
        <div>
            Test
        </div>
    );
}

export default Test;