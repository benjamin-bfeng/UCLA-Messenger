import React, {useEffect,useState} from 'react';
import '../index.css';
import Modal from 'react-modal';
import { makeStyles } from '@material-ui/core/styles';
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import TextField from '@material-ui/core/TextField';



const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '25ch',

        },
    },
    divs:{
        paddingTop: 30
    },
    input: {
        display: 'none',
    },
    button:{
    
    }
}));

const ProfileModal = ({profile, handleChange}) => {
    const classes = useStyles();
    const [modal,setModal] = useState(false);
    const [newName,setNewName] = useState(profile["name"]);
    const [newRole,setNewRole] = useState(profile["role"]);
    const [newDesc,setNewDesc] = useState(profile["bio"]);
    const [newFile,setNewFile] = useState(null);

    function fileSelectedHandler(event) {
        setNewFile(event.target.files[0]);
    }

    useEffect(()=>{console.log(newFile)},[newFile]);

    return (
        <div>
            <Button
                variant="contained"
                color="primary"
                className={classes.button}
                onClick={()=>setModal(true)}
            >
                Edit Profile
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
                <div style={{position: 'fixed', left: '70%'}}>
                    <button onClick={()=>setModal(false)}>X</button>
                </div>
                <div className={classes.divs}>
                    <TextField
                    id="nameField"
                    label="Change Name"
                    placeholder="Placeholder"
                    multiline
                    rowsMax={1}
                    inputProps={{ maxLength: 30 }}
                    variant="outlined"
                    fullWidth
                    defaultValue={profile["name"]}
                    onChange={event=>setNewName(event.target.value)}
                />
                </div>
                <div className={classes.divs}>
                <TextField
                    id="roleField"
                    label="Change Role"
                    placeholder="Placeholder"
                    multiline
                    variant="outlined"
                    fullWidth
                    defaultValue={profile["role"]}
                    onChange={event=>setNewRole(event.target.value)}
                />
                </div>
                <div className={classes.divs}>
                <TextField
                    id="descField"
                    label="Change Desc"
                    placeholder="Placeholder"
                    multiline
                    rows={10}
                    rowsMax={10}
                    variant="outlined"
                    fullWidth
                    defaultValue={profile["bio"]}
                    onChange={event=>setNewDesc(event.target.value)}
                />
                </div>
                <div className={classes.divs} style={{textAlign:'right'}}>
                    <Typography>Change Profile Image </Typography>
                <input
                    className={classes.input}
                    id="contained-button-file"
                    multiple
                    type="file"
                    onChange={fileSelectedHandler}
                    accept="image/png, image/jpeg"
                />
                {/* {newFile? <img src={newFile} alt={'profileImage'} />:<></>} */}
                <label htmlFor="contained-button-file">
                    <Button variant="contained" outlined color="default" component="span" >
                        Upload
                    </Button>
                </label>
                </div>
                <div style={{height: '15%'}}></div>
                <div style={{textAlign: 'right'}}>
                <Button
                    variant="contained"
                    color={'primary'}
                    style={{backgroundColor: '#196FBF'}}
                    onClick={()=>{handleChange(newName,newRole,newDesc,newFile); setModal(false)}}
                >Save Changes</Button>
                </div>
            </Modal>
        </div>
    );
}

export default ProfileModal;