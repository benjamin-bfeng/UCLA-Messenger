import React, {Component, useEffect, useRef, useState} from 'react';
import '../index.css';
import Modal from 'react-modal';
import {listOfCsClassesUndergrad, listOfBeClassesUndergrad,listOfChEClassesUndergrad,
    listOfCNEEClassesUndergrad,listOfECEClassesUndergrad,listOfEngClassesUndergrad,
    listOfMatSciClassesUndergrad,listOfMNEClassesUndergrad} from './classData';
import Chip from "@material-ui/core/Chip";
import { makeStyles } from '@material-ui/core/styles';
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";


const listClasses = listOfCsClassesUndergrad.map(function(x){return "CS "+x;})
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

const useStyles = makeStyles((theme) => ({
    button: {
        margin: theme.spacing(1),
    },
}));

const SearchModal = ({handleChange}) => {

    const classes = useStyles();
    const [modal,setModal] = useState(false);
    const [searchTerm,setSearchTerm] = useState('');
    const [addedClasses,setAddedClasses] = useState([]);

    useEffect(()=>{
        handleChange(addedClasses);
    },[addedClasses])

    const addClass=(val)=>{
        if(!addedClasses.find(x=>x===val))
            setAddedClasses(addedClasses.concat(val));
        setSearchTerm("");
    }
    console.log(addedClasses);

    return (
        <div>
            <Button
                variant="contained"
                color="primary"
                className={classes.button}
                onClick={()=>setModal(true)}
            >
                Add Class
            </Button>
            <Modal
                isOpen={modal}
                onRequestClose={()=>setModal(false)}
                style={{
                    overlay: {
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: 'rgb(25,111,191, .75)'
                    },
                    content: {
                        position: 'absolute',
                        width: "300px",
                        height: "540px",
                        left: '70px'
                    }
                }}
            >
                <div style={{textAlign: 'center'}}><Typography variant={"h4"}>
                    Search Classes
                </Typography></div>
                <div
                    style={{textAlign: 'center'}}>
                    <input
                        type={"text"}
                        placeholder={"Search..."}
                        onChange={event => {setSearchTerm(event.target.value)}}
                        style={{
                            marginTop: '10px',
                            marginBottom: '20px',
                            width: '210px',
                            height: '40px'
                        }}/>
                </div>
                {listClasses.filter((value => {
                    if(searchTerm=='')
                        return value;
                    if (value.toLowerCase().includes(searchTerm.toLowerCase()))
                        return value;
                })).map(
                    (x)=>{
                        return <div style={{textAlign: 'center'}}>
                                <Chip
                                    label={<h4>{x}</h4>}
                                    style={{paddingTopBottom:'8px'}}
                                />
                                <Chip
                                    label={<h3>add</h3>}
                                    clickable
                                    style={{
                                        backgroundColor:'#0075c1',
                                        margin: '4px',
                                        color: '#FFF',
                                    }}
                                    onClick={() => addClass(x)}
                                />
                            </div>;
                    }
                )}


                <div><button onClick={()=>setModal(false)}>Close</button></div>
            </Modal>
        </div>
    );
}

export default SearchModal;