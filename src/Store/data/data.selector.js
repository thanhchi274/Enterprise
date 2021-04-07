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
export const selectMagazinePost = createSelector(
  [selectData],
  (data) => data.magazinePost
);

export const selectEditPost = createSelector(
  [selectData],
  (selectData) => selectData.editPost
);
export const selectClosureDates = createSelector([selectData],data=>data?data.closureDates:null)