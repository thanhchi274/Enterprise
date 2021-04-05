import { takeLatest, all, call, put,select } from "redux-saga/effects";
// import UserActionTypes from "./user.type";
import DataActionTypes from './data.type'
import { getMagazineDataRef,firestore,
   cloudStorage,auth
  } from '../../utils/firebase.utils';
import { selectCurrentUser } from '../user/user.selector';
import {
  createUserProfileDocument,
  getCurrentUser
} from "../../utils/firebase.utils";
import axios from "axios";
import _, { toString } from 'lodash'
import {fetchMagazinePostSuccess,fetchMagazinePostFailure,fetchMagazinePostStaffSuccess} from './data.action'
import { toast } from "material-react-toastify";
export function* getMagazinePostDataStart(){
          yield takeLatest(DataActionTypes.FETCH_MAGAZINE_START, getMagazinePostDataAsync)
}
export function* getMagazinePostDataAsync(){
  try {
    let MagazineData = []
    let populateData = data=>{
      MagazineData.push(data);
    }
    // .where("author", "==", "Thanh Chi")
    yield firestore.collection("magazinePost").get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        populateData({...doc.data(), "id":doc.id})
      });
  });
    yield put(fetchMagazinePostSuccess(MagazineData))
    yield MagazineData=[]
  } catch (error) {
    yield put(fetchMagazinePostFailure(error))
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
    yield firestore.collection("magazinePost").where("author", "==", "Thanh Chi").get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        console.log(doc.data())
        populateData({...doc.data(), "id":doc.id})
      });
  });
  yield console.log(MagazineData)
    yield put(fetchMagazinePostStaffSuccess(MagazineData))
    yield MagazineData=[]
  } catch (error) {
    yield put(fetchMagazinePostFailure(error))
  }
}

export function* dataSagas() {
  yield all([ call(getMagazinePostDataStart),call(getMagazinePostDataStartStaff)
    ]);
}
