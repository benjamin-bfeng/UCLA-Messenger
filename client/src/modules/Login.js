import React from 'react';
import {
  Button,
  Link,
  Typography,
  Paper,
  Card,
  CardContent,
  Input,
  makeStyles,
} from '@material-ui/core';
import loginService from '../services/login';
import userService from '../services/users';
import { Redirect } from 'react-router';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: '#F7AA14',
    padding: theme.spacing(2, 3),
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  cardRoot: {
    width: '80%',
    minHeight: '400px',
    height: '60%',
  },
  cardContent: {
    display: 'absolute',
    alignItems: 'center',
  },
  contentWidth: {
    width: '60%',
  },
}));

const Login = props => {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [loggedIn, setLoggedIn] = React.useState(false);

  const classes = useStyles();

  const handleLogin = async () => {
    const loginInfo = {
      username,
      password,
    };

    try {
      const user = await loginService.login(loginInfo);
      userService.setToken(user.token);
      setLoggedIn(true);
    } catch (err) {
      console.log('Unable to Login');
    }
  };
  return (
    <Paper className={classes.root} elevation={3}>
      <Typography variant="h3" component="h3">
        Login
      </Typography>
      <Card className={classes.cardRoot}>
        <CardContent className={classes.cardContent}>
          <Input
            className={classes.contentWidth}
            value={username}
            type={'username'}
            placeholder={'Username'}
            onChange={e => setUsername(e.target.value)}
          />
          <Input
            className={classes.contentWidth}
            value={password}
            type={'password'}
            placeholder={'Password'}
            onChange={e => setPassword(e.target.value)}
          />
        </CardContent>
        {loggedIn ? (
          <Redirect to="/chat" />
        ) : (
          <Button
            className={classes.contentWidth}
            variant="contained"
            onClick={handleLogin}
          >
            Login
          </Button>
        )}

        <Typography>
          {' '}
          Don't have an account?
          <Link href="/signup">Create One</Link>
        </Typography>
      </Card>
    </Paper>
  );
};

export default Login;
