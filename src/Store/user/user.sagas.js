import { takeLatest, all, call, put,select } from "redux-saga/effects";
import UserActionTypes from "./user.type";
import { getUserExtraRef,
   cloudStorage
  } from '../../utils/firebase.utils';
import { selectCurrentUser } from '../user/user.selector';
import {
  auth,
  createUserProfileDocument,
  getCurrentUser
} from "../../utils/firebase.utils";
import { signInSuccess, signInFailure, signOutSuccess, signOutFailure, signUpSuccess, signUpFailure, updateUserSuccess, uploadDataFailure, setExtraDataUserInFirebase } from "./user.action";
import axios from "axios";
import _, { toString } from 'lodash'
import { toast } from "material-react-toastify";
export function* getSnapshotFromAuth(userAuth,additionalData) {
  try {
    const userRef = yield call(createUserProfileDocument, userAuth, additionalData);
    const userSnapShot = yield userRef.get();
    const providerData = [...userAuth.providerData]
    yield put(signInSuccess({ id: userSnapShot.id, ...userSnapShot.data(), providerData }));
  } catch (err) {
    yield put(signInFailure({ err }));
  }
}
export function* signInWithEmail({ payload: { email, password } }) {
  try {
    const { user } = yield auth.signInWithEmailAndPassword(email, password);
    yield getSnapshotFromAuth(user);
  } catch (err) {
    yield put(signInFailure(err));
  }
}
export function* signOut(){
  try {
    yield auth.signOut()
    yield put(signOutSuccess())
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
  const timeNow= yield new Date().toLocaleDateString('de-DE')
  if (currentUser) {
    try {
      if(files.length===2){
        yield cloudStorage.ref(`/upload_document/${currentUser.email}`).child(files[1].title).child(files[0].name).put(files[0])
        const itemDownload = yield cloudStorage.ref(`/upload_document/${currentUser.email}`).child(files[1].title).child(files[0].name)
        const itemUrl = yield itemDownload.getDownloadURL().then(url=>url)
        let userUploadData = {
          id:currentUser.id,
          link:itemUrl,
          title:files[1].title,
          createAt:toString(timeNow),
          status:"Submitted",
          author:files[1].author,
          start:files[1].startDate,
          end:files[1].endDate
        }
        const extraDataUserRef = yield getUserExtraRef(currentUser.id);
        yield extraDataUserRef.update(userUploadData);
        yield put(updateUserSuccess())
        yield alert('Success Upload')
      }
      if(files.length===3){
        yield cloudStorage.ref(`/upload_document/${currentUser.email}`).child(files[2].title).child(files[0].name).put(files[0])
        yield cloudStorage.ref(`/upload_document/${currentUser.email}`).child(files[2].title).child(files[1].name).put(files[1])
        const itemDownload1 = yield cloudStorage.ref(`/upload_document/${currentUser.email}`).child(files[2].title).child(files[0].name)
        const itemDownload2 = yield cloudStorage.ref(`/upload_document/${currentUser.email}`).child(files[2].title).child(files[1].name)
        const itemUrl1 = yield itemDownload1.getDownloadURL().then(url=>url)
        const itemUrl2 = yield itemDownload2.getDownloadURL().then(url=>url)
        let userUploadData = {
          id:currentUser.id,
          link:itemUrl1,
          link2:itemUrl2,
          title:files[2].title,
          createAt:toString(timeNow),
          status:"Submitted",
          author:files[2].author,
          start:files[2].startDate,
          end:files[2].endDate
        }
        const extraDataUserRef = yield getUserExtraRef(currentUser.id);
        yield extraDataUserRef.update(userUploadData);
        yield alert('Success Upload')
        yield put(updateUserSuccess())
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
// export function* onUserDataChange() {
//   yield takeLatest(
//     [
//       UserActionTypes.UPDATE_USER_PROFILE_START
//     ],
//     updateUserProfileAsync
//   );
// }
export function* userSagas() {
  yield all([ call(onEmailSignInStart), call(onCheckUserSessions), call(onSignOutStart),call(onSignUpStart) ,call(onSignUpSuccess), call(onUploadDataStart)
    //  call(onUserDataChange)
    ]);
}
