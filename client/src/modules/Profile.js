import React from 'react';
import '../index.css';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import defProfPic from './assets/defProf.jpg';
import Typography from "@material-ui/core/Typography";
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

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

const defaultProfile={
    name: "Default Name",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit," +
        " sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim " +
        "ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea" +
        " commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit" +
        " esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat" +
        " non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    img: defProfPic,
    role: "Student",
};

const Profile = () => {
    const classes = useStyles();

    return (
        <div className = 'profile'>
                <Paper className={classes.root} elevation={3}>
                    <div className={classes.flex}>
                        <div className={classes.photoAndChats}>
                            <div className={classes.title}>
                                <h1>{defaultProfile.name}</h1>
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
                                        {defaultProfile.role}
                                    </Typography>
                                    <Typography className={classes.cardTitle}
                                                color="textSecondary" gutterBottom>
                                        {defaultProfile.desc}
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