import React from 'react';
import SearchView from 'bucares/components/SearchView';

const store = mockStore({
  get: (property) => {
    const reducers = {
      content: {
        currentUrlIsAccepted: "accepted_test"
      }
    };
    return reducers[property];
  }
});
describe('SearchView Component Test', () => {

  it('Snapshot SearchView', () => {
    const searchView = global.mount(
      globalWrapper(<SearchView/>, store)
    );

    expect(getJSON(searchView)).toMatchSnapshot();
  });
});