import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import userReducer from "./user/user.reducer.js";
import UIReducer from "./UI/UI.reducer";
import storage from "redux-persist/lib/storage";
const persistConfig = {
  key: "root",
  storage,
};
const rootReducer = combineReducers({
  user: userReducer,
  UI: UIReducer
});
export default persistReducer(persistConfig, rootReducer);
