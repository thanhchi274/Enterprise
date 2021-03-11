import { takeLatest, all, call, put,select } from "redux-saga/effects";
import UserActionTypes from "./user.type";
import { getUserExtraRef,
  //  cloudStorage
  } from '../../services/firebase.utils';
import { selectCurrentUser } from '../user/user.selector';
import {
  auth,
  createUserProfileDocument,
  getCurrentUser
} from "../../services/firebase.utils";
import { signInSuccess, signInFailure, signOutSuccess, signOutFailure, signUpSuccess, signUpFailure, updateUserSuccess, updateUserFailure, setExtraDataUserInFirebase } from "./user.action";
import axios from "axios";
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
// export function* onUpdateUserProfileStart(){
//   yield takeLatest(UserActionTypes.UPDATE_USER_PROFILE_START,updateUserProfileAsync)
// }
// export function* updateUserProfileAsync({userCredentials}){
//   const currentUser = yield select(selectCurrentUser);
//   if (currentUser) {
//     try {
//     const image = yield userCredentials.photoURL
//     if(image!=="http://www.example.com/12345678/photo.png" &&image){
//       yield cloudStorage.ref('/images').child(image.name).put(image)
//       const imageUrl = yield cloudStorage.ref('/images').child(image.name).getDownloadURL()
//       const userData = {...userCredentials,photoURL:imageUrl}
//       yield axios.patch(`${process.env.REACT_APP_BASE_URL}/users/?id=${currentUser.id}`,userData)
//       .then(res=>toast.success(`Update Successfully!`)).then((updateUserSuccess()))
//       const extraDataUserRef = yield getUserExtraRef(currentUser.id);
//       yield extraDataUserRef.update(userData);
//       yield window.location.reload()
//     }
//     else{
//       yield axios.patch(`${process.env.REACT_APP_BASE_URL}/users/?id=${currentUser.id}`,{...userCredentials})
//       .then(res=>toast.success(`Update Successfully!`)).then(yield put(updateUserSuccess()))
//       const extraDataUserRef = yield getUserExtraRef(currentUser.id);
//       yield extraDataUserRef.update(userCredentials);
//       yield window.location.reload()
//     }
//     } catch (error) {
//       yield toast.error(`Update Error, please try again!`)
//       yield put(updateUserFailure(error))
//       yield window.location.reload()
//     }
//   }
// }
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
  yield all([ call(onEmailSignInStart), call(onCheckUserSessions), call(onSignOutStart),call(onSignUpStart) ,call(onSignUpSuccess),
    //  call(onUserDataChange) 
    ]);
}
