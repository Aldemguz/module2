import {isEmpty} from 'bucares/utils/commons';
describe('Commons Test', () => {

  it('isEmpty Test to Be Truthy', () => {
    expect(isEmpty('')).toBeTruthy();
    expect(isEmpty(null)).toBeTruthy();
  });

  it('isEmpty Test to Be Falsy', () => {
    expect(isEmpty('test')).toBeFalsy();
  });
});