import { isNumber } from 'lodash';

export default class ContentStateMetadata {
  constructor(raw) {
    this._raw = raw;
  }

  get raw() {
    return this._raw;
  }

  get blocks() {
    return this._raw.blocks;
  }

  get entities() {
    return this._raw.entityMap;
  }

  get version() {
    return this._raw.VERSION;
  }

  getBlocksOfType(blockType) {
    return this._raw.blocks.filter(({ type }) => type === blockType);
  }

  text(blockIndex) {
    if (isNumber(blockIndex) && blockIndex >= 0) {
      return this._raw.blocks[blockIndex].text;
    }
    return this._raw.blocks
      .filter(({ type }) => type !== 'atomic')
      .reduce((text, block) => {
        const newText = text + block.text;
        return newText;
      }, '');
  }
}
