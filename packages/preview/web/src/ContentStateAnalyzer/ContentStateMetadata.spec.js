import { contentState } from './tests/contentState.js';
import UUT from './ContentStateMetadata';
import { BLOCK_TYPES } from 'wix-rich-content-common';

describe('content state metadata', () => {
  const metadata = new UUT(contentState);
  it('should return proper content state elements', () => {
    expect(metadata.raw).toEqual(contentState);
    expect(metadata.blocks).toEqual(contentState.blocks);
    expect(metadata.entities).toEqual(contentState.entityMap);
    expect(metadata.version).toEqual(contentState.VERSION);
  });

  it('should return blocks of type', () => {
    const blockCountByType = {
      ...BLOCK_TYPES.reduce((obj, type) => {
        obj[type] = 0;
        return obj;
      }, {}),
      atomic: 4,
      unstyled: 6,
    };

    BLOCK_TYPES.forEach(type => {
      expect(metadata.getBlocksOfType(type).length).toEqual(blockCountByType[type]);
    });
  });

  it('should return text', () => {
    /*eslint-disable max-len*/
    expect(metadata.text()).toEqual(
      'Cannot call pubsub.getBlockHandler because property getBlockHandler is missing in statics of function type'
    );
    /*eslint-enable max-len*/
  });
});
