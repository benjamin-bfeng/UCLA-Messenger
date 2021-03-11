import React, {useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import TextField from '@material-ui/core/TextField';
import Tooltip from '@material-ui/core/Tooltip';
import LikeButton from './LikeButton';
import SearchModal from './SearchModal';
import DisplayProfile from "./DisplayProfile";
import userServices from '../services/users'
import axios from "axios";

import { CTX } from './Store';
import '../index.css';
import {useFetchProfile} from "./useFetchProfile";

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
  message: {
    display: 'flex',
    alignItems: 'center',
    padding: '2px',
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
  const { allChats, sendChatAction, user } = React.useContext(CTX);
  let topics = Object.keys(allChats);

  // local state
  const [activeTopic, changeActiveTopic] = React.useState(topics[0]);
  const [activeID,setActiveID] = React.useState("");
  const [textValue, changeTextValue] = React.useState('');
  const [participatingChats, setChats] = React.useState([]);
  const [loaded,setLoaded] = React.useState(true);
  const addChats = array => {
    let result_array = [];
    let arr = participatingChats.concat(array);
    let len = arr.length;
    let assoc = {};

    while (len--) {
      let item = arr[len];

      if (!assoc[item._id]) {
        result_array.unshift(item);
        assoc[item._id] = true;
      }
    }
    setChats(result_array);
    if(loaded)
    {
      axios.get('http://localhost:3001/api/users/' + user).then(response => {
        const id = response.data.id;
        const currentCourses = response.data.courses;
        console.log(currentCourses);
        const newArray = participatingChats.map(x => {
          return x._id
        });
        const concatArray = currentCourses.concat(newArray);
        console.log(concatArray);
        userServices.updateUserCourses(id, concatArray);
      })
    }
  };


  return (
    <div>
      <Paper className={classes.root} elevation={1}>
        <Typography variant={'h4'} component={'h4'}>
          Bruin Chat
        </Typography>
        <DisplayProfile username={user} currentUser={user}/>
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
              <div className={classes.message} key={index}>
                <Tooltip title={chat.user} placement="left">
                  <Chip
                    variant={'outlined'}
                    avatar={<Avatar src="/static/images/avatar/1.jpg" />}
                    label={chat.message}
                  />
                </Tooltip>
                <LikeButton />
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
    </div>
  );
};

export default ChatInnards;
