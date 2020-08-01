import { combineReducers } from 'redux-immutable';
import appReducer from './appReducer';
import contentReducer from './contentReducer';
import notificationReducer from './notificationReducer';

const rootReducer = combineReducers({
    app: appReducer,
    content: contentReducer,
    notification: notificationReducer
});

export default rootReducer;
