import * as actionTypes from 'bucares/constants/propertiesActionTypes';

const initialState = {
  propertiesInfo: {
    appTag: ""
  },
  propertiesInfoLoading: false
};

const propertiesReducer = (state, action) => {
  if (typeof state === 'undefined') {
    return initialState
  }

  const newState = Object.assign({}, state);

  switch (action.type) {

    case actionTypes.SET_PROPERTIES_INFO_PENDING: {
      newState.propertiesInfoLoading = true;
      break;
    }

    case actionTypes.SET_PROPERTIES_INFO_DATA: {
      newState.propertiesInfoLoading = false;
      newState.propertiesInfo.appTag = action.payload.tag;
      break;
    }

    case actionTypes.SET_PROPERTIES_INFO_REJECTED: {
      newState.propertiesInfoLoading = false;
      newState.propertiesInfo = null;
      break;
    }

  }
  return newState;
};

export default propertiesReducer;
