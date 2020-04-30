/* eslint-disable max-len */
import { truncateContentState } from '../lib/contentStateServices';
import {
  contentState,
  emptyContentState,
  expectedContentState1,
  expectedContentState2,
} from './index';

describe('Test content state services functions', () => {
  it('case: index = 0, should return empty contentState', () => {
    const newContentState = truncateContentState(contentState, 0);
    expect(newContentState).toEqual(emptyContentState);
  });
  it('case: valid index, should be equal ', () => {
    const newContentState = truncateContentState(contentState, 2);
    expect(newContentState).toEqual(expectedContentState1);
  });
  it('case: valid index, should be equal ', () => {
    const newContentState = truncateContentState(contentState, 5);
    expect(newContentState).toEqual(expectedContentState2);
  });
  it('case: index out of bounds, should return the entered contentState', () => {
    const newContentState = truncateContentState(contentState, 6);
    expect(newContentState).toEqual(contentState);
  });
  it('case: index out of bounds, should return the entered contentState', () => {
    const newContentState = truncateContentState(contentState, 100);
    expect(newContentState).toEqual(contentState);
  });
});
