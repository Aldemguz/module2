import React from 'react';
import HomeView from 'bucares/components/HomeView';

const store = mockStore({
  get: (property) => {
    const reducers = {
      content: {
        urlAcceptedList: ["test1", "test2"],
        currentUrlIsAccepted: "accepted_test"
      }
    };
    return reducers[property];
  }
});
describe('HomeView Component Test', () => {

  it('Snapshot HomeView', () => {
    const homeView = global.mount(
      globalWrapper(<HomeView/>, store)
    );

    expect(getJSON(homeView)).toMatchSnapshot();
  });
});