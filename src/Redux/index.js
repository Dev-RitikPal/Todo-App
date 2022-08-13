import { combineReducers } from "redux";
import { TodoReducer, UserDataReducer, BlogdetailsReducer, BlogidReducer, getUserDBReducers } from './Reducer/Reducers';

export * from './Action'
export * from './Reducer'

export default combineReducers({
    todos: TodoReducer,
    userData: UserDataReducer,
    blogs: BlogdetailsReducer,
    blogid : BlogidReducer,
    getMongodata:getUserDBReducers
  });