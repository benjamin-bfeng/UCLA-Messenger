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
    width: '60%'
  }
}));

const Login = () => {
  const [name, setName] = React.useState("");
  const [password, setPassword] = React.useState("");
  const classes = useStyles();
  return (
    <Paper className={classes.root} elevation={3}>
        <Typography variant="h3" component="h3" >Sign Up</Typography>
        <Card className={classes.cardRoot}>
            <CardContent className={classes.cardContent}>
                <Input className={classes.contentWidth} value={name} type={'name'} placeholder={'Username'}
                  onChange={e => setName(e.target.value)}/>
                <Input className={classes.contentWidth} value={password} type={'password'} placeholder={'Password'}
                  onChange={e => setPassword(e.target.value)}/>
            </CardContent>
            <Button
              className={classes.contentWidth}
              variant="contained"
              onClick={() => {
                console.log(name, password)
              }}
            >Login</Button>
          <Typography> Don't have an account? 
            <Link href="/signup">Create One</Link>
          </Typography>
        </Card>
    </Paper>
  );
}

export default Login;