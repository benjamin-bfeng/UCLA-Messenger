import React, {Component, useEffect, useRef, useState} from 'react';
import '../index.css';
import Modal from 'react-modal';
import {listOfCsClassesUndergrad, listOfBeClassesUndergrad,listOfChEClassesUndergrad,
    listOfCNEEClassesUndergrad,listOfECEClassesUndergrad,listOfEngClassesUndergrad,
    listOfMatSciClassesUndergrad,listOfMNEClassesUndergrad} from './localData';
import MenuItem from "@material-ui/core/MenuItem";
import Chip from "@material-ui/core/Chip";
import { makeStyles } from '@material-ui/core/styles';
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import {useFetchChatList} from "./useFetchChatList";
import axios from "axios";

const listClasses = listOfCsClassesUndergrad.map(function(x){return "CS "+x;})
    .concat(listOfBeClassesUndergrad.map(function(x){return "BIO ENG "+x;}))
    .concat(listOfChEClassesUndergrad.map(function(x){return "CHEM ENG "+x;}))
    .concat(listOfCNEEClassesUndergrad.map(function(x){return "C&EE "+x;}))
    .concat(listOfECEClassesUndergrad.map(function(x){return "ECE "+x;}))
    .concat(listOfEngClassesUndergrad.map(function(x){return "ENG "+x;}))
    .concat(listOfMatSciClassesUndergrad.map(function(x){return "MAT SCI "+x;}))
    .concat(listOfMNEClassesUndergrad.map(function(x){return "MECH&AE "+x;}));

console.log(listClasses.length);


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
    const url = "http://localhost:3001/api/chats";
    const [apiClasses,setApiClasses] = useState([]);
    useEffect(()=>{
        axios.get(url)
            .then(
                (response) => {
                    const data = response.data.slice(0,435).map(({ name, _id }) => ({name, _id}));
                    setApiClasses(data);
                    console.log(apiClasses);
                }
            );
    },[])

    useEffect(()=>{
        handleChange(addedClasses.map(x=>x._id));
    },[addedClasses])

    const addClass=(val)=>{
        if(!addedClasses.find(x=>x._id===val._id))
            setAddedClasses(addedClasses.concat(val));
        setSearchTerm("");
    }


    return (
        <React.Fragment>
            <Button
                variant="contained"
                color="primary"
                className={classes.button}
                onClick={()=>setModal(true)}
            >
                Add Class
            </Button>
            <Modal
                ariaHideApp={false}
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
                        textAlign: 'center',
                        width: "300px",
                        height: "540px",
                        left: '70px',
                        overflowY: "hidden",
                    },
                }}
            >
                <div style={{textAlign: 'right'}}>
                    <button  onClick={()=>setModal(false)}>X</button>
                </div>
                <Typography variant={"h4"}>
                    Search Classes
                </Typography>
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
                <div style={{overflowY: "scroll", height: "75%"}}>
                    {apiClasses.filter((value => (value.name.toLowerCase().includes(searchTerm.toLowerCase()))
                        )).map(
                        x=>{
                            return <MenuItem key={x.name} style={{display: 'flex', width: '100%'}} onClick={() => addClass(x)}>
                                <div style={{width: "90%"}}>
                                    <Chip
                                        label={<h4>{x.name}</h4>}
                                        style={{paddingTopBottom:'8px'}}
                                    />
                                </div>
                                <Typography style={{alignSelf: "flex-end"}}>Add</Typography>
                            </MenuItem>;
                        }
                    )}
                </div>
            </Modal>
            </React.Fragment>
    );
}

export default SearchModal;