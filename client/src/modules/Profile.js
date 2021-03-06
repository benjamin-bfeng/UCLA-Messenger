import React, {Component, useEffect} from 'react';
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
    const [desc,setDesc] = React.useState(defaultProfile.desc);
    const [name,setName] = React.useState(defaultProfile.name);
    const [role,setRole] = React.useState(defaultProfile.role);
    const { id } = useParams();


    function handleDesc(newValue) {
        setDesc(newValue);
    }

    function handleName(newValue) {
        setName(newValue);
    }

    function handleRole(newValue) {
        setRole(newValue);
    }

    useEffect(()=>{
        console.log('desc has changed')
    },[desc])

    useEffect(()=>{
        console.log('name has changed')
    },[name])

    useEffect(()=>{
    },[role])

    return (
        <div className = 'profile'>
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
                                 src={defaultProfile.img}
                                 alt={'defProf'}
                            />
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


                </Paper>
        </div>
    );
}

export default Profile;