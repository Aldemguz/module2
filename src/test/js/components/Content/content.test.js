import React from 'react';
import Content from 'bucares/components/Content';

const mockFunction = jest.fn();
const store = mockStore({
  get: (property) => {
    const reducers = {
    };
    return reducers[property];
  }
});
describe('Content Component Test', () => {

  it('Snapshot Content', () => {
    const content = global.mount(
      globalWrapper(<Content url={"test"} deleteContent={mockFunction}/>, store)
    )

    expect(getJSON(content)).toMatchSnapshot();
  });
});