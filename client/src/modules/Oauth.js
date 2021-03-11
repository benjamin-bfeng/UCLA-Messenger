import React from 'react';
import ReactDOM from 'react-dom';
import '../index.css';
import {useAuth0} from "@auth0/auth0-react";

const Oauth = () => {
    const { loginWithRedirect } = useAuth0();
    return (<button
        onClick={() =>
            loginWithRedirect()
        }
    >Login</button>);
}

export default Oauth;