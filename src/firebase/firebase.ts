import firebase, {auth} from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
require('dotenv').config();

const firebaseConfig = {
  apiKey: "AIzaSyCjBxkdh1o11ui0mx_5IyHkr7vX6RhZTRs",
  authDomain: "devstore-aa73a.firebaseapp.com",
  databaseURL: "https://devstore-aa73a.firebaseio.com",
  projectId: "devstore-aa73a",
  storageBucket: "devstore-aa73a.appspot.com",
  messagingSenderId: "556963533135",
  appId: "1:556963533135:web:3e634f073a0a2a96"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const firestore = firebase.firestore();
export const fireauth = firebase.auth();

export default firebase;
