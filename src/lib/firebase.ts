// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBtaMhY_htwcKVPuSvVCZlb6m4QXBalvbA",
    authDomain: "scb-users-group.firebaseapp.com",
    projectId: "scb-users-group",
    storageBucket: "scb-users-group.appspot.com",
    messagingSenderId: "898053445460",
    appId: "1:898053445460:web:0dcef7c8d469613a459ac1",
    measurementId: "G-Y8LEV95TT6"
};

let firebaseApp;

if (!getApps().length) {
    firebaseApp = initializeApp(firebaseConfig);
}

const firestore = getFirestore(firebaseApp);
const firebaseAuth = getAuth(firebaseApp);

export { firebaseApp, firebaseAuth, firestore };