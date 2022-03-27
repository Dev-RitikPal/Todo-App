import * as firebase from 'firebase/app';
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore';
import { collection } from '@firebase/firestore';
import { getStorage , ref } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyBU6fJoZjhw2UKbiX-Eu4FNsGNIORSPzUU",
    authDomain: "integrating-firebase-96aa9.firebaseapp.com",
    databaseURL: "https://integrating-firebase-96aa9-default-rtdb.firebaseio.com",
    projectId: "integrating-firebase-96aa9",
    storageBucket: "integrating-firebase-96aa9.appspot.com",
    messagingSenderId: "946271053951",
    appId: "1:946271053951:web:0f675742dec73d1f7f374a"
};

const app = firebase.initializeApp(firebaseConfig)
const auth = getAuth();
const db = getFirestore(app);
const dbref = collection(db, "users");
const storage = getStorage(app)

export {auth, db, dbref, storage,ref }