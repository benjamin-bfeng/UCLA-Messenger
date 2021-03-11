import React from 'react';
import {
  Button,
  Typography,
  makeStyles,
} from '@material-ui/core';
import loginService from '../services/login';
import userService from '../services/users';
import TextField from "@material-ui/core/TextField";
import {useHistory} from 'react-router-dom';

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

const Login = ({authenticate}) => {
  const history = useHistory();
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
      console.log("user: ",user);
      userService.setToken(user.token);
      setLoggedIn(true);
    } catch (err) {
      console.log('Unable to Login');
    }
  };

  return (
      <div>
        <div className={'login-box'}>
          <div style={{height: '8%'}}></div>
          <div>
            <Typography variant={'h4'}>BRUIN CHAT</Typography>
            <div style={{paddingTop:30}}><TextField
                id="outlined-full-width"
                label="Username"
                style={{ margin: 8 }}
                placeholder="Username"
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
                variant="outlined"
                value={username}
                type={'username'}
                onChange={e => setUsername(e.target.value)}
            /></div>
            <div style={{paddingBottom:30}}><TextField
                id="outlined-full-width"
                label="Password"
                style={{ margin: 8 }}
                placeholder="************"
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
                variant="outlined"
                type={"password"}
                value={password}
                onChange={e => setPassword(e.target.value)}
            /></ div>
          </div>
        {loggedIn ?
            authenticate(username) : (
                <Button
                    variant="contained"
                    color="primary"
                    style={{
                      backgroundColor: '#daa522',
                      width: '40%',
                      height: '10%',
                      marginBottom: 30,
                      borderRadius: 20
                    }}
                    onClick={handleLogin}
                ><p style={{letterSpacing: 3}}>LOG IN</p></Button>
        )}
          <Typography>
            <p>Don't have an Account?</p>
          </Typography>
          <Button
              variant="contained"
              color="default"
              onClick={()=>{history.push(`/signup`)}}
              style={{
                borderRadius: 15,
                color: 'white',
                backgroundColor: '#3287BE'
              }}
          >SIGN UP</Button>
        </div></div>
  );
};

export default Login;
