import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
const configToDB = {
  apiKey: "AIzaSyBxkMxAkuRKDKH-v5SEyu--Bpd5VT_EJhY",
  authDomain: "enterprise-comp1640.firebaseapp.com",
  projectId: "enterprise-comp1640",
  storageBucket: "enterprise-comp1640.appspot.com",
  messagingSenderId: "483441960651",
  appId: "1:483441960651:web:2d432b1e4bd726a6941d4e",
  measurementId: "G-GWKENVZT8W",
};
firebase.initializeApp(configToDB);
firebase.analytics();
export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const googleProvider = new firebase.auth.GoogleAuthProvider();
export const firebaseLanguage = firebase.auth().useDeviceLanguage();
export default firebase;
