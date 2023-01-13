import firebase from "firebase/app";
import "firebase/auth";

var firebaseConfig = {
    apiKey: "AIzaSyDn4OErQ0RoHJ_lf1U4ExE2GpR67j9AFYw",
    authDomain: "riksfigur-admin.firebaseapp.com",
    projectId: "riksfigur-admin",
    storageBucket: "riksfigur-admin.appspot.com",
    messagingSenderId: "1019880507755",
    appId: "1:1019880507755:web:2749f37f256e214ad9a42e"
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth;