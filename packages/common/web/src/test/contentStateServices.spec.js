/* eslint-disable max-len */
import { truncateContentState } from '../lib/contentStateServices';
import { raw, emptyRaw, expectedRaw1, expectedRaw2 } from './index';

describe('Test content state services functions', () => {
  it('case: index = 0, should return empty raw', () => {
    const newRaw = truncateContentState(raw, 0);
    expect(newRaw).toEqual(emptyRaw);
  });

  it('case: valid index, should be equal ', () => {
    const newRaw = truncateContentState(raw, 2);
    expect(newRaw).toEqual(expectedRaw1);
  });

  it('case: valid index, should be equal ', () => {
    const newRaw = truncateContentState(raw, 5);
    expect(newRaw).toEqual(expectedRaw2);
  });

  it('case: index out of bounds, should return the entered raw', () => {
    const newRaw = truncateContentState(raw, 6);
    expect(newRaw).toEqual(raw);
  });

  it('case: index out of bounds, should return the entered raw', () => {
    const newRaw = truncateContentState(raw, 100);
    expect(newRaw).toEqual(raw);
  });
});
