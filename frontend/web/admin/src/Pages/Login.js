import React, { useEffect, useState} from 'react';
import {Link, useHistory, Redirect} from "react-router-dom";

import {auth} from "../firebase";

var firebaseui = require('firebaseui');

var ui = new firebaseui.auth.AuthUI(auth());

function Login() {
    const history = useHistory();
    const [user, setUser] = useState();


    useEffect(() => {
        ui.start('#firebaseui-auth-container', uiConfig);
        const authListener = auth().onAuthStateChanged(function(user) {
            setUser(user);
            if (user){
                history.replace('/');
            }
        });

        return ()=>{
            authListener();
        }
    }, [])


    var uiConfig = {
        callbacks: {
          signInSuccessWithAuthResult: function(authResult, redirectUrl) {
            return false;
          },
        },
        signInOptions: [
            {
                provider: auth.EmailAuthProvider.PROVIDER_ID,
                signInMethod: auth.EmailAuthProvider.EMAIL_PASSWORD_SIGN_IN_METHOD,
                disableSignUp: {status: true}
            }
        ],
    };

    
    return (
        <>
            <div className='d-flex flex-fill flex-column justify-content-center'>
            <script src="https://www.gstatic.com/firebasejs/ui/4.8.0/firebase-ui-auth.js"></script>
            <link type="text/css" rel="stylesheet" href="https://www.gstatic.com/firebasejs/ui/4.8.0/firebase-ui-auth.css" />
                <div className='p-2 flex-fill'>
                    <h1 className='text-center mb-4'>Figurspel Admin</h1>
                    <div id="firebaseui-auth-container"></div>
                </div>
            </div>
        </>
    );
  }
  
  export default Login;