import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

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

const storage = firebase.storage();

export const uploadImageToStorage = async (user, file, type) => {
    try {
      const ref = storage.ref(`images/${user}/${type}`);
      const uploadData = await ref.put(file);
      return uploadData.ref.getDownloadURL();
    } catch (e) {
      // eslint-disable-next-line no-alert
      alert(e);
      return null;
    }
};

export const auth = app.auth();
export const database = app.firestore();
export default app;