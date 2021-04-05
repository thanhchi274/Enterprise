import DataTypes from "./data.type";

const INITIAL_STATE = {
  pendingPost: null,
  postWithComment: null
};
const dataReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case DataTypes.SET_PENDING_POST:
      return {
        ...state,
        pendingPost: action.payload,
      };
    case DataTypes.SET_COMMENT:
      return {
        ...state,
        postWithComment: action.payload,
      };
    default:
      return state;
  }
};
export default dataReducer;
