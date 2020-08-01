import * as actionTypes from 'bucares/constants/notificationActionsTypes';

export function setNotificationError(error) {
  return {
    type: actionTypes.NOTIFICATION_ERROR,
    message: error
  }
}
export function setNotificationSuccess(message) {
  return {
    type: actionTypes.NOTIFICATION_SUCCESS,
    message
  }
}
export function closeNotification() {
  return {
    type: actionTypes.CLOSE_NOTIFICATION
  }
}
