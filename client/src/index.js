import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import './index.css';

import Home from './modules/Home';

import SignUp from './modules/SignUp';
import Login from './modules/Login';

import Chat from './modules/Chat';

import Test from "./modules/Dev_Sandbox";


const App = () => {
  const [authed,setAuthed] = React.useState(false);
  const [username,setUsername] = React.useState(null);

  console.log("router",authed,sessionStorage.getItem("auth"));

  const authenticate = (user) => {
    setAuthed(true);
    setUsername(user);
  };

  return <div className={'app'}>
    <Router>
      <Switch>
        <Route exact path='/'>
          <Home/>
        </Route>
        <Route path='/login'>
          {(!authed) ?
          <Login authenticate={authenticate}/>
          : <Redirect to="chat"/>}
        </Route>
        <Route path='/chat'>
          <Chat authed={authed} user={username}/>
        </Route>
        <Route path='/signup'>
          {(!authed) ?
              <SignUp authenticate={authenticate}/>
              : <Redirect to="chat"/>}
        </Route>
        <Route path='/dev'>
          <Test/>
        </Route>
{/*        <Route exact path='/'>
          <Home />
        </Route>
        <Route path='/about'>
          <About />
        </Route>
        <Route path='/people'>
          <People />
        </Route>
        <Route path='/person/:id' children={<Person />}></Route>
        <Route path='*'>
          <Error />
        </Route>*/}
      </Switch>
    </Router>
  </div>;
};



ReactDOM.render(
    <App/>
, document.getElementById('root'));
