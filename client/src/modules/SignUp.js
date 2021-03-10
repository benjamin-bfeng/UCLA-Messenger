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
import TextField from "@material-ui/core/TextField";

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
  <div>
    <div className={'login-box'}>
      <div style={{height: '8%'}}></div>
      <div>
        <Typography variant={'h4'}>BRUIN CHAT</Typography>
        <div style={{paddingTop:20}}><TextField
            id="outlined-full-width"
            label="Name"
            style={{ margin: 8 }}
            placeholder="Joe"
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
            variant="outlined"
            value={name}
            onChange={e => setName(e.target.value)}
        /></div>
        <div><TextField
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
            onChange={e => setUsername(e.target.value)}
        /></div>
        <div><TextField
            id="outlined-full-width"
            label="Email"
            style={{ margin: 8 }}
            placeholder="joe@ucla.edu"
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
            variant="outlined"
            value={email}
            onChange={e => setEmail(e.target.value)}
        /></div>
        <div style={{paddingBottom:15}}><TextField
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
      {signedUp ?
          authenticate(username) : (
              <Button
                  variant="contained"
                  color="primary"
                  style={{
                    backgroundColor: '#daa522',
                    width: '40%',
                    height: '10%',
                    borderRadius: 20
                  }}
              ><h2>SIGN UP</h2></Button>
          )}

      <div><Link
          href={'/'}
          style={{
            backgroundColor:'inherit',
            color: '#3287BE',
            paddingTop: 7
          }}
      >Back to login</Link>
      </div>
    </div>
  </div>
  );
};

export default SignUp;
