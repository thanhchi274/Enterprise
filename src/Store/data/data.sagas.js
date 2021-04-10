import { takeLatest, all, call, put, select } from "redux-saga/effects";
import DataActionTypes from "./data.type";
import { firestore } from "../../utils/firebase.utils";
import { selectCurrentUser } from "../user/user.selector";
import _ from "lodash";
import {
  fetchMagazinePostSuccess,
  fetchMagazinePostFailure,
  fetchMagazinePostStaffSuccess,
  fetchClosureDateSuccess,
  fetchClosureDateFailure,
  updateClosureDateSuccess,
  updateClosureDateFailure,
  fetchEachEventSuccess,
  fetchEachEventFailure,
} from "./data.action";
export function* getMagazinePostDataStart() {
  yield takeLatest(
    DataActionTypes.FETCH_MAGAZINE_START,
    getMagazinePostDataAsync
  );
}
export function* getMagazinePostDataAsync() {
  let currentUser = yield select(selectCurrentUser);
  if (currentUser) {
    try {
      let MagazineData = [];
      let populateData = (data) => {
        MagazineData.push(data);
      };
      yield firestore
        .collection("magazinePost")
        .where("id", "==", currentUser.id)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            populateData(doc.data());
          });
        });
      yield put(fetchMagazinePostSuccess(MagazineData));
      yield (MagazineData = []);
    } catch (error) {
      yield put(fetchMagazinePostFailure(error));
    }
  }
}
export function* getMagazinePostDataStartStaff() {
  yield takeLatest(
    DataActionTypes.FETCH_MAGAZINE_START_BY_STAFF,
    getMagazinePostDataStaffAsync
  );
}
export function* getMagazinePostDataStaffAsync() {
  try {
    let MagazineData = [];
    let populateData = (data) => {
      MagazineData.push(data);
    };
    yield firestore
      .collection("magazinePost")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          populateData({ ...doc.data(), keyID: doc.id });
        });
      });
    yield put(fetchMagazinePostStaffSuccess(MagazineData));
    yield (MagazineData = []);
  } catch (error) {
    yield put(fetchMagazinePostFailure(error));
  }
}
export function* approvePost(data) {
  yield takeLatest(DataActionTypes.APPROVE_POST, updateStatusPost);
}
export function* rejectPost(data) {
  yield takeLatest(DataActionTypes.REJECT_POST, updateStatusPost);
}
export function* commentPost(data) {
  yield takeLatest(DataActionTypes.SET_COMMENT, updateStatusPost);
}
export function* updateStatusPost({ payload }) {
  try {
    yield firestore
      .collection("magazinePost")
      .doc(payload.keyID)
      .update(payload);
    yield alert("Success");
  } catch (error) {
    yield console.log(error);
  }
}
export function* fetchClosureDateStart() {
  yield takeLatest(
    DataActionTypes.FETCH_CLOSURE_DATE_START,
    fetchClosureDateAsync
  );
}
export function* fetchClosureDateAsync(props) {
  let ClosureData = [];
  let populateData = (data) => {
    ClosureData.push(data);
  };
  try {
    yield firestore
      .collection("closure_date")
      .orderBy("ID", "asc")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          populateData({ ...doc.data(), keyID: doc.id });
        });
      });
    yield put(fetchClosureDateSuccess(ClosureData));
    yield (ClosureData = []);
  } catch (error) {
    yield put(fetchClosureDateFailure(error));
  }
}
export function* updateClosureDateStart() {
  yield takeLatest(
    DataActionTypes.UPDATE_CLOSURE_DATE_START,
    updateClosureDateAsync
  );
}
export function* updateClosureDateAsync({ payload }) {
  try {
    yield firestore
      .collection("closure_date")
      .doc(payload.keyID)
      .update(payload);
    yield put(updateClosureDateSuccess());
    yield alert("Update Success");
  } catch (error) {
    yield put(updateClosureDateFailure(error));
    yield alert("Update Fail");
  }
}
export function* fetchEachEventStart() {
  yield takeLatest(DataActionTypes.FETCH_EACH_EVENT_START, fetchEachEventAsync);
}
export function* fetchEachEventAsync({ payload }) {
  let eachEventData = [];
  let populateData = (data) => {
    eachEventData.push(data);
  };
  try {
    yield firestore
      .collection("magazinePost")
      .where("faulty", "==", payload)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          populateData({ ...doc.data(), keyID: doc.id });
        });
      });
    yield put(fetchEachEventSuccess(eachEventData));
    yield (eachEventData = []);
  } catch (error) {
    yield put(fetchEachEventFailure(error));
  }
}
export function* dataSagas() {
  yield all([
    call(getMagazinePostDataStart),
    call(getMagazinePostDataStartStaff),
    call(approvePost),
    call(rejectPost),
    call(commentPost),
    call(fetchClosureDateStart),
    call(updateClosureDateStart),
    call(fetchEachEventStart),
  ]);
}
