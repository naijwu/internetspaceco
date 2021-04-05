import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const app = firebase.initializeApp({ // TODO: switch them out with 'process.env.[name]'
    apiKey: "AIzaSyD5kzg_4fNCKnaxS9Kv_ZbsaH1KWm7CGBk",
    authDomain: "cahsmun-campus.firebaseapp.com",
    projectId: "cahsmun-campus",
    databaseURL: "https://cahsmun-campus.firebaseio.com",
    storageBucket: "cahsmun-campus.appspot.com",
    messagingSenderId: "512144577251",
    appId: "1:512144577251:web:a087efbab3d5b514d16bd6",
    measurementId: "G-P9GZ9CZFHT"
});

export const auth = app.auth();
export const database = app.firestore();
export default app;