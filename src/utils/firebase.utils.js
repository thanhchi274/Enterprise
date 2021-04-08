import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage"
import "firebase/functions"
const configToDB = {
  apiKey: "AIzaSyBxkMxAkuRKDKH-v5SEyu--Bpd5VT_EJhY",
  authDomain: "enterprise-comp1640.firebaseapp.com",
  projectId: "enterprise-comp1640",
  storageBucket: "enterprise-comp1640.appspot.com",
  messagingSenderId: "483441960651",
  appId: "1:483441960651:web:2d432b1e4bd726a6941d4e",
  measurementId: "G-GWKENVZT8W",
  databaseURL:"https://enterprise-comp1640-default-rtdb.firebaseio.com/"
};
export const createUserProfileDocument =  async (userAuth, additionData) => {
  if(!userAuth) return;
  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapShot = await userRef.get();
  if(!snapShot.exists) {
    const {displayName, email}= userAuth;
    const createAt = new Date()
    try{
      await userRef.set({displayName, email, createAt,...additionData});
    }
    catch(error)
    {console.log('error create user', error.message)};
  }
  return userRef;
}
export const getStudentPostByID = async userId => {
  const cartsRef = firestore.collection('StudentPost').where('userId', '==', userId);
  const snapShot = await cartsRef.get();
  if (snapShot.empty) {
    const cartDocRef = firestore.collection('StudentPost').doc();
    await cartDocRef.set({ userId, studentPost: [] });
    return cartDocRef;
  } else {
    return snapShot.docs[0].ref;
  }
};
export const getUserExtraRef =async userId => {
  const dataRef = firestore.collection('magazinePost').where('userId', '==', userId)
  const snapShot = await dataRef.get()
  if (snapShot.empty) {
    const extraDataDocRef = firestore.collection('magazinePost').doc();
    await extraDataDocRef.set({ userId });
    return extraDataDocRef;
  } else {
    return snapShot.docs[0].ref;
  }
}
export const getUserDataRef =async postId => {
  const dataRef = firestore.collection('extra_data').doc(postId)
  const snapShot = await dataRef.get()
  if (snapShot.empty) {
    const extraDataDocRef = firestore.collection('extra_data').doc();
    await extraDataDocRef.set({ postId });
    return extraDataDocRef;
  } else {
    return snapShot.docs[0].ref;
  }
}
export const getClosureDataRef =async () => {
  const dataRef = firestore.collection("closure_date")
  const snapShot = await dataRef.get()
  if (snapShot.empty) {
    const extraDataDocRef = firestore.collection('closure_date').doc();
    await extraDataDocRef.set({});
    return extraDataDocRef;
  } else {
    return snapShot.data();
  }
}
export const getMagazineDataRef =async userId => {
  const dataRef = firestore.collection('magazinePost')
  const snapShot = await dataRef.get()
  if (snapShot.empty) {
    const extraDataDocRef = firestore.collection('magazinePost').doc();
    await extraDataDocRef.set({ userId });
    return extraDataDocRef;
  } else {
    return snapShot.docs[0].ref;
  }
}
export const addCollectionAndDocuments = async (collectionKey, objectToAdd)=>{
  const collectionRef =firestore.collection(collectionKey);
  const batch = firestore.batch()
  objectToAdd.forEach(obj=>{
    const newDocRef = collectionRef.doc();
    batch.set(newDocRef, obj)
  })
  return await batch.commit()
}
export const convertCollectionsSnapshotToMap = collections=>{
  const transformedCollections = collections.docs.map(doc=>{
    const{title,items} =doc.data();
    return {
      routeName: encodeURI(title.toLowerCase()),
      id: doc.id,
      title,
      items
    }
  })
  return transformedCollections.reduce((accumulator, collection)=>{
    accumulator[collection.title.toLowerCase()] = collection
    return accumulator
  },{})
}
export const getCurrentUser = ()=>{
  return new Promise((resolve, reject)=>{
    const unsubscribe = auth.onAuthStateChanged(userAuth=>{
      unsubscribe();
      resolve(userAuth)
    }, reject);
  })
}
firebase.initializeApp(configToDB);
export const auth = firebase.auth();
export const firestore =firebase.firestore();
export const cloudStorage =firebase.storage();
export const functions = firebase.functions()
export const firebaseAuthFunction = firebase.auth
export const firebaseLanguage = firebase.auth().useDeviceLanguage();
export default firebase;