import { takeLatest, all, call, put,select } from "redux-saga/effects";
import UserActionTypes from "./user.type";
import { getUserExtraRef,
   cloudStorage,auth, firestore
  } from '../../utils/firebase.utils';
import { selectCurrentUser } from '../user/user.selector';
import {selectMagazinePost} from '../data/data.selector'
import {
  createUserProfileDocument,
  getCurrentUser
} from "../../utils/firebase.utils";
import { signInSuccess, signInFailure, signOutSuccess, signOutFailure, signUpSuccess, signUpFailure, uploadDataSuccess, uploadDataFailure, setExtraDataUserInFirebase,updateProfileSuccess,updateProfileFailure  } from "./user.action";
import axios from "axios";
import _, { toString } from 'lodash'
import { toast } from "material-react-toastify";
export function* getSnapshotFromAuth(userAuth,additionalData) {
  try {
    let userRole = []
    let populateData = data=>{
      userRole.push(data);
    }
    const userRef = yield call(createUserProfileDocument, userAuth, additionalData);
    const userSnapShot = yield userRef.get();
    let userEmail = userSnapShot.data().email
    yield firestore.collection('user_data').where('email','==',userEmail).get().then((querySnapshot) =>
      {
        return querySnapshot.forEach((doc) => { return populateData(doc.data())
      });
    })
    const providerData = [...userAuth.providerData, userRole[0]]
    yield put(signInSuccess({ id: userSnapShot.id, ...userSnapShot.data(), providerData }));
    yield userRole = []
  } catch (err) {
    yield put(signInFailure({ err }));
  }
}
export function* getUserRolesFromAuth(userEmail){
  try {
  } catch (error) {
    
  }
}
export function* signInWithEmail({ payload: { email, password } }) {
  try {
    const { user } = yield auth.signInWithEmailAndPassword(email, password);
    yield getSnapshotFromAuth(user);
    yield window.location.reload()
  } catch (err) {
    yield put(signInFailure(err));
  }
}
export function* signOut(){
  try {
    yield auth.signOut()
    yield put(signOutSuccess())
    yield window.location.reload()
  } catch (error) {
    yield put(signOutFailure(error))
  }
}
export function* onSignOutStart(){
  yield takeLatest(UserActionTypes.SIGN_OUT_START, signOut)
}
export function* isUserAuthenticated(){
  try {
    const userAuth = yield getCurrentUser()
    if(!userAuth) return;
    yield getSnapshotFromAuth(userAuth)
  } catch (error) {
    yield put(signInFailure(error))
  }
}
export function* onUploadDataStart(){
  yield takeLatest(UserActionTypes.UPLOAD_DATA_START,updateDataAsync)
}
export function* updateDataAsync({files}){
  const currentUser = yield select(selectCurrentUser);
  const currentData = yield select(selectMagazinePost)
  const timeNow= yield new Date().toUTCString()
  let existsData = []
  let populateData = data=>{
    existsData.push(data);
  }
  if (currentUser) {
    try {
      if(files.length===3){
        yield cloudStorage.ref(`/upload_document/${currentUser.email}`).child(files[0].name).put(files[0])
        const itemDownload = yield cloudStorage.ref(`/upload_document/${currentUser.email}`).child(files[0].name)
        const itemUrl = yield itemDownload.getDownloadURL().then(url=>url)
        let userUploadData = {
          id:currentUser.id,
          link:itemUrl,
          createAt:toString(timeNow),
          status:"Submitted",
          end:files[1].End,
          faulty:files[1].Faulty,
          start:files[1].Start,
          form:files[2].dateChoose
        }
        yield firestore.collection('magazinePost').where('id','==', currentUser.id).where('faulty','==',files[1].Faulty).where('form','==',files[2].dateChoose).get().then((querySnapshot)=>  querySnapshot.forEach((doc) => {
        return populateData({...doc.data(),"keyID":doc.id})
        }))
        if(existsData.length>0){
          yield firestore.collection('magazinePost').doc(`${existsData[0].keyID}`).update(userUploadData)
        }
        else{
          yield firestore.collection('magazinePost').add(userUploadData);
        }
        const Email={
          to: `${currentUser.email}`,
          message: {
            subject: `${files[1].Faulty}_Upload Post Success_${currentUser.email}`,
            text: `Student ${currentUser.email} has successfully uploaded,${files[1].Faulty} Marketing Coordinator please comment in the system.
            Thank You`,
            html: `<p>Student ${currentUser.email} has successfully uploaded,${files[1].Faulty} Marketing Coordinator please comment in the system.
            </br>Thank You</p>`,
          },
        }
        yield put(uploadDataSuccess())
        yield alert('Success Upload')
        yield firestore.collection("mail").add(Email).then(() => console.log("Queued email for delivery!"));
        yield window.location.reload()
      }
      if(files.length===4){
        yield cloudStorage.ref(`/upload_document/${currentUser.email}`).child(files[2].endDate).child(files[0].name).put(files[0])
        yield cloudStorage.ref(`/upload_document/${currentUser.email}`).child(files[2].endDate).child(files[1].name).put(files[1])
        const itemDownload1 = yield cloudStorage.ref(`/upload_document/${currentUser.email}`).child(files[2].endDate).child(files[0].name)
        const itemDownload2 = yield cloudStorage.ref(`/upload_document/${currentUser.email}`).child(files[2].endDate).child(files[1].name)
        const itemUrl1 = yield itemDownload1.getDownloadURL().then(url=>url)
        const itemUrl2 = yield itemDownload2.getDownloadURL().then(url=>url)
        let userUploadData = {
          id:currentUser.id,
          link:itemUrl1,
          link2:itemUrl2,
          createAt:toString(timeNow),
          status:"Submitted",
          end:files[2].End,
          faulty:files[2].Faulty,
          start:files[2].Start,
        }
        const extraDataUserRef = yield firestore.collection('magazinePost');
        yield extraDataUserRef.add(userUploadData);
        const Email={
          to: `${currentUser.email}`,
          message: {
            subject: `${files[1].Faulty}_Upload Post Success_${currentUser.email}`,
            text: `Student ${currentUser.email} has successfully uploaded at ${toString(timeNow)} ,${files[1].Faulty} Marketing Coordinator please comment in the system.
            Thank You`,
            html: `<p>Student ${currentUser.email} has successfully uploaded at ${toString(timeNow)} ,${files[1].Faulty} Marketing Coordinator please comment in the system.
            </br>Thank You</p>`,
          },
        }
        yield firestore.collection("mail").add(Email)
        .then(() => console.log("Queued email for delivery!"));
        yield alert('Success Upload')
        yield put(uploadDataSuccess())
        yield existsData=[]
        yield window.location.reload()
      }
    }
     catch (error) {
      yield toast.error(`Update Error, please try again!`)
      yield put(uploadDataFailure(error))
      // yield window.location.reload()
      switch (error.code) {
        case 'storage/object-not-found':
          yield console.log("File doesn't exist")
          break;
        case 'storage/unauthorized':
         yield console.log("User doesn't have permission to access the object")
          break;
        case 'storage/canceled':
         yield console.log("User canceled the upload")
          break;
        case 'storage/unknown':
        yield  console.log("Unknown error occurred, inspect the server response")
          break;
      }
    }
  }
}
export function* onEmailSignInStart() {
  yield takeLatest(UserActionTypes.EMAIL_SIGN_IN_START, signInWithEmail);
}
export function* onCheckUserSessions() {
  yield takeLatest(UserActionTypes.CHECK_USER_SESSION, isUserAuthenticated)
}
export function* signInAfterSignUp({payload:{user, additionalData}}){
yield getSnapshotFromAuth(user, additionalData);

}
export function* onUpdateProfileStart(){
  yield takeLatest(UserActionTypes.UPDATE_PROFILE_START, updateProfileAsync);
}
export function* updateProfileAsync({payload}){
  let user =yield auth.currentUser;
yield user.updateProfile({
  displayName: payload,
}).then(function() {
  alert('Update Success')
}).catch(function(error) {
  alert(error)
});
}
export function* signUp({payload:{email, password, displayName}}) {
try {
  const {user} = yield auth.createUserWithEmailAndPassword(email, password);
  yield put(signUpSuccess({user, additionalData:{displayName}}))
} catch (error) {
  yield put(signUpFailure(error))
}
}
export function* onSignUpStart(){
  yield takeLatest(UserActionTypes.SIGN_UP_START,signUp)
}
export function* onSignUpSuccess(){
  yield takeLatest(UserActionTypes.SIGN_UP_SUCCESS, signInAfterSignUp)
}
export function* approvePost(){

}
export function* rejectPost(){
  
}
export function* userSagas() {
  yield all([ call(onEmailSignInStart), call(onCheckUserSessions), call(onSignOutStart),call(onSignUpStart) ,call(onSignUpSuccess), call(onUploadDataStart), call(onUpdateProfileStart)
    ]);
}
