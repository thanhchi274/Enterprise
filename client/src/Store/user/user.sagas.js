import { takeLatest, all, call, put,select } from "redux-saga/effects";
import UserActionTypes from "./user.type";
import { getUserExtraRef,
   cloudStorage
  } from '../../services/firebase.utils';
import { selectCurrentUser } from '../user/user.selector';
import {
  auth,
  createUserProfileDocument,
  getCurrentUser
} from "../../services/firebase.utils";
import { signInSuccess, signInFailure, signOutSuccess, signOutFailure, signUpSuccess, signUpFailure, updateUserSuccess, uploadDataFailure, setExtraDataUserInFirebase } from "./user.action";
import axios from "axios";
import _ from 'lodash'
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
  if (currentUser) {
    try {
      if(files.length===1){
        yield cloudStorage.ref(`/upload_document/${currentUser.email}`).child(files[0].name).put(files[0])
        yield alert('Success Upload')
      }
      if(files.length===2){
        yield cloudStorage.ref(`/upload_document/${currentUser.email}`).child(files[0].name).put(files[0])
        yield cloudStorage.ref(`/upload_document/${currentUser.email}`).child(files[1].name).put(files[1])
        yield alert('Success Upload')
      }
    }
     catch (error) {
      yield toast.error(`Update Error, please try again!`)
      yield put(uploadDataFailure(error))
      // yield window.location.reload()
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
