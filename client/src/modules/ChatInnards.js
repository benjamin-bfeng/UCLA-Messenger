import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import TextField from '@material-ui/core/TextField';
import LikeButton from './LikeButton';
import SearchModal from './SearchModal';
import DisplayProfile from "./DisplayProfile";

import {CTX} from './Store';
import '../index.css';

const useStyles = makeStyles(theme => ({
  root: {
    margin: '50px',
    padding: theme.spacing(3, 2),
    textAlign: 'center',
    verticalAlign: 'middle',
  },
  flex: {
    display: 'flex',
    alignItems: 'center',
  },
  topicsWindow: {
    width: '30%',
    height: '300px',
    borderRight: '1px solid grey',
    overflowY: 'auto',
  },
  chatWindow: {
    width: '70%',
    height: '300px',
    padding: '20px',
    overflowY: 'auto',
  },
  chatBox: {
    width: '85%',
  },
  button: {
    width: '15%',
  },
  modal: {
    width: '100%',
    textAlign: 'left',
  },
}));

const ChatInnards = () => {
  const classes = useStyles();

  // CTX store
  const { allChats, sendChatAction, addChatAction, user, loaded } = React.useContext(CTX);
  const topics = Object.keys(allChats);

  // local state
  const [activeTopic, changeActiveTopic] = React.useState(topics[0]);
  const [textValue, changeTextValue] = React.useState('');
  const addChats = array => {
    addChatAction(array);

  };


  return ( (loaded) ?
    <div>
    <div style={{textAlign: 'right'}}>
      <DisplayProfile
          username={user}
          currentUser={user}
          overRideStyle={false}/>
      <Button
          color="default"
          style={{backgroundColor: "#acaaaa",
                  marginLeft: '30px',
                  marginRight: '30px'
          }}
          onClick={()=>window.location.reload()}
      >Logout</Button>
    </div>
      <Paper className={classes.root} elevation={1}>
        <Typography variant={'h4'} component={'h4'}>
          Bruin Chat
        </Typography>
        <Typography variant={'h5'} component={'h5'}>
          {activeTopic}
        </Typography>
        <div className={classes.modal}>
          <SearchModal handleChange={addChats}/>
        </div>
        <div className={classes.flex}>
          <div className={classes.topicsWindow}>
            <List>
              {topics.map(topic => (
                <ListItem
                  onClick={e => changeActiveTopic(e.target.innerText)}
                  key={topic}
                  button
                >
                  <ListItemText primary={topic} />
                </ListItem>
              ))}
            </List>
          </div>
          <div className={classes.chatWindow}>
            {allChats[activeTopic].map((chat, index) => (
              <div className={'message push'} key={index}>
                  <Chip
                    variant={'outlined'}
                    color={
                      (typeof chat.user === 'string')
                          ? (chat.user === user) ? "primary" : "default"
                          : (chat.user.username === user) ? "primary" : "default"}
                    avatar={<Avatar
                        src={ (typeof chat.user === 'object')
                          ? "http://localhost:3001/api/users/image/"+chat.user.id
                          :"/static/images/avatar/1.jpg"} />}
                    label={chat.message}
                  />
                <DisplayProfile
                  username={(typeof chat.user === 'string') ? chat.user : chat.user.username}
                  currentUser={user}
                  overRideStyle={true}
              /><LikeButton user={user} msgId={chat._id}/>
              </div>
            ))}
          </div>
        </div>
        <div className={classes.flex}>
          <TextField
            className={classes.chatBox}
            label="your message..."
            multiline
            rowsMax={4}
            value={textValue}
            onChange={e => changeTextValue(e.target.value)}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              sendChatAction({
                user: user,
                message: textValue,
                chat: activeTopic,
              });
              changeTextValue('');
            }}
          >
            Send
          </Button>
        </div>
      </Paper>
    </div> : <div>loading</div>
  );
};

export default ChatInnards;
