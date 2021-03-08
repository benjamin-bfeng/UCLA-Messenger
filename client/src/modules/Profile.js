import React, {Component, useEffect, useRef} from 'react';
import '../index.css';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import defProfPic from './assets/defProf.jpg';
import Typography from "@material-ui/core/Typography";
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import { Link, useParams } from 'react-router-dom';
import {useFetchProfile} from "./useFetchProfile"
import axios from "axios";

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
        height: '400px',
    },
    desc:{
        width: '80%',
        padding: '50px 0',
    },
    title:{
        display: 'inline-flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '50px',
        padding: '25 px 0',
    },
    img:{
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
    backHome:{
        width: '100%',
        minWidth: 'auto',
        textAlign: 'right',
    },
    editText:{
        display:"flex",
        width: '100%',
        height: '200px',
    },
    displayText:{
        alignItems: "center",
    },
    upload:{
        color: "#FFF",
    }
}));

const defaultProfile={
    name: "Default Name",
    id: "",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit," +
        " sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim " +
        "ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea" +
        " commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit" +
        " esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat" +
        " non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    img: defProfPic,
    role: "Student",
    listOfClasses: [],
};

class EditableText extends Component{
    constructor(props) {
        super(props);
        this.state = {
            value: props.value,
            isInEditMode: false,
            style: props.style
        }
    }

    changeEditMode = () => {
        this.setState({
            isInEditMode: !this.state.isInEditMode
        })

    }

    updateComponentValue = () =>{
        this.setState({
            isInEditMode: false,
            value: this.refs.theTextInput.value
        })
        this.props.onChange(this.refs.theTextInput.value);
    }

    renderEditView = () => {
        return <div>
            <textarea
                key={"input123"}
                type={"text"}
                defaultValue={this.state.value}
                ref="theTextInput"
            />
            <div>
                <button
                    className={"button button4"}
                    onClick={this.changeEditMode}>CANCEL</button>
                <button
                    className={"button button4"}
                    onClick={this.updateComponentValue}
                >OK</button>
            </div></div>
    }

    renderDefaultView = () => {
        return <div className={"profile-div1"}>
            {this.state.value}
            <button className={"button button2"} onClick={this.changeEditMode}>EDIT</button>
            </div>

    }

    render() {
        return this.state.isInEditMode ? this.renderEditView() :
            this.renderDefaultView()
    }
}


const Profile = () => {
    const classes = useStyles();
    const { username } = useParams();
    const url = "http://localhost:3001/api/users/"+username;
    const { loading, profile} = useFetchProfile(url);
    const [desc,setDesc] = React.useState();
    const [name,setName] = React.useState();
    const [role,setRole] = React.useState();
    const [imageUrl,setImageUrl] = React.useState();
    const [file,setFile] = React.useState(null);

    console.log(profile);


    const initialRender = useRef(true);

    useEffect(()=>{
        if (profile != null){
            setDesc(profile.bio);
            setName(profile.name);
            setRole(profile.role);
            const img_api = "http://localhost:3001/api/users/image/"+profile.id;
            setImageUrl(img_api);
        }
        console.log("rerender");
    },[profile])

    function handleDesc(newValue) {
        if (newValue !== desc) {
            setDesc(newValue);
            profile["bio"]=newValue;
            //TODO: post new data to sever
            }
    }

    function handleName(newValue) {
        if(newValue !== name) {
            setName(newValue);
            console.log(name);
            profile["name"]=newValue;
            //TODO: post new data to sever
        }
    }

    function handleRole(newValue) {
        if(newValue !== role) {
            setRole(newValue);
            console.log(role);
            profile["role"]=newValue;
            //TODO: post new data to sever
        }
    }

    function fileSelectedHandler (event){
        setFile(event.target.files[0]);
    }
    //TODO: Fix img upload
    function fileUploadHandler(){
        const fd = new FormData;
        fd.append('image',file,profile["id"])
        axios.post("http://localhost:3001/api/users/image/"+profile["id"],fd)
            .then(response => {console.log(response)});
    }

    return (
        <div className = 'profile'>
            { loading ? 'loading..':
                <Paper className={classes.root} elevation={3}>
                    <div className={classes.flex}>
                        <div className={classes.photoAndChats}>
                            <div className={classes.title}>
                                <h1><EditableText
                                    value={name}
                                    onChange={handleName}
                                /></h1>
                            </div>
                            <img
                                 className={classes.img}
                                 src={imageUrl}
                                 alt={'defProf'}
                            />
                            <label htmlFor="avatar"><h2 className={classes.upload}>Choose a profile picture:</h2></label>
                            <input
                                type='file'
                                id="avatar" name="avatar"
                                onChange={fileSelectedHandler}
                                accept="image/png, image/jpeg"
                            />
                            <button
                                onClick={fileUploadHandler}
                            >
                                Upload
                            </button>
                        </div>
                        <div className={classes.desc}>
                            <Card className={classes.cardRoot}>
                                <CardContent>
                                    <Typography variant="h5" component="h2" >
                                        <EditableText
                                            value={role}
                                            onChange={handleRole}
                                        />
                                    </Typography>
                                    <Typography className={classes.cardTitle}
                                                color="textSecondary" gutterBottom>
                                        <EditableText
                                            value={desc}
                                            onChange={handleDesc}
                                        />
                                    </Typography>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                    <div className={classes.flex}>
                        <div className={classes.backHome}>
                        <Link to='/' className='btn'>
                            <Typography>
                                BACK TO CHAT
                            </Typography>
                        </Link>
                        </div>
                    </div>


                </Paper>}
        </div>
    );
}

export default Profile;