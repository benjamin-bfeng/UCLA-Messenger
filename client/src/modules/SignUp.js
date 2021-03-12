import React from 'react';
import {
  Button,
  Link,
  Typography,
} from '@material-ui/core';
import registrationService from '../services/register';
import userService from '../services/users';
import TextField from "@material-ui/core/TextField";

const SignUp = ({authenticate}) => {
  const [name, setName] = React.useState('');
  const [username, setUsername] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [signedUp,setSignedUp] = React.useState(false);
  const [wrongCredentials,setWrongCredentials] = React.useState(false);

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
      setWrongCredentials(true);
    }
  };

  return (
  <div>
    <div className={'login-box'}>
      <div style={{height: '8%'}}></div>{ (!wrongCredentials) ?
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
        : <div>
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
                error
                helperText={"Incorrect Credentials"}
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
                error
                helperText={"Incorrect Credentials"}
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
                error
                helperText={"Incorrect Credentials"}
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
                error
                helperText={"Incorrect Credentials"}
            /></ div>
        </div>}
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
                  onClick={handleRegister}
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
