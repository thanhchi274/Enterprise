import DataTypes from "./data.type";

const INITIAL_STATE = {
  pendingPost: null,
  postWithComment: null,
  magazinePost:null,
  isLoading:true,
  error:undefined,
};
const dataReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case DataTypes.FETCH_MAGAZINE_START_BY_STAFF:
    case DataTypes.FETCH_MAGAZINE_START:
      return{
        ...state,
        isLoading:true
      }
    case DataTypes.FETCH_MAGAZINE_SUCCESS_BY_STAFF:
    case DataTypes.FETCH_MAGAZINE_SUCCESS:
      return{
        ...state,
        magazinePost: action.payload,
        isLoading:false
      }
    case DataTypes.FETCH_MAGAZINE_FAILURE:
      return{
        ...state,
        error:action.payload
      }
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
