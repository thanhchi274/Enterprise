import { createSelector } from "reselect";

export const selectData = (state) => state.data;

export const selectPendingPost = createSelector(
  [selectData],
  (selectData) => selectData.pendingPost
);

export const selectComment = createSelector(
  [selectData],
  (selectData) => selectData.postWithComment
);
