import DataTypes from "./data.type";

export const setPendingPost = (data) => ({
  type: DataTypes.SET_PENDING_POST,
  payload: data
});

export const setComment = (data) => ({
    type: DataTypes.SET_COMMENT,
    payload: data
  });
