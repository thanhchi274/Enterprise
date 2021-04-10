import { takeLatest, all, call, put,select } from "redux-saga/effects";
// import UserActionTypes from "./user.type";
import DataActionTypes from './data.type'
import { getMagazineDataRef,firestore,getUserDataRef,functions,
   cloudStorage,auth,getClosureDataRef
  } from '../../utils/firebase.utils';
import { selectCurrentUser } from '../user/user.selector';
import {
  createUserProfileDocument,
  getCurrentUser
} from "../../utils/firebase.utils";
import axios from "axios";
import _, { toString } from 'lodash'
import {fetchMagazinePostSuccess,fetchMagazinePostFailure,fetchMagazinePostStaffSuccess,fetchClosureDateSuccess,fetchClosureDateFailure,updateClosureDateSuccess,updateClosureDateFailure,fetchEachEventSuccess,fetchEachEventFailure} from './data.action'
import { toast } from "material-react-toastify";
export function* getMagazinePostDataStart(){
          yield takeLatest(DataActionTypes.FETCH_MAGAZINE_START, getMagazinePostDataAsync)
}
export function* getMagazinePostDataAsync(){
  let currentUser = yield select(selectCurrentUser)
  if(currentUser){
    try{
      let MagazineData = []
      let populateData = data=>{
        MagazineData.push(data);
      }
      yield firestore.collection("magazinePost").where('id', '==', currentUser.id).get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          populateData(doc.data())
        });
    });
      yield put(fetchMagazinePostSuccess(MagazineData))
      yield MagazineData=[]
    } catch (error) {
      yield put(fetchMagazinePostFailure(error))
    }
  }
}
export function* getMagazinePostDataStartStaff(){
  yield takeLatest(DataActionTypes.FETCH_MAGAZINE_START_BY_STAFF, getMagazinePostDataStaffAsync)
}
export function* getMagazinePostDataStaffAsync(){
  try {
    let MagazineData = []
    let populateData = data=>{
      MagazineData.push(data);
    }
    yield firestore.collection("magazinePost").get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        populateData({...doc.data()})
      });
  });
    yield put(fetchMagazinePostStaffSuccess(MagazineData))
    yield MagazineData=[]
  } catch (error) {
    yield put(fetchMagazinePostFailure(error))
  }
}
export function* approvePost(data){
  yield takeLatest(DataActionTypes.APPROVE_POST, updateStatusPost)
}
export function* updateStatusPost({payload}){
  const extraDataUserRef =  firestore.collection('magazinePost').doc(payload.id).get();
  const result = yield extraDataUserRef.then(res=>res.data())
}
export function* fetchClosureDateStart(){
  yield takeLatest(DataActionTypes.FETCH_CLOSURE_DATE_START,fetchClosureDateAsync )
}
export function* fetchClosureDateAsync(props){
  let ClosureData = []
  let populateData = data=>{
    ClosureData.push(data);
  }
  try {
    
    yield firestore.collection("closure_date").orderBy('ID', 'asc').get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        populateData({...doc.data(),"keyID":doc.id})
      });
  });
  yield put(fetchClosureDateSuccess(ClosureData))
  yield ClosureData=[]
  } catch (error) {
    yield put(fetchClosureDateFailure(error))
  }
}
export function* updateClosureDateStart(){
  yield takeLatest(DataActionTypes.UPDATE_CLOSURE_DATE_START,updateClosureDateAsync )
}
export function* updateClosureDateAsync({payload}){
  try {
    yield firestore.collection("closure_date").doc(payload.keyID).update(payload);
    yield put(updateClosureDateSuccess())
    yield alert('Update Success')
  } catch (error) {
    yield put(updateClosureDateFailure(error))
    yield alert('Update Fail')
  }
}
export function* fetchEachEventStart(){
  yield takeLatest(DataActionTypes.FETCH_EACH_EVENT_START,fetchEachEventAsync)
}
export function* fetchEachEventAsync({payload}) {
  let eachEventData = []
  let populateData = data=>{
    eachEventData.push(data);
  }
  try {
    yield firestore.collection("magazinePost").where('end','==',payload).get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        populateData(doc.data())
      });
  });
 yield put(fetchEachEventSuccess(eachEventData))
 yield eachEventData=[]
  } catch (error) {
    yield put(fetchEachEventFailure(error))
  }
}
export function* dataSagas() {
  yield all([ call(getMagazinePostDataStart),call(getMagazinePostDataStartStaff), call(approvePost), call(fetchClosureDateStart), call(updateClosureDateStart), call(fetchEachEventStart)
    ])
}
