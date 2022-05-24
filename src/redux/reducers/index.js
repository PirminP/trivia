import { combineReducers } from 'redux';
import login from './login';
import avatar from './avatar';

const rootReducer = combineReducers({ login, avatar });

export default rootReducer;
