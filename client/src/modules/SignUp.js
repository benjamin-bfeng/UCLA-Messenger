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
import registrationService from '../services/register';
import userService from '../services/users';

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

const SignUp = ({authenticate}) => {
  const [name, setName] = React.useState('');
  const [username, setUsername] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [signedUp,setSignedUp] = React.useState(false);
  const classes = useStyles();

  const handleRegister = async () => {
    const registrationInfo = {
      name,
      username,
      email,
      password,
    };

    try {
      const user = await registrationService.register(registrationInfo);
      userService.setToken(user.token);
      setSignedUp(true);
    } catch (err) {
      console.log('unable to signup');
    }
  };

  return (
    <Paper className={classes.root} elevation={3}>
      <Typography variant="h3" component="h3">
        Sign Up
      </Typography>
      <Card className={classes.cardRoot}>
        <CardContent className={classes.cardContent}>
          <Input
            className={classes.contentWidth}
            value={name}
            type={'name'}
            placeholder={'Name'}
            onChange={e => setName(e.target.value)}
          />
          <Input
            className={classes.contentWidth}
            value={username}
            type={'username'}
            placeholder={'Username'}
            onChange={e => setUsername(e.target.value)}
          />
          <Input
            className={classes.contentWidth}
            value={email}
            type={'email'}
            placeholder={'Email'}
            onChange={e => setEmail(e.target.value)}
          />
          <Input
            className={classes.contentWidth}
            value={password}
            type={'password'}
            placeholder={'Password'}
            onChange={e => setPassword(e.target.value)}
          />
        </CardContent>
        {signedUp ?
            authenticate(username) : (
                <Button
                    className={classes.contentWidth}
                    variant="contained"
                    onClick={handleRegister}
                >
                  Sign Up
                </Button>
            )}
        <Typography>
          {' '}
          Have an account?
          <Link href="/login">Login</Link>
        </Typography>
      </Card>
    </Paper>
  );
};

export default SignUp;
