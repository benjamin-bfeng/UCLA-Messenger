import React, { useEffect } from 'react';
import {Button, Link, Typography, Paper, Card, CardContent, Input, Select, MenuItem, makeStyles} from '@material-ui/core';
import {Redirect} from 'react-router-dom';
import CloseIcon from '@material-ui/icons/Close';
import { listOfCsClasses } from './Store';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: '#F7AA14',
    padding: theme.spacing(2,3),
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap',
    alignItems: 'center'
  },
  cardRoot: {
    width: '80%',
    minHeight: '400px',
    height: '60%',
  },
  cardContent: {
    display: 'absolute',
    alignItems: 'center'
  },
  contentWidth: {
    width: '60%',
    margin: '1%'
  }
}));

const SignUp = ({props}) => {
  const [name, setName] = React.useState("");
  const [username, setUsername] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [courses, setCourses] = React.useState([]);
  const classes = useStyles();

  const addCourses = (id) => {
    setCourses(prevItems => (prevItems.indexOf(id) === -1) ? [...prevItems, id] : prevItems);
  }

  const rmCourse = (i) => {
    courses.splice(i, 1);
    setCourses(e => [...e]);
  }

  useEffect(() => {
    if (props)
      return <Redirect
            to={{
            pathname: "/",
            state: { data: props }
          }}
        />;
    else console.log("Hello")
  }, [props]);

  return (
    <Paper className={classes.root} elevation={3}>
        <Typography variant="h3" component="h3" >Sign Up</Typography>
        <Card className={classes.cardRoot}>
            <CardContent className={classes.cardContent}>
                <Input className={classes.contentWidth} value={name} type={'name'} placeholder={'Name'}
                  onChange={e => setName(e.target.value)}/>
                <Input className={classes.contentWidth} value={username} type={'name'} placeholder={'Username'}
                  onChange={e => setUsername(e.target.value)}/>
                <Input className={classes.contentWidth} value={email} type={'email'} placeholder={'Email'}
                  onChange={e => setEmail(e.target.value)}/>
                <Input className={classes.contentWidth} value={password} type={'password'} placeholder={'Password'}
                  onChange={e => setPassword(e.target.value)}/>
                <div style={{margin: "1%"}}>
                  Courses:
                <Select  style={{width: "20%", margin: "1%"}} defaultValue="" id="grouped-native-select"
                  onChange={e => addCourses(e.target.value)}>
                  {listOfCsClasses.map((i) => {
                    return (
                      <MenuItem key={i} value={i}>CS {i}</MenuItem>
                    );})}
                </Select>
                </div>
                  {courses.map((course, i) => {
                    return (<Button key={course} onClick={e=>{rmCourse(i)}}>CS {course}
                    <CloseIcon/></Button>)
                  })}
            </CardContent>
            <Button
              className={classes.contentWidth}
              variant="contained"
              disabled={!name || !username || !email || !password}
              onClick={function () {
                fetch('http://localhost:3001/api/register/', {
                  headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                  },
                  method: 'POST',
                  body: new URLSearchParams({
                    'name': name,
                    'username': username,
                    'email': email,
                    'password': password,
                    // 'courses': courses
                  })
                })
                .then(response => response.json()
                .then(data => {
                  if (response.status === 200) {
                    console.log(data)
                    props = data;
                  }
                  console.log(response.status, data);
                }))
                .catch((error) => {
                  console.error('Error:', error);
                });
              }}
            >Sign Up</Button>
          <Typography> Have an account?
            <Link style={{margin: "1%"}} color="inherit" href="/login">Login</Link>
          </Typography>
        </Card>
    </Paper>
  );
}

export default SignUp;