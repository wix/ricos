/* eslint-disable max-len */
import { truncateContentState } from '../lib/contentStateServices';
import {
  contentState,
  contentState2,
  emptyContentState,
  expectedContentState1,
  expectedContentState2,
  expectedContentState3,
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
  it('case: valid index with 2 entityRanges, should be equal ', () => {
    const newContentState = truncateContentState(contentState2, 2);
    expect(newContentState).toEqual(expectedContentState3);
  });
  it('case: index is bigger than blocks length, should return the entered contentState', () => {
    const newContentState = truncateContentState(contentState, 6);
    expect(newContentState).toEqual(contentState);
  });
});
