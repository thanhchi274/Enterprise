import DataTypes from "./data.type";

const INITIAL_STATE = {
  pendingPost: null,
  magazinePost: null,
  isLoading: true,
  error: undefined,
  closureDates: null,
  faulty: null,
  analysisData: null,
  downloadLink:null
};
const dataReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case DataTypes.FETCH_MAGAZINE_START_BY_STAFF:
    case DataTypes.FETCH_MAGAZINE_START:
    case DataTypes.FETCH_CLOSURE_DATE_START:
    case DataTypes.UPDATE_CLOSURE_DATE_START:
    case DataTypes.FETCH_EACH_EVENT_START:
    case DataTypes.FETCH_ANALYSIS_DATA_START:
    case DataTypes.FETCH_DOWNLOAD_LINK_START:
      return {
        ...state,
        isLoading: true,
      };
    case DataTypes.FETCH_ANALYSIS_DATA_SUCCESS:
      return {
        ...state,
        isLoading: false,
        analysisData: action.payload,
      };
    case DataTypes.FETCH_EACH_EVENT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        faulty: action.payload,
      };
    case DataTypes.FETCH_CLOSURE_DATE_SUCCESS:
      return {
        ...state,
        closureDates: action.payload,
        isLoading: false,
      };
    case DataTypes.FETCH_MAGAZINE_SUCCESS_BY_STAFF:
    case DataTypes.FETCH_MAGAZINE_SUCCESS:
      return {
        ...state,
        magazinePost: action.payload,
        isLoading: false,
      };
    case DataTypes.FETCH_DOWNLOAD_LINK_SUCCESS:
      return {
        ...state,
        isLoading:false,
        downloadLink:action.payload
      }
    case DataTypes.FETCH_CLOSURE_DATE_FAILURE:
    case DataTypes.FETCH_MAGAZINE_FAILURE:
    case DataTypes.UPDATE_CLOSURE_DATE_FAILURE:
    case DataTypes.FETCH_EACH_EVENT_FAILURE:
    case DataTypes.FETCH_ANALYSIS_DATA_FAILURE:
    case DataTypes.FETCH_DOWNLOAD_LINK_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    case DataTypes.SET_PENDING_POST:
      return {
        ...state,
        pendingPost: action.payload,
      };
    case DataTypes.SET_EDIT_POST:
      return {
        ...state,
        editPost: action.payload,
      };
    default:
      return state;
  }
};
export default dataReducer;
