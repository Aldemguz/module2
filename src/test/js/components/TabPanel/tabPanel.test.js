import React from 'react';
import TabPanel from 'bucares/components/TabPanel';

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
describe('TabPanel Component Test', () => {

  it('Snapshot TabPanel', () => {
    const tabPanel = global.mount(
      <TabPanel/>
    );

    expect(getJSON(tabPanel)).toMatchSnapshot();
  });
});