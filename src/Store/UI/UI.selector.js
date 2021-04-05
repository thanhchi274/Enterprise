import { createSelector } from "reselect";
export const selectUI = (state) => state.UI;
export const selectMenuVisible = createSelector(
  [selectUI],
  (selectUI) => selectUI.menuVisible
);
