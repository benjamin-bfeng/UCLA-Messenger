import React, { Component, useEffect, useRef, useState } from 'react';
import '../index.css';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { useFetchProfile } from './useFetchProfile';
import axios from 'axios';
import Modal from 'react-modal';

import userService from '../services/users';
import ProfileModal from "./ProfileModal";

const useStyles = makeStyles(theme => ({
    root: {
        backgroundColor: '#F7AA14',
        margin: '25px',
        padding: theme.spacing(2, 2),
        textAlign: 'center',
        verticalAlign: 'middle',
    },
    flex: {
        display: 'flex',
        alignItems: 'center',
    },
    photoAndChats: {
        width: '20%',
        height: '400px',
    },
    desc: {
        width: '80%',
        padding: '50px 0',
    },
    title: {
        display: 'inline-flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '50px',
        padding: '25 px 0',
    },
    img: {
        borderRadius: '50%',
        border: '2px solid #2A82B9',
        width: '100%',
        height: 'auto',
        maxWidth: '256px',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginBottom: 'auto',
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
    backHome: {
        width: '100%',
        minWidth: 'auto',
        textAlign: 'right',
    },
    editText: {
        display: 'flex',
        width: '100%',
        height: '200px',
    },
    displayText: {
        alignItems: 'center',
    },
    upload: {
        color: '#FFF',
    },
}));

const DisplayProfile = ({username,currentUser,overRideStyle}) => {
    const classes = useStyles();
    const [modal,setModal] = useState(false);
    const url = 'http://localhost:3001/api/users/' + username;
    const { loading, profile } = useFetchProfile(url);
    const [desc, setDesc] = React.useState();
    const [name, setName] = React.useState();
    const [role, setRole] = React.useState();
    const [imageUrl, setImageUrl] = React.useState();
    const [file, setFile] = React.useState(null);
    const [id, setId] = React.useState();

    console.log(userService.getToken());

    const initialRender = useRef(true);

    useEffect(() => {
        if (profile != null) {
            setDesc(profile.bio);
            setName(profile.name);
            setRole(profile.role);
            const img_api = 'http://localhost:3001/api/users/image/' + profile.id;
            setImageUrl(img_api);
            setId(profile.id);
        }
        console.log('rerender');
    }, [profile]);


    useEffect(()=>{
        if(initialRender.current)
        {
            initialRender.current = false;
        }
        else{
            onSubmitHandler();
        }
    },[desc,name,file,role])

    function handleChange(newName,newRole,newDesc,newFile){
        if(newDesc !== desc) {
            setDesc(newDesc);
        }
        if(newName !== name) {
            setName(newName);
        }
        if(newRole !== role) {
            setRole(newRole);
        }
        if(newFile)
        {
            setFile(newFile);
        }
    }

    // submit put request to server
    // http://localhost:3001/api/users/:id
    const onSubmitHandler = async () => {
        const data = {
            name: name,
            role: role,
            bio: desc,
            file: file
        };
        try {
            const user = await userService.updateUserData(id, data);
            console.log(user);
        } catch (err) {
            console.log('Unable to update name');
        }
    };

    return(<>
        {(username === currentUser && !overRideStyle) ? <Button
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={()=>setModal(true)}
        >
            See Your Profile
        </Button> :
            <button
                onClick={()=>setModal(true)}
                style={{
                    backgroundColor: 'inherit',
                    cursor: 'pointer',
                    border: 'none',
                    color: '#838181'
                }}
            >
                {username}
            </button>
        }
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
                backgroundColor: 'rgba(25,111,191,0.75)'
            },
            content: {
                position: 'absolute',
                width: "40%",
                height: "70%",
                left: '30%',
            }
        }}
    >
            <div><button onClick={()=>setModal(false)}>X</button></div>
        <div className="profile">
            {loading ? (
                'loading..'
            ) : (
                <>
                    <div>
                        <div>
                            <div>
                                <Typography>
                                    {name}
                                </Typography>

                            </div>
                            <img src={imageUrl} alt={'defProf'} />
                        </div>
                        <div>

                                    <Typography variant="h5" component="h2">
                                        {role}
                                    </Typography>
                                    <Typography
                                        color="textSecondary"
                                        gutterBottom
                                    >
                                        {desc}
                                    </Typography>
                            {(currentUser === username) ? <ProfileModal profile={profile} handleChange={handleChange}/>: <></>}
                        </div>
                    </div>
                </>
            )}
        </div>
    </Modal></>);
}

export default DisplayProfile;