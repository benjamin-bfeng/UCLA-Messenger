import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './index.css';

import SignUp from './modules/SignUp';
import Login from './modules/Login';

import Chat from './modules/Chat';
import Profile from "./modules/Profile";

const App = () => {
  return <div className={'app'}>
    <Router>
      <Switch>
        <Route exact path='/'>
          <Chat/>
        </Route>
        <Route path='/profile'>
          <Profile/>
        </Route>
        <Route path='/signup'>
          <SignUp/>
        {/* <Redirect to='/signup'/> */}
        </Route>
        <Route path='/login'>
          <Login/>
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

ReactDOM.render(<App />, document.getElementById('root'));
