import { USER_STATE_CHANGE, USER_CHAT_CHANGE } from "../constants";

const initialState = {
  currentUser: null,
  chats: []
};

export const users = (state = initialState, action) => {
  switch (action.type) {
    case USER_STATE_CHANGE:
      return {
        ...state,
        currentUser: action.currentUser
      };
    case USER_CHAT_CHANGE:
      return {
        ...state,
        chats: action.chats
      };
    default:
      return state;
  }
};
