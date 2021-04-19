import { RichContent } from 'ricos-schema';
import { fromJSONLight, toJSONLight } from './jsonUtils';

const CONTENT: RichContent = {
  nodes: [],
  metadata: {
    version: 1,
    createdTimestamp: new Date('2021-04-19T08:14:57.582Z'),
    updatedTimestamp: new Date('2021-04-19T08:14:57.582Z'),
  },
};

const JSON_CONTENT = {
  nodes: [],
  metadata: {
    version: 1,
    createdTimestamp: '2021-04-19T08:14:57.582Z',
    updatedTimestamp: '2021-04-19T08:14:57.582Z',
  },
};

describe('jsonUtils', () => {
  it('should convert from JSON', () => {
    const content = fromJSONLight(JSON_CONTENT);
    expect(content).toEqual(CONTENT);
  });

  it('should convert to JSON', () => {
    const json = toJSONLight(CONTENT);
    expect(json).toEqual(JSON_CONTENT);
  });
});
