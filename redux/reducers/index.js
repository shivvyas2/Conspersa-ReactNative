import { combineReducers } from "redux";
import { users } from './users';

const rootReducer = combineReducers({
  usersState: users
});

export default rootReducer;
