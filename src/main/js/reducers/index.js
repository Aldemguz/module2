import { combineReducers } from 'redux-immutable';
import appReducer from './appReducer';
import contentReducer from './contentReducer';
import notificationReducer from './notificationReducer';
import propertiesReducer from './propertiesReducer';

const rootReducer = combineReducers({
    app: appReducer,
    content: contentReducer,
    notification: notificationReducer,
    properties: propertiesReducer
});

export default rootReducer;
