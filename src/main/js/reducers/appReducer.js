import * as actionTypes from 'bucares/constants/actionTypes';

const initialState = {
    appInfo: null,
    appInfoLoading: false
};

const appReducer = (state, action) =>
{
    if (typeof state === 'undefined') {
        return initialState
    }

    const newState = Object.assign({},state);

    switch (action.type){

        case actionTypes.SET_APP_INFO_PENDING: {
            newState.appInfoLoading = true;
            break;
        }

        case actionTypes.SET_APP_INFO_DATA: {
            newState.appInfoLoading = false;
            newState.appInfo = action.payload;
            break;
        }

        case actionTypes.SET_APP_INFO_REJECTED: {
            newState.appInfoLoading = false;
            newState.appInfo = null;
            break;
        }

    }
    return newState;
};

export default appReducer;
