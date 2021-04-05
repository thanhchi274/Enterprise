import { all, call } from "redux-saga/effects";
import { userSagas} from "./user/user.sagas";
import {dataSagas} from './data/data.sagas'
// import {  } from "./files/files.sagas";
export default function* rootSaga() {
  yield all([call(userSagas),call(dataSagas)
    //  call(cartSagas), call(shopSagas)
    ]);
}
