import React from 'react';
import ContentList from 'bucares/components/ContentList';

const store = mockStore({
  get: (property) => {
    const reducers = {
      content: {
        urlAcceptedList: ["test1", "test2"]
      }
    };
    return reducers[property];
  }
});
describe('ContentList Component Test', () => {

  it('Snapshot ContentList', () => {
    const contentList = global.mount(
      globalWrapper(<ContentList/>, store)
    )

    expect(getJSON(contentList)).toMatchSnapshot();
  });
});