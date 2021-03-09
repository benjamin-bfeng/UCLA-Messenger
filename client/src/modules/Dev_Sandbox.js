import React, {Component, useState} from 'react';
import '../index.css';
import { makeStyles } from '@material-ui/core/styles';
import SearchModal from "./SearchModal";


const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: '#F7AA14',
        margin: '25px',
        padding: theme.spacing(2,2),
        textAlign: 'center',
        verticalAlign: 'middle',
    },
    flex:{
        display: 'flex',
        alignItems: 'center'
    },
    photoAndChats:{
        width: '20%',
        height: '300px',
    },
    desc:{
        width: '80%',
        padding: '50px 0',
    },
    title:{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '50px',
        padding: '25 px 0'
    },
    img:{
        borderRadius: '50%',
        border: '2px solid #2A82B9',
        width: '100%',
        height: 'auto',
        maxWidth: '256px',
        marginLeft: 'auto',
        marginRight: 'auto',
        display: 'block',
    },
    cardRoot: {
        minWidth: 275,
        minHeight: '200px',
        height: 'auto',
    },
    cardTitle: {
        fontSize: 14,
    },
    backHome:{
        width: '100%',
        minWidth: 'auto',
        textAlign: 'right',
    }
}));


const Test = () => {
    const [modal,setModal] = useState(false);

    return (
        <div className = 'dev-sandbox'>
            <SearchModal/>
        </div>
    );
}

export default Test;