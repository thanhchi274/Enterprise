import DataTypes from "./data.type";

export const setPendingPost = (data) => ({
  type: DataTypes.SET_PENDING_POST,
  payload: data
});
export const setComment = (data) => ({
    type: DataTypes.SET_COMMENT,
    payload: data
  });
export const fetchMagazinePostStart=()=>({
  type:DataTypes.FETCH_MAGAZINE_START,
})
export const fetchMagazinePostSuccess=(data)=>({
  type:DataTypes.FETCH_MAGAZINE_START_BY_STAFF,
  payload: data
})
export const fetchMagazinePostStaffStart=()=>({
  type:DataTypes.FETCH_MAGAZINE_START_BY_STAFF,
})
export const fetchMagazinePostStaffSuccess=(data)=>({
  type:DataTypes.FETCH_MAGAZINE_SUCCESS,
  payload: data
})
export const fetchMagazinePostFailure=(error)=>({
  type:DataTypes.FETCH_MAGAZINE_FAILURE,
  payload: error
})
export const approvePost = (data)=>({
  type:DataTypes.APPROVE_POST,
  payload: data
})