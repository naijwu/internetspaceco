import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const app = firebase.initializeApp({ // TODO: switch them out with 'process.env.[name]'
    apiKey: "AIzaSyAbkv-ckg9v3TfRznyPkxSDkg0j2TAPfRM",
    authDomain: "internetspaceco.firebaseapp.com",
    projectId: "internetspaceco",
    databaseURL: "https://internetspaceco.firebaseio.com",
    storageBucket: "internetspaceco.appspot.com",
    messagingSenderId: "593628122860",
    appId: "1:593628122860:web:e812cb80b49902fa419fc9",
    measurementId: "G-TZFQ95PN31"
});

export const auth = app.auth();
export const database = app.firestore();
export default app;