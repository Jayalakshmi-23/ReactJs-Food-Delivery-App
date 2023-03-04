import {getApp, getApps, initializeApp} from 'firebase/app';
import {getFirestore} from 'firebase/firestore' 
import {getStorage} from 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyCyHxc4NHrf7KK2oV26_v0RpQoxCfWnEuA",
    authDomain: "react-food-delivery-app-cc6c4.firebaseapp.com",
    databaseURL: "https://react-food-delivery-app-cc6c4-default-rtdb.firebaseio.com",
    projectId: "react-food-delivery-app-cc6c4",
    storageBucket: "react-food-delivery-app-cc6c4.appspot.com",
    messagingSenderId: "457102868346",
    appId: "1:457102868346:web:06bcd207c80bca0526a0c3"
  };

  const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig);

  const firestore = getFirestore(app);
  const storage = getStorage(app);

  export {app, firestore, storage};