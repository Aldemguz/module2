import React from 'react';
import Notification from 'bucares/components/Notification';
import { NOTIFICATION_SUCCESS } from "bucares/constants/notificationActionsTypes";

const store = mockStore({
  get: (property) => {
    const reducers = {
      notification: {
        open: true,
        type: NOTIFICATION_SUCCESS,
        message: "message_test"
      }
    };
    return reducers[property];
  }
});
describe('Notification Component Test', () => {

  it('Snapshot Notification', () => {
    const notification = global.mount(
      globalWrapper(<Notification/>, store)
    );

    expect(getJSON(notification)).toMatchSnapshot();
  });
});