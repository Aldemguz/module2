import * as NotificationActions  from "bucares/actions/notificationActions";
import * as actionTypes from 'bucares/constants/notificationActionsTypes';
import expect from 'expect';

describe('Notification actions', () => {

    it('Test setNotificationError()', () => {
        const text = 'test';
        const expectedAction = {
            type: actionTypes.NOTIFICATION_ERROR,
            message: text
        };
        expect(NotificationActions.setNotificationError(text)).toEqual(expectedAction)
    });

    it('Test setNotificationSuccess()', () => {
      const text = 'test';
      const expectedAction = {
          type: actionTypes.NOTIFICATION_SUCCESS,
          message: text
      };
      expect(NotificationActions.setNotificationSuccess(text)).toEqual(expectedAction)
    });

    it('Test closeNotification()', () => {
      const expectedAction = {
          type: actionTypes.CLOSE_NOTIFICATION
      };
      expect(NotificationActions.closeNotification()).toEqual(expectedAction)
    });

});