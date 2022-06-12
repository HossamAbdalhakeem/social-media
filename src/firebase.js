import firebase from "firebase";

// firebase init - add your own config here
const firebaseConfig = {
  apiKey: "AIzaSyBGUX9p-vGi4lFyawlwQV6lhNbb8QeUuQw",
  authDomain: "hossam-vue.firebaseapp.com",
  databaseURL: "https://hossam-vue-default-rtdb.firebaseio.com",
  projectId: "hossam-vue",
  storageBucket: "hossam-vue.appspot.com",
  messagingSenderId: "495984234614",
  appId: "1:495984234614:web:d645725f29713ea1904f57",
  measurementId: "G-ZF78WE0VSY",
};
firebase.initializeApp(firebaseConfig);

// utils
const db = firebase.firestore();
const auth = firebase.auth();
const storge = firebase.storage();

// export utils/refs
export { db, auth, storge };
