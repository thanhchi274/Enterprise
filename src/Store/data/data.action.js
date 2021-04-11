import DataTypes from "./data.type";

export const setPendingPost = (data) => ({
  type: DataTypes.SET_PENDING_POST,
  payload: data,
});
export const fetchMagazinePostStart = () => ({
  type: DataTypes.FETCH_MAGAZINE_START,
});
export const fetchMagazinePostSuccess = (data) => ({
  type: DataTypes.FETCH_MAGAZINE_SUCCESS,
  payload: data,
});
export const fetchMagazinePostStaffStart = () => ({
  type: DataTypes.FETCH_MAGAZINE_START_BY_STAFF,
});
export const fetchMagazinePostStaffSuccess = (data) => ({
  type: DataTypes.FETCH_MAGAZINE_SUCCESS_BY_STAFF,
  payload: data,
});
export const fetchMagazinePostFailure = (error) => ({
  type: DataTypes.FETCH_MAGAZINE_FAILURE,
  payload: error,
});
export const fetchClosureDateStart = () => ({
  type: DataTypes.FETCH_CLOSURE_DATE_START,
});
export const fetchClosureDateSuccess = (data) => ({
  type: DataTypes.FETCH_CLOSURE_DATE_SUCCESS,
  payload: data,
});
export const fetchClosureDateFailure = (error) => ({
  type: DataTypes.FETCH_CLOSURE_DATE_FAILURE,
  payload: error,
});
export const approvePost = (data) => ({
  type: DataTypes.APPROVE_POST,
  payload: data,
});
export const rejectPost =(data)=>({
  type:DataTypes.REJECT_POST,
  payload: data,
})
export const setComment = (data) => ({
  type: DataTypes.SET_COMMENT,
  payload: data,
});
export const updateClosureDateStart = (data) => ({
  type: DataTypes.UPDATE_CLOSURE_DATE_START,
  payload: data,
});
export const updateClosureDateSuccess = () => ({
  type: DataTypes.UPDATE_CLOSURE_DATE_SUCCESS,
});
export const updateClosureDateFailure = (error) => ({
  type: DataTypes.UPDATE_CLOSURE_DATE_FAILURE,
  payload: error,
});
export const setEditPost = (data) => ({
  type: DataTypes.SET_EDIT_POST,
  payload: data,
});
export const fetchEachEventStart = (data) => ({
  type: DataTypes.FETCH_EACH_EVENT_START,
  payload: data,
});
export const fetchEachEventSuccess = (data) => ({
  type: DataTypes.FETCH_EACH_EVENT_SUCCESS,
  payload: data,
});
export const fetchEachEventFailure = (error) => ({
  type: DataTypes.FETCH_EACH_EVENT_FAILURE,
  payload: error,
});
export const fetchAnalysisDataStart = ()=>({
  type: DataTypes.FETCH_ANALYSIS_DATA_START
})
export const fetchAnalysisDataSuccess = (data)=>({
  type: DataTypes.FETCH_ANALYSIS_DATA_SUCCESS,
  payload: data,
})
export const fetchAnalysisDataFailure = (error)=>({
  type: DataTypes.FETCH_ANALYSIS_DATA_FAILURE,
  payload: error,
})
export const fetchDownloadAllDataStart = ()=>({
  type: DataTypes.FETCH_DOWNLOAD_LINK_START
})
export const fetchDownloadAllDataSuccess = (data)=>({
  type: DataTypes.FETCH_DOWNLOAD_LINK_SUCCESS,
  payload: data,
})
export const fetchDownloadAllDataFailure = (error)=>({
  type: DataTypes.FETCH_DOWNLOAD_LINK_FAILURE,
  payload: error,
})