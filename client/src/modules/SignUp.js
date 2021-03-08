import React from 'react';
import {Button, Link, Typography, Paper, Card, CardContent, Input, makeStyles} from '@material-ui/core';

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

const SignUp = () => {
  const [name, setName] = React.useState("");
  const [username, setUsername] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const classes = useStyles();
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
                    'password': password
                  })
                })
                .then(response => response.json())
                .then(data => {
                  console.log('Success:', data);
                })
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