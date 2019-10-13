import { combineReducers } from 'redux';
import app from './app';
import login from './login';
import notification from './notification'
import signup from './signup'
import users from './users'

const rootReducer = combineReducers({
  app,
  login,
  notification,
  signup,
  users
});

export default rootReducer;