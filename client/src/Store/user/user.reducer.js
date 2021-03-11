import UserActionTypes from "./user.type";
const INITIAL_STATE = {
  currentUser: null,
  extra_data:null
};
const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UserActionTypes.UPDATE_USER_PROFILE_START:
      return {
        ...state
      }
    case UserActionTypes.UPDATE_USER_PROFILE_SUCCESS:
    case UserActionTypes.SIGN_IN_SUCCESS:
      return {
        ...state,
        currentUser: action.payload,
        error: null,
      };
    case UserActionTypes.SIGN_OUT_SUCCESS:
      return {
        ...state,
        currentUser:null,
        error: null
        }
    case UserActionTypes.UPDATE_USER_PROFILE_FAILURE:
    case UserActionTypes.SIGN_OUT_FAILURE:
    case UserActionTypes.SIGN_IN_FAILURE:
    case UserActionTypes.SIGN_UP_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    case UserActionTypes.CONTACT_US:
      return {
        ...state
      }
    case UserActionTypes.SET_EXTRA_DATA_FIREBASE:{
      return{
        ...state,
        extra_data:action.payload
      }
    }
    default:
      return state;
  }
};
export default userReducer;
