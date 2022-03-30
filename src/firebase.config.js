// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';

import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyAlSVJcoene_t8UMc4kwKMd2rwkjeQPHCU',
  authDomain: 'housing-search-app.firebaseapp.com',
  projectId: 'housing-search-app',
  storageBucket: 'housing-search-app.appspot.com',
  messagingSenderId: '25510455871',
  appId: '1:25510455871:web:6004d58d6127ae7276668a',
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const db = getFirestore();
