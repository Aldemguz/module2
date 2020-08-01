import * as actionTypes from 'bucares/constants/notificationActionsTypes';

const initialState = {
  open: false,
  message: "",
  type: null
};

const notificationReducer = (state, action) => {
  if (typeof state === 'undefined') {
    return initialState
  }
  const newState = Object.assign({}, state);

  switch (action.type) {

    case actionTypes.NOTIFICATION_ERROR: {
      newState.type = actionTypes.NOTIFICATION_ERROR;
      newState.message = action.message;
      newState.open = true;
      break;
    }
    case actionTypes.NOTIFICATION_SUCCESS: {
      newState.type = actionTypes.NOTIFICATION_SUCCESS;
      newState.message = action.message;
      newState.open = true;

      break;
    }
    case actionTypes.CLOSE_NOTIFICATION: {
      newState.type = null;
      newState.message = "";
      newState.open = false;
      break;
    }
  }
  return newState;
};

export default notificationReducer;
