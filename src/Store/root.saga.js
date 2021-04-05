import { all, call } from "redux-saga/effects";
import { userSagas} from "./user/user.sagas";
// import {  } from "./files/files.sagas";
export default function* rootSaga() {
  yield all([call(userSagas),
    //  call(cartSagas), call(shopSagas)
    ]);
}
