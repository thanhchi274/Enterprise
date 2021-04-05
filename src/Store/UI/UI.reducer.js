import UITypes from "./UI.type";

const INITIAL_STATE = {
  menuVisible: false,
};
const UIReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UITypes.SET_MENU_VISIBLE:
      return {
        ...state,
        menuVisible: !state.menuVisible,
      };
    default:
      return state;
  }
};
export default UIReducer;
